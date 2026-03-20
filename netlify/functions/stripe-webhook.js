import Stripe from 'stripe'
import { initializeApp, cert, getApps } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

function getDb() {
  if (!getApps().length) {
    initializeApp({
      credential: cert({
        projectId: process.env.VITE_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    })
  }
  return getFirestore()
}

const TIER_MAP = {
  [process.env.STRIPE_PRICE_STARTER]: 'starter',
  [process.env.STRIPE_PRICE_GROWTH]: 'growth',
}

export default async (req) => {
  if (req.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 })
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  const sig = req.headers.get('stripe-signature')
  const body = await req.text()

  let event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message)
    return Response.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const db = getDb()

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object
        const userId = session.metadata?.userId
        if (!userId) break

        const subscription = await stripe.subscriptions.retrieve(session.subscription)
        const priceId = subscription.items.data[0]?.price?.id
        const tier = TIER_MAP[priceId] || 'starter'

        await db.doc(`users/${userId}`).update({
          tier,
          stripeCustomerId: session.customer,
          stripeSubscriptionId: session.subscription,
        })
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object
        const customerId = subscription.customer

        const usersSnap = await db.collection('users')
          .where('stripeCustomerId', '==', customerId).limit(1).get()

        if (!usersSnap.empty) {
          const userDoc = usersSnap.docs[0]
          const priceId = subscription.items.data[0]?.price?.id
          const tier = TIER_MAP[priceId] || 'starter'
          const active = ['active', 'trialing'].includes(subscription.status)

          await userDoc.ref.update({
            tier: active ? tier : 'free',
            stripeSubscriptionId: subscription.id,
          })
        }
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object
        const customerId = subscription.customer

        const usersSnap = await db.collection('users')
          .where('stripeCustomerId', '==', customerId).limit(1).get()

        if (!usersSnap.empty) {
          await usersSnap.docs[0].ref.update({ tier: 'free' })
        }
        break
      }
    }
  } catch (err) {
    console.error('Webhook handler error:', err)
    return Response.json({ error: 'Handler error' }, { status: 500 })
  }

  return Response.json({ received: true })
}

export const config = {
  path: '/.netlify/functions/stripe-webhook',
}
