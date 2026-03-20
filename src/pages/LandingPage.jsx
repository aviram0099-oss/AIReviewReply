import { Link } from 'react-router-dom'

const FEATURES = [
  { icon: '🤖', title: 'AI חכם בעברית', desc: 'תגובות מקצועיות בעברית תקינה, מותאמות לטון ולמגדר' },
  { icon: '⚡', title: 'מהיר ופשוט', desc: 'הדביקו ביקורת, בחרו טון, וקבלו תגובה תוך שניות' },
  { icon: '📊', title: 'לוח בקרה מלא', desc: 'נהלו את כל הביקורות והתגובות במקום אחד' },
  { icon: '🔒', title: 'מאובטח ופרטי', desc: 'המידע שלכם מוגן ולא משותף עם צדדים שלישיים' },
  { icon: '💰', title: 'חסכון בזמן', desc: 'במקום 10 דקות לתגובה - 10 שניות עם AI' },
  { icon: '🎯', title: 'מותאם לעסק שלכם', desc: 'הגדירו פרופיל עסקי לתגובות מותאמות אישית' },
]

const FAQ = [
  { q: 'האם הכלי באמת חינמי?', a: 'כן! הכלי החינמי מאפשר 3 תגובות בחודש ללא הרשמה. למשתמשים רשומים יש חבילות עם יותר תגובות.' },
  { q: 'באיזו שפה הכלי כותב?', a: 'הכלי מתמחה בעברית. התגובות נכתבות בעברית תקינה ומקצועית, כולל התאמה למגדר.' },
  { q: 'האם אתם שומרים את הביקורות שלי?', a: 'רק אם אתם רשומים ובוחרים לשמור. הכלי החינמי לא שומר שום מידע.' },
  { q: 'איך AI יודע מה לכתוב?', a: 'הAI מנתח את תוכן הביקורת, מבין אם היא חיובית/שלילית, ומייצר תגובה מותאמת בטון שבחרתם.' },
]

export default function LandingPage() {
  return (
    <div>
      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #EEF2FF 0%, #F0F9FF 50%, #FDF4FF 100%)',
        padding: '5rem 2rem 4rem', textAlign: 'center',
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }} className="slide-up">
          <div style={{
            display: 'inline-block', background: 'rgba(77,150,255,0.1)', color: 'var(--primary)',
            padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600,
            marginBottom: '1.5rem',
          }}>
            הכלי הראשון בעברית למענה על ביקורות גוגל עם AI
          </div>
          <h1 style={{ fontSize: '2.8rem', fontWeight: 900, lineHeight: 1.2, marginBottom: '1.25rem' }}>
            תגובות מקצועיות לביקורות גוגל
            <br />
            <span style={{
              background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              תוך שניות, עם AI
            </span>
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 2rem', lineHeight: 1.7 }}>
            חסכו שעות של כתיבה. ה-AI שלנו מייצר תגובות בעברית מושלמת,
            מותאמות לטון העסק שלכם - ידידותי, מקצועי, או התנצלותי.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/free-tool" style={{
              background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
              color: 'white', padding: '0.9rem 2rem', borderRadius: 'var(--radius-sm)',
              fontSize: '1.1rem', fontWeight: 700, boxShadow: '0 4px 15px rgba(77,150,255,0.3)',
              transition: 'var(--transition)',
            }}>
              נסו עכשיו בחינם ←
            </Link>
            <Link to="/pricing" style={{
              background: 'white', color: 'var(--text)', padding: '0.9rem 2rem',
              borderRadius: 'var(--radius-sm)', fontSize: '1.1rem', fontWeight: 600,
              border: '1px solid var(--border)', transition: 'var(--transition)',
            }}>
              ראו מחירים
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '4rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          למה AIReviewReply?
        </h2>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '3rem' }}>
          הכלי שכל עסק ישראלי צריך לניהול המוניטין שלו
        </p>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}>
          {FEATURES.map((f, i) => (
            <div key={i} style={{
              background: 'white', padding: '1.5rem', borderRadius: 'var(--radius)',
              boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border)',
              transition: 'var(--transition)',
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{f.icon}</div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>{f.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Preview */}
      <section style={{
        padding: '4rem 2rem', background: 'linear-gradient(135deg, #EEF2FF, #FDF4FF)',
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>מחירים פשוטים ושקופים</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>התחילו בחינם, שדרגו כשתצטרכו</p>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem', textAlign: 'center',
          }}>
            {[
              { name: 'חינם', price: '₪0', responses: '3 תגובות/חודש', cta: 'התחילו בחינם', primary: false },
              { name: 'סטארטר', price: '₪79', responses: '50 תגובות/חודש', cta: 'בחרו סטארטר', primary: true },
              { name: 'צמיחה', price: '₪149', responses: '200 תגובות/חודש', cta: 'בחרו צמיחה', primary: false },
            ].map((plan, i) => (
              <div key={i} style={{
                background: 'white', padding: '2rem', borderRadius: 'var(--radius)',
                border: plan.primary ? '2px solid var(--primary)' : '1px solid var(--border)',
                boxShadow: plan.primary ? '0 8px 30px rgba(77,150,255,0.15)' : 'var(--shadow-sm)',
                position: 'relative',
              }}>
                {plan.primary && (
                  <div style={{
                    position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)',
                    background: 'var(--accent)', color: 'white', padding: '0.2rem 1rem',
                    borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700,
                  }}>
                    הכי פופולרי
                  </div>
                )}
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>{plan.name}</h3>
                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--primary)', marginBottom: '0.5rem' }}>{plan.price}</div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>{plan.responses}</p>
                <Link to="/pricing" style={{
                  display: 'block', padding: '0.7rem',
                  background: plan.primary ? 'var(--primary)' : 'white',
                  color: plan.primary ? 'white' : 'var(--primary)',
                  border: plan.primary ? 'none' : '1px solid var(--primary)',
                  borderRadius: 'var(--radius-sm)', fontWeight: 600, fontSize: '0.95rem',
                }}>
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '4rem 2rem', maxWidth: '700px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 800, marginBottom: '2rem' }}>
          שאלות נפוצות
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {FAQ.map((item, i) => (
            <details key={i} style={{
              background: 'white', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)',
              padding: '1rem 1.25rem',
            }}>
              <summary style={{ fontWeight: 600, cursor: 'pointer', fontSize: '1rem' }}>{item.q}</summary>
              <p style={{ marginTop: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section style={{
        padding: '4rem 2rem', textAlign: 'center',
        background: 'linear-gradient(135deg, var(--primary), var(--secondary))', color: 'white',
      }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem' }}>
          מוכנים לשדרג את המוניטין של העסק?
        </h2>
        <p style={{ fontSize: '1.1rem', opacity: 0.9, marginBottom: '2rem' }}>
          הצטרפו לעסקים שכבר חוסכים שעות על מענה לביקורות
        </p>
        <Link to="/free-tool" style={{
          display: 'inline-block', background: 'white', color: 'var(--primary)',
          padding: '0.9rem 2.5rem', borderRadius: 'var(--radius-sm)',
          fontSize: '1.1rem', fontWeight: 700,
        }}>
          נסו עכשיו בחינם ←
        </Link>
      </section>
    </div>
  )
}
