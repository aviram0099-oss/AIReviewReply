import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useApp } from '../context/AppContext'
import { loadStripe } from '@stripe/stripe-js'

const PLANS = [
  {
    id: 'free', name: 'חינם', price: '₪0', period: 'לתמיד', responses: 3,
    features: ['3 תגובות בחודש', 'בחירת טון', 'העתקה מהירה'],
    primary: false, priceId: null,
  },
  {
    id: 'starter', name: 'סטארטר', price: '₪79', period: 'לחודש', responses: 50,
    features: ['50 תגובות בחודש', 'כל הטונים', 'פרופיל עסקי', 'לוח בקרה מלא', 'שמירת היסטוריה'],
    primary: true, priceId: 'STRIPE_PRICE_STARTER',
  },
  {
    id: 'growth', name: 'צמיחה', price: '₪149', period: 'לחודש', responses: 200,
    features: ['200 תגובות בחודש', 'כל הטונים', 'פרופיל עסקי', 'לוח בקרה מלא', 'שמירת היסטוריה', 'תמיכה מועדפת'],
    primary: false, priceId: 'STRIPE_PRICE_GROWTH',
  },
]

export default function PricingPage() {
  const { user } = useAuth()
  const { getUsageInfo } = useApp()
  const [loadingPlan, setLoadingPlan] = useState(null)

  async function handleSubscribe(plan) {
    if (!user) { window.location.href = '/auth'; return }
    if (plan.id === 'free') return

    setLoadingPlan(plan.id)
    try {
      const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
      if (!stripeKey) { alert('Stripe לא מוגדר'); setLoadingPlan(null); return }

      const stripe = await loadStripe(stripeKey)
      const priceId = import.meta.env[`VITE_${plan.priceId}`] || plan.priceId

      const res = await fetch('/.netlify/functions/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId, userId: user.uid, email: user.email }),
      })

      const { sessionId } = await res.json()
      await stripe.redirectToCheckout({ sessionId })
    } catch (err) {
      console.error('Checkout error:', err)
      alert('שגיאה בתהליך התשלום')
    }
    setLoadingPlan(null)
  }

  const currentTier = user ? getUsageInfo()?.tier || 'free' : 'free'

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '3.5rem 1rem' }} className="fade-in">
      <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.5rem' }}>
          בחרו את <span style={{ color: 'var(--cyan)' }}>החבילה</span> המתאימה
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
          התחילו בחינם, שדרגו בכל עת. ללא התחייבות.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem',
        alignItems: 'start',
      }}>
        {PLANS.map((plan) => {
          const isCurrent = currentTier === plan.id
          return (
            <div key={plan.id} style={{
              background: 'var(--navy)',
              borderRadius: 'var(--radius)',
              border: plan.primary ? '1px solid var(--cyan)' : '1px solid var(--border-dark)',
              boxShadow: plan.primary ? 'var(--shadow-cyan)' : 'none',
              padding: '2.5rem 2rem',
              position: 'relative',
              transform: plan.primary ? 'scale(1.03)' : 'none',
              transition: 'var(--transition)',
            }}>
              {plan.primary && (
                <div style={{
                  position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)',
                  background: 'var(--cyan)', color: 'var(--navy)', padding: '0.25rem 1.2rem',
                  borderRadius: 'var(--radius-pill)', fontSize: '0.8rem', fontWeight: 800,
                }}>
                  הכי פופולרי
                </div>
              )}

              <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-light)', marginBottom: '0.75rem' }}>{plan.name}</h3>
              <div style={{ marginBottom: '1rem' }}>
                <span style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--cyan)' }}>{plan.price}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}> /{plan.period}</span>
              </div>

              <ul style={{
                listStyle: 'none', padding: 0, marginBottom: '2rem',
                display: 'flex', flexDirection: 'column', gap: '0.7rem',
              }}>
                {plan.features.map((f, i) => (
                  <li key={i} style={{
                    fontSize: '0.9rem', color: 'var(--text-muted)',
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                  }}>
                    <span style={{ color: 'var(--cyan)', fontWeight: 700 }}>✓</span> {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSubscribe(plan)}
                disabled={isCurrent || loadingPlan === plan.id}
                style={{
                  width: '100%', padding: '0.85rem',
                  background: isCurrent ? 'var(--charcoal)' : plan.primary ? 'var(--cyan)' : 'transparent',
                  color: isCurrent ? 'var(--text-muted)' : plan.primary ? 'var(--navy)' : 'var(--cyan)',
                  border: plan.primary || isCurrent ? 'none' : '1px solid var(--cyan)',
                  borderRadius: 'var(--radius-pill)',
                  fontSize: '1rem',
                  fontWeight: 800,
                  boxShadow: plan.primary && !isCurrent ? 'var(--shadow-cyan)' : 'none',
                }}
              >
                {isCurrent ? 'החבילה הנוכחית' : loadingPlan === plan.id ? 'טוען...' : plan.id === 'free' ? 'התחילו בחינם' : 'בחרו חבילה'}
              </button>
            </div>
          )
        })}
      </div>

      <div style={{
        textAlign: 'center', marginTop: '2.5rem',
        color: 'var(--text-muted)', fontSize: '0.85rem',
      }}>
        כל החבילות כוללות ביטול בכל עת. ללא התחייבות ארוכת טווח.
      </div>
    </div>
  )
}
