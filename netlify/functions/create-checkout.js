import Stripe from 'stripe'

export default async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('', {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
    })
  }

  if (req.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 })
  }

  try {
    const { priceId, userId, email } = await req.json()

    if (!priceId || !userId) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      customer_email: email,
      line_items: [{ price: priceId, quantity: 1 }],
      metadata: { userId },
      success_url: `${req.headers.get('origin') || 'https://aireviewreply.netlify.app'}/dashboard?payment=success`,
      cancel_url: `${req.headers.get('origin') || 'https://aireviewreply.netlify.app'}/pricing?payment=cancelled`,
    })

    return Response.json({ sessionId: session.id })
  } catch (err) {
    console.error('Checkout error:', err)
    return Response.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}

export const config = {
  path: '/.netlify/functions/create-checkout',
}
