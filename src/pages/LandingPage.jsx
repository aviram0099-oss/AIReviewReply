import { Link } from 'react-router-dom'

const FEATURES = [
  { icon: '🤖', title: 'AI חכם בעברית', desc: 'תגובות מקצועיות בעברית תקינה, מותאמות לטון ולמגדר' },
  { icon: '⚡', title: 'תוך שניות', desc: 'במקום 10 דקות לתגובה - 10 שניות עם AI' },
  { icon: '📊', title: 'לוח בקרה', desc: 'נהלו את כל הביקורות והתגובות במקום אחד' },
  { icon: '🎯', title: 'מותאם אישית', desc: 'הגדירו פרופיל עסקי לתגובות מותאמות' },
  { icon: '🔒', title: 'מאובטח', desc: 'המידע שלכם מוגן ולא משותף עם צדדים שלישיים' },
  { icon: '💎', title: '3 טונים', desc: 'ידידותי, מקצועי, או התנצלותי - אתם בוחרים' },
]

const FAQ = [
  { q: 'האם הכלי באמת חינמי?', a: 'כן! הכלי החינמי מאפשר 3 תגובות בחודש ללא הרשמה. למשתמשים רשומים יש חבילות עם יותר תגובות.' },
  { q: 'באיזו שפה הכלי כותב?', a: 'הכלי מתמחה בעברית. התגובות נכתבות בעברית תקינה ומקצועית, כולל התאמה למגדר.' },
  { q: 'האם אתם שומרים את הביקורות שלי?', a: 'רק אם אתם רשומים ובוחרים לשמור. הכלי החינמי לא שומר שום מידע.' },
  { q: 'איך AI יודע מה לכתוב?', a: 'ה-AI מנתח את תוכן הביקורת, מבין אם היא חיובית/שלילית, ומייצר תגובה מותאמת בטון שבחרתם.' },
]

const STATS = [
  { value: '10,000+', label: 'תגובות שנוצרו' },
  { value: '97%', label: 'שביעות רצון' },
  { value: '10 שניות', label: 'זמן ליצירת תגובה' },
]

