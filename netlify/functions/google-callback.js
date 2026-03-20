// NOTE: This function requires firebase-admin. Add it to package.json:
//   npm install firebase-admin
// Also set env var FIREBASE_SERVICE_ACCOUNT with the JSON service account key.

import { initializeApp, cert, getApps } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

function getDb() {
  if (getApps().length === 0) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
    initializeApp({ credential: cert(serviceAccount) })
  }
  return getFirestore()
}

export default async (req, context) => {
  try {
    const url = new URL(req.url)
    const code = url.searchParams.get('code')
    const userId = url.searchParams.get('state')
    const error = url.searchParams.get('error')

    if (error) {
      return new Response(null, {
        status: 302,
        headers: { Location: '/settings?google=error&reason=' + encodeURIComponent(error) },
      })
    }

    if (!code || !userId) {
      return new Response(null, {
        status: 302,
        headers: { Location: '/settings?google=error&reason=missing_params' },
      })
    }

    const clientId = process.env.GOOGLE_CLIENT_ID
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET
    const origin = url.origin
    const redirectUri = `${origin}/.netlify/functions/google-callback`

    // Exchange code for tokens
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    })

    if (!tokenRes.ok) {
      const err = await tokenRes.text()
      console.error('Token exchange failed:', err)
      return new Response(null, {
        status: 302,
        headers: { Location: '/settings?google=error&reason=token_exchange_failed' },
      })
    }

    const tokens = await tokenRes.json()

    // Store tokens in Firestore
    const db = getDb()
    await db.collection('users').doc(userId).collection('googleTokens').doc('default').set({
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      token_type: tokens.token_type,
      expiry_date: Date.now() + (tokens.expires_in * 1000),
      updatedAt: new Date().toISOString(),
    })

    // Mark user as google connected
    await db.collection('users').doc(userId).update({
      googleConnected: true,
    })

    return new Response(null, {
      status: 302,
      headers: { Location: '/settings?google=connected' },
    })
  } catch (err) {
    console.error('Google callback error:', err)
    return new Response(null, {
      status: 302,
      headers: { Location: '/settings?google=error&reason=internal_error' },
    })
  }
}
