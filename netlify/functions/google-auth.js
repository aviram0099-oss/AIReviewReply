export default async (req, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
  }

  if (req.method === 'OPTIONS') {
    return new Response('', { status: 200, headers })
  }

  try {
    const clientId = process.env.GOOGLE_CLIENT_ID
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET

    if (!clientId || !clientSecret) {
      return Response.json({ error: 'הגדרות Google API חסרות' }, { status: 500, headers })
    }

    const url = new URL(req.url)
    const userId = url.searchParams.get('userId')

    if (!userId) {
      return Response.json({ error: 'מזהה משתמש חסר' }, { status: 400, headers })
    }

    const origin = url.origin
    const redirectUri = `${origin}/.netlify/functions/google-callback`

    const scopes = [
      'https://www.googleapis.com/auth/business.manage',
    ]

    const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth')
    authUrl.searchParams.set('client_id', clientId)
    authUrl.searchParams.set('redirect_uri', redirectUri)
    authUrl.searchParams.set('response_type', 'code')
    authUrl.searchParams.set('scope', scopes.join(' '))
    authUrl.searchParams.set('access_type', 'offline')
    authUrl.searchParams.set('prompt', 'consent')
    authUrl.searchParams.set('state', userId)

    return new Response(null, {
      status: 302,
      headers: {
        Location: authUrl.toString(),
        ...headers,
      },
    })
  } catch (err) {
    return Response.json({ error: 'שגיאה פנימית', detail: err.message }, { status: 500, headers })
  }
}