export default function LandingPage() {
  return (
    <div>
      {/* Hero */}
      <section style={{
        background: `radial-gradient(ellipse at 50% 0%, var(--navy-light) 0%, var(--dark) 70%)`,
        padding: '6rem 2rem 5rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Glow effect */}
        <div style={{
          position: 'absolute',
          top: '-150px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '400px',
          background: 'radial-gradient(circle, var(--cyan-glow) 0%, transparent 70%)',
          pointerEvents: 'none',
          animation: 'glow 4s ease-in-out infinite',
        }} />

        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }} className="slide-up">
          <div style={{
            display: 'inline-block',
            background: 'rgba(19, 239, 245, 0.1)',
            border: '1px solid rgba(19, 239, 245, 0.2)',
            color: 'var(--cyan)',
            padding: '0.4rem 1.2rem',
            borderRadius: 'var(--radius-pill)',
            fontSize: '0.85rem',
            fontWeight: 600,
            marginBottom: '2rem',
          }}>
            הכלי הראשון בעברית למענה על ביקורות גוגל עם AI
          </div>

          <h1 style={{
            fontSize: '3.2rem',
            fontWeight: 900,
            lineHeight: 1.15,
            marginBottom: '1.5rem',
            letterSpacing: '-1px',
          }}>
            מקסימום אימפקט,
            <br />
            <span style={{ color: 'var(--cyan)' }}>מינימום מאמץ</span>
          </h1>

          <p style={{
            fontSize: '1.2rem',
            color: 'var(--text-muted)',
            maxWidth: '550px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.8,
          }}>
            תגובות מקצועיות לביקורות גוגל בעברית מושלמת תוך שניות.
            חסכו שעות של כתיבה ושפרו את המוניטין של העסק.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/free-tool" style={{
              background: 'var(--cyan)',
              color: 'var(--navy)',
              padding: '0.9rem 2.5rem',
              borderRadius: 'var(--radius-pill)',
              fontSize: '1.05rem',
              fontWeight: 800,
              boxShadow: 'var(--shadow-cyan)',
              display: 'inline-block',
              transition: 'var(--transition)',
            }}>
              נסו עכשיו בחינם ←
            </Link>
            <Link to="/pricing" style={{
              background: 'var(--charcoal)',
              color: 'var(--text-white)',
              padding: '0.9rem 2.5rem',
              borderRadius: 'var(--radius-pill)',
              fontSize: '1.05rem',
              fontWeight: 600,
              display: 'inline-block',
              transition: 'var(--transition)',
            }}>
              ראו מחירים
            </Link>
          </div>
        </div>

        {/* Stats bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '4rem',
          marginTop: '4rem',
          flexWrap: 'wrap',
        }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '2rem',
                fontWeight: 900,
                color: 'var(--cyan)',
              }}>{s.value}</div>
              <div style={{
                fontSize: '0.85rem',
                color: 'var(--text-muted)',
                marginTop: '0.2rem',
              }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{
        padding: '5rem 2rem',
        maxWidth: '1100px',
        margin: '0 auto',
      }}>
        <h2 style={{
          textAlign: 'center',
          fontSize: '2.2rem',
          fontWeight: 800,
          marginBottom: '0.5rem',
        }}>
          למה <span style={{ color: 'var(--cyan)' }}>AIReviewReply</span>?
        </h2>
        <p style={{
          textAlign: 'center',
          color: 'var(--text-muted)',
          marginBottom: '3.5rem',
          fontSize: '1.05rem',
        }}>
          הכלי שכל עסק ישראלי צריך לניהול המוניטין שלו
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}>
          {FEATURES.map((f, i) => (
            <div key={i} style={{
              background: 'var(--navy)',
              padding: '2rem',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--border-dark)',
              transition: 'var(--transition)',
              cursor: 'default',
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(19, 239, 245, 0.3)'
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = 'var(--shadow-cyan)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-dark)'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>{f.icon}</div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>{f.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section style={{
        padding: '5rem 2rem',
        background: 'var(--navy)',
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{
            textAlign: 'center',
            fontSize: '2.2rem',
            fontWeight: 800,
            marginBottom: '3.5rem',
          }}>
            איך זה <span style={{ color: 'var(--cyan)' }}>עובד</span>?
          </h2>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '2rem',
            flexWrap: 'wrap',
          }}>
            {[
              { step: '01', title: 'הדביקו ביקורת', desc: 'העתיקו ביקורת מגוגל והדביקו בכלי' },
              { step: '02', title: 'בחרו טון', desc: 'ידידותי, מקצועי, או התנצלותי' },
              { step: '03', title: 'קבלו תגובה', desc: 'ה-AI מייצר תגובה מקצועית בעברית' },
            ].map((item, i) => (
              <div key={i} style={{
                flex: '1 1 250px',
                textAlign: 'center',
                padding: '2rem 1.5rem',
              }}>
                <div style={{
                  fontSize: '3rem',
                  fontWeight: 900,
                  color: 'var(--cyan)',
                  opacity: 0.3,
                  marginBottom: '0.5rem',
                  lineHeight: 1,
                }}>{item.step}</div>
                <h3 style={{
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  marginBottom: '0.5rem',
                }}>{item.title}</h3>
                <p style={{
                  color: 'var(--text-muted)',
                  fontSize: '0.9rem',
                }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section style={{ padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            מחירים <span style={{ color: 'var(--cyan)' }}>שקופים</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '1.05rem' }}>
            התחילו בחינם, שדרגו כשתצטרכו
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
          }}>
            {[
              { name: 'חינם', price: '₪0', responses: '3 תגובות/חודש', primary: false },
              { name: 'סטארטר', price: '₪79', responses: '50 תגובות/חודש', primary: true },
              { name: 'צמיחה', price: '₪149', responses: '200 תגובות/חודש', primary: false },
            ].map((plan, i) => (
              <div key={i} style={{
                background: 'var(--navy)',
                padding: '2.5rem 2rem',
                borderRadius: 'var(--radius)',
                border: plan.primary ? '1px solid var(--cyan)' : '1px solid var(--border-dark)',
                boxShadow: plan.primary ? 'var(--shadow-cyan)' : 'none',
                position: 'relative',
                transition: 'var(--transition)',
              }}>
                {plan.primary && (
                  <div style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'var(--cyan)',
                    color: 'var(--navy)',
                    padding: '0.2rem 1.2rem',
                    borderRadius: 'var(--radius-pill)',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                  }}>
                    הכי פופולרי
                  </div>
                )}
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-light)', marginBottom: '0.75rem' }}>{plan.name}</h3>
                <div style={{ fontSize: '2.8rem', fontWeight: 900, color: 'var(--cyan)', marginBottom: '0.25rem' }}>{plan.price}</div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>{plan.responses}</p>
                <Link to="/pricing" style={{
                  display: 'block',
                  padding: '0.7rem',
                  background: plan.primary ? 'var(--cyan)' : 'transparent',
                  color: plan.primary ? 'var(--navy)' : 'var(--cyan)',
                  border: plan.primary ? 'none' : '1px solid var(--cyan)',
                  borderRadius: 'var(--radius-pill)',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  textAlign: 'center',
                }}>
                  {plan.primary ? 'בחרו סטארטר' : plan.price === '₪0' ? 'התחילו בחינם' : 'בחרו צמיחה'}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '5rem 2rem', background: 'var(--navy)' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '2.2rem', fontWeight: 800, marginBottom: '2.5rem' }}>
            שאלות <span style={{ color: 'var(--cyan)' }}>נפוצות</span>
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {FAQ.map((item, i) => (
              <details key={i} style={{
                background: 'var(--navy-card)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-dark)',
                padding: '1.25rem 1.5rem',
                transition: 'var(--transition)',
              }}>
                <summary style={{
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontSize: '1rem',
                  color: 'var(--text-white)',
                  listStyle: 'none',
                }}>
                  {item.q}
                </summary>
                <p style={{
                  marginTop: '0.75rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.7,
                  fontSize: '0.95rem',
                }}>
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{
        padding: '5rem 2rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          height: '300px',
          background: 'radial-gradient(circle, var(--cyan-glow) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '1rem' }}>
            מוכנים <span style={{ color: 'var(--cyan)' }}>להתחיל</span>?
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: 'var(--text-muted)',
            marginBottom: '2rem',
            maxWidth: '500px',
            margin: '0 auto 2rem',
          }}>
            הצטרפו לעסקים שכבר חוסכים שעות על מענה לביקורות
          </p>
          <Link to="/free-tool" style={{
            display: 'inline-block',
            background: 'var(--cyan)',
            color: 'var(--navy)',
            padding: '1rem 3rem',
            borderRadius: 'var(--radius-pill)',
            fontSize: '1.1rem',
            fontWeight: 800,
            boxShadow: 'var(--shadow-cyan)',
          }}>
            נסו עכשיו בחינם ←
          </Link>
        </div>
      </section>
    </div>
  )
}
