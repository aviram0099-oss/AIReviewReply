// NOTE: This function requires firebase-admin. Add it to package.json:
//   npm install firebase-admin

import { initializeApp, cert, getApps } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

function getDb() {
  if (getApps().length === 0) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
    initializeApp({ credential: cert(serviceAccount) })
  }
  return getFirestore()
}

async function refreshAccessToken(db, userId, refreshToken) {
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    }),
  })

  if (!res.ok) {
    throw new Error('שגיאה בחידוש טוקן הגישה')
  }

  const data = await res.json()

  await db.collection('users').doc(userId).collection('googleTokens').doc('default').update({
    access_token: data.access_token,
    expiry_date: Date.now() + (data.expires_in * 1000),
    updatedAt: new Date().toISOString(),
  })

  return data.access_token
}

async function getValidToken(db, userId) {
  const tokenDoc = await db.collection('users').doc(userId).collection('googleTokens').doc('default').get()

  if (!tokenDoc.exists) {
    throw new Error('לא נמצאו טוקנים של גוגל. יש לחבר מחדש את החשבון.')
  }

  const tokens = tokenDoc.data()

  // Refresh if token expires within 5 minutes
  if (tokens.expiry_date && tokens.expiry_date < Date.now() + 300000) {
    return await refreshAccessToken(db, userId, tokens.refresh_token)
  }

  return tokens.access_token
}

export default async (req, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  }

  if (req.method === 'OPTIONS') {
    return new Response('', { status: 200, headers })
  }

  try {
    const body = await req.json()
    const { userId } = body

    if (!userId) {
      return Response.json({ error: 'מזהה משתמש חסר' }, { status: 400, headers })
    }

    const db = getDb()
    const accessToken = await getValidToken(db, userId)

    // Step 1: Get accounts
    const accountsRes = await fetch('https://mybusinessaccountmanagement.googleapis.com/v1/accounts', {
      headers: { Authorization: `Bearer ${accessToken}` },
    })

    if (!accountsRes.ok) {
      const err = await accountsRes.text()
      console.error('Failed to fetch accounts:', err)
      return Response.json({ error: 'שגיאה בשליפת חשבונות גוגל' }, { status: 502, headers })
    }

    const accountsData = await accountsRes.json()
    const accounts = accountsData.accounts || []

    if (accounts.length === 0) {
      return Response.json({ error: 'לא נמצאו חשבונות Google Business Profile' }, { status: 404, headers })
    }

    const account = accounts[0]
    const accountId = account.name.replace('accounts/', '')

    // Step 2: Get locations
    const locationsRes = await fetch(
      `https://mybusinessbusinessinformation.googleapis.com/v1/${account.name}/locations?readMask=name`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    )

    if (!locationsRes.ok) {
      const err = await locationsRes.text()
      console.error('Failed to fetch locations:', err)
      return Response.json({ error: 'שגיאה בשליפת מיקומי העסק' }, { status: 502, headers })
    }

    const locationsData = await locationsRes.json()
    const locations = locationsData.locations || []

    if (locations.length === 0) {
      return Response.json({ error: 'לא נמצאו מיקומים בחשבון Google Business' }, { status: 404, headers })
    }

    const location = locations[0]
    const locationId = location.name.split('/').pop()

    // Step 3: Get reviews
    const reviewsRes = await fetch(
      `https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations/${locationId}/reviews`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    )

    if (!reviewsRes.ok) {
      const err = await reviewsRes.text()
      console.error('Failed to fetch reviews:', err)
      return Response.json({ error: 'שגיאה בשליפת ביקורות' }, { status: 502, headers })
    }

    const reviewsData = await reviewsRes.json()
    const reviews = (reviewsData.reviews || []).map((r) => ({
      reviewId: r.reviewId,
      reviewer: { displayName: r.reviewer?.displayName || 'לקוח אנונימי' },
      comment: r.comment || '',
      starRating: r.starRating,
      createTime: r.createTime,
      reviewReply: r.reviewReply || null,
    }))

    return Response.json({ reviews, accountId, locationId }, { headers })
  } catch (err) {
    console.error('Google reviews error:', err)
    return Response.json({ error: err.message || 'שגיאה פנימית' }, { status: 500, headers })
  }
}
