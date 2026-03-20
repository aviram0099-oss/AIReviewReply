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
    const { userId, accountId, locationId, reviewId, comment } = body

    if (!userId || !accountId || !locationId || !reviewId || !comment) {
      return Response.json({ error: 'חסרים פרטים נדרשים' }, { status: 400, headers })
    }

    const db = getDb()
    const accessToken = await getValidToken(db, userId)

    const replyRes = await fetch(
      `https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations/${locationId}/reviews/${reviewId}/reply`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comment }),
      }
    )

    if (!replyRes.ok) {
      const err = await replyRes.text()
      console.error('Failed to post reply:', err)
      return Response.json({ error: 'שגיאה בפרסום התגובה לגוגל' }, { status: 502, headers })
    }

    const replyData = await replyRes.json()
    return Response.json({ success: true, reply: replyData }, { headers })
  } catch (err) {
    console.error('Google reply error:', err)
    return Response.json({ error: err.message || 'שגיאה פנימית' }, { status: 500, headers })
  }
}
