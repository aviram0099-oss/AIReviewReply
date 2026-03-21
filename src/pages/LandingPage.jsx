import { Link } from 'react-router-dom'
import AdBanner from '../components/AdBanner'

const FEATURES = [
  { title: 'AI מתקדם בעברית', desc: 'תגובות מקצועיות בעברית תקינה דקדוקית, כולל התאמה למגדר ולטון העסק שלכם', icon: 'Aa' },
  { title: 'תגובה תוך שניות', desc: 'במקום 10 דקות מול מסך ריק - תגובה מקצועית מוכנה תוך 10 שניות', icon: '10s' },
  { title: 'לוח בקרה מרכזי', desc: 'כל הביקורות, התגובות והסטטיסטיקות שלכם במקום אחד', icon: '///' },
  { title: 'התאמה לעסק', desc: 'הגדירו פרופיל עסקי, טון ומגדר - התגובות מותאמות אישית', icon: '/\\' },
  { title: 'אבטחת מידע', desc: 'הצפנה מקצה לקצה, המידע שלכם לא משותף עם צדדים שלישיים', icon: '[ ]' },
  { title: 'שלושה טונים', desc: 'ידידותי, מקצועי, או התנצלותי - בחרו את הקול המתאים לכל ביקורת', icon: '{ }' },
]

const STATS = [
  { value: '93%', label: 'מהצרכנים קוראים ביקורות לפני רכישה', source: 'BrightLocal 2026' },
  { value: '35%', label: 'יותר הכנסות לעסקים שמגיבים לביקורות', source: 'ABMatic 2025' },
  { value: '31%', label: 'יותר מוכנים לשלם עבור עסק עם ביקורות מצוינות', source: 'WiserReview 2026' },
]

const RESEARCH_STATS = [
  { value: '81%', desc: 'מהצרכנים קוראים ביקורות גוגל לפני שהם פונים לעסק', source: 'WiserReview 2026' },
  { value: '19%', desc: 'מהלקוחות מצפים לתגובה באותו יום (עלייה מ-6% בשנה שעברה)', source: 'BrightLocal 2026' },
  { value: '48%', desc: 'יותר הוצאות של לקוחות בעסקים שמגיבים לביקורות', source: 'ABMatic 2025' },
  { value: '108%', desc: 'יותר הכנסות לעסקים עם 25+ ביקורות לעומת עסקים ללא', source: 'SixthCity Marketing 2026' },
  { value: '51.4%', desc: 'ירידה בהסתברות לרכישה אחרי ביקורת שלילית אחת ללא מענה', source: 'Fera.ai 2025' },
  { value: '8.8', desc: 'ימים - זמן המענה הממוצע של עסקים. המובילים מגיבים תוך 1.04 ימים', source: 'Reputation.com' },
]

const FAQ = [
  { q: 'האם הכלי באמת חינמי?', a: 'כן. התוכנית החינמית כוללת 3 תגובות בחודש ללא הרשמה. למשתמשים רשומים יש חבילות עם יותר תגובות ויכולות מתקדמות.' },
  { q: 'באיזו שפה הכלי כותב?', a: 'הכלי מתמחה בעברית. התגובות נכתבות בעברית תקינה דקדוקית, כולל התאמה למגדר - דבר שלא קיים באף כלי מתחרה.' },
  { q: 'מה ההבדל מכתיבה ידנית?', a: 'מחקרים מראים שעסקים מבזבזים בממוצע 4 שעות בחודש על כתיבת תגובות. הכלי שלנו מייצר תגובה מקצועית תוך שניות, חוסך זמן ומבטיח עקביות.' },
  { q: 'האם התגובות נשמעות אותנטיות?', a: 'לחלוטין. ה-AI מנתח את תוכן הביקורת ומייצר תגובה ייחודית ומותאמת. שום תגובה לא חוזרת על עצמה.' },
  { q: 'מה קורה עם ביקורות שליליות?', a: 'מחקרים מראים שביקורות שליליות שמקבלות מענה מקצועי יכולות להעלות המרות ב-85%. הכלי שלנו מייצר תגובות אמפתיות שהופכות ביקורת שלילית להזדמנות.' },
]

export default function LandingPage() {
  return (
    <div>
      {/* Hero */}
      <section style={{
        background: 'radial-gradient(ellipse at 50% 0%, var(--navy-light) 0%, var(--dark) 70%)',
        padding: '6rem 2rem 5rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '-150px', left: '50%', transform: 'translateX(-50%)',
          width: '600px', height: '400px',
          background: 'radial-gradient(circle, var(--cyan-glow) 0%, transparent 70%)',
          pointerEvents: 'none', animation: 'glow 4s ease-in-out infinite',
        }} />

        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }} className="slide-up">
          <div style={{
            display: 'inline-block', background: 'rgba(19, 239, 245, 0.1)',
            border: '1px solid rgba(19, 239, 245, 0.2)', color: 'var(--cyan)',
            padding: '0.4rem 1.2rem', borderRadius: 'var(--radius-pill)',
            fontSize: '0.85rem', fontWeight: 600, marginBottom: '2rem',
          }}>
            הכלי הראשון בעברית למענה אוטומטי על ביקורות גוגל
          </div>

          <h1 style={{ fontSize: '3.2rem', fontWeight: 900, lineHeight: 1.15, marginBottom: '1.5rem', letterSpacing: '-1px' }}>
            המוניטין של העסק שלכם
            <br />
            <span style={{ color: 'var(--cyan)' }}>מנוהל אוטומטית</span>
          </h1>

          <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', maxWidth: '560px', margin: '0 auto 2.5rem', lineHeight: 1.8 }}>
            93% מהצרכנים קוראים ביקורות לפני רכישה. עסקים שמגיבים מרוויחים 35% יותר.
            הכלי שלנו מייצר תגובות מקצועיות בעברית תוך שניות.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/free-tool" style={{
              background: 'var(--cyan)', color: 'var(--navy)', padding: '0.9rem 2.5rem',
              borderRadius: 'var(--radius-pill)', fontSize: '1.05rem', fontWeight: 800,
              boxShadow: 'var(--shadow-cyan)', display: 'inline-block',
            }}>
              נסו עכשיו בחינם
            </Link>
            <Link to="/pricing" style={{
              background: 'var(--charcoal)', color: 'var(--text-white)', padding: '0.9rem 2.5rem',
              borderRadius: 'var(--radius-pill)', fontSize: '1.05rem', fontWeight: 600,
              display: 'inline-block',
            }}>
              צפו במחירים
            </Link>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section style={{
        background: 'var(--navy)', borderTop: '1px solid var(--border-dark)',
        borderBottom: '1px solid var(--border-dark)', padding: '2.5rem 2rem',
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '4rem', flexWrap: 'wrap', maxWidth: '900px', margin: '0 auto' }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ textAlign: 'center', flex: '1 1 200px' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--cyan)' }}>{s.value}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.3rem', lineHeight: 1.5 }}>{s.label}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', opacity: 0.5, marginTop: '0.2rem' }}>{s.source}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '5rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2.2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          למה <span style={{ color: 'var(--cyan)' }}>AIReviewReply</span>?
        </h2>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '3.5rem', fontSize: '1.05rem' }}>
          הכלי שכל עסק ישראלי צריך לניהול המוניטין הדיגיטלי
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {FEATURES.map((f, i) => (
            <div key={i} style={{
              background: 'var(--navy)', padding: '2rem', borderRadius: 'var(--radius)',
              border: '1px solid var(--border-dark)', transition: 'var(--transition)', cursor: 'default',
            }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(19, 239, 245, 0.3)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-dark)'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <div style={{
                width: '44px', height: '44px', borderRadius: 'var(--radius-sm)',
                background: 'rgba(19, 239, 245, 0.08)', border: '1px solid rgba(19, 239, 245, 0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.85rem', fontWeight: 800, color: 'var(--cyan)',
                marginBottom: '1rem', fontFamily: 'monospace',
              }}>{f.icon}</div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>{f.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <AdBanner variant="banner" />

      {/* How it works */}
      <section style={{ padding: '5rem 2rem', background: 'var(--navy)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '2.2rem', fontWeight: 800, marginBottom: '3.5rem' }}>
            איך זה <span style={{ color: 'var(--cyan)' }}>עובד</span>?
          </h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
            {[
              { step: '01', title: 'הדביקו ביקורת', desc: 'העתיקו ביקורת מגוגל, או חברו את החשבון העסקי לסנכרון אוטומטי' },
              { step: '02', title: 'בחרו טון', desc: 'ידידותי, מקצועי, או התנצלותי. ה-AI מתאים את התגובה לפי בחירתכם' },
              { step: '03', title: 'פרסמו', desc: 'עברו על התגובה, ערכו לפי הצורך, ופרסמו ישירות בגוגל בלחיצה' },
            ].map((item, i) => (
              <div key={i} style={{ flex: '1 1 250px', textAlign: 'center', padding: '2rem 1.5rem' }}>
                <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--cyan)', opacity: 0.3, marginBottom: '0.5rem', lineHeight: 1 }}>{item.step}</div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Section */}
      <section style={{ padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '2.2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            מה אומרים <span style={{ color: 'var(--cyan)' }}>המחקרים</span>
          </h2>
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '1rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
            נתונים מעודכנים מ-2025-2026 שמוכיחים את ההשפעה הישירה של ביקורות גוגל על ההכנסות של עסקים
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {RESEARCH_STATS.map((s, i) => (
              <div key={i} style={{
                background: 'var(--navy)', padding: '1.75rem', borderRadius: 'var(--radius)',
                border: '1px solid var(--border-dark)', borderRight: '3px solid var(--cyan)',
              }}>
                <div style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--cyan)', marginBottom: '0.5rem' }}>{s.value}</div>
                <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '0.5rem' }}>{s.desc}</p>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', opacity: 0.6 }}>{s.source}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AdBanner variant="inline" />

      {/* Israeli Market Context */}
      <section style={{ padding: '5rem 2rem', background: 'var(--navy)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '2.2rem', fontWeight: 800, marginBottom: '1rem' }}>
            השוק <span style={{ color: 'var(--cyan)' }}>הישראלי</span> בנתונים
          </h2>
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '1rem' }}>
            ישראל היא אחד השווקים הדיגיטליים הצומחים ביותר, עם תלות גבוהה במיוחד בגוגל
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {[
              { stat: '98%', text: 'מחיפושי האינטרנט בישראל מתבצעים בגוגל - הכי גבוה בעולם', source: 'Clicks.so' },
              { stat: '$21.3B', text: 'שווי שוק המסחר האלקטרוני הישראלי ב-2025, עם צמיחה ל-$29.15B ב-2029', source: 'ResearchandMarkets Q4 2025' },
              { stat: '75%', text: 'מהישראלים מבצעים רכישות אונליין באופן קבוע', source: 'Israel Internet Association' },
              { stat: '40%', text: 'יותר הוצאות של ישראלים בעסקים עם ביקורות מצוינות', source: 'Argos Multilingual' },
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '1.5rem',
                background: 'var(--navy-card)', padding: '1.5rem',
                borderRadius: 'var(--radius)', border: '1px solid var(--border-dark)',
              }}>
                <div style={{
                  fontSize: '1.8rem', fontWeight: 900, color: 'var(--cyan)',
                  minWidth: '100px', textAlign: 'center',
                }}>{item.stat}</div>
                <div>
                  <p style={{ color: 'var(--text-light)', fontSize: '0.95rem', lineHeight: 1.6 }}>{item.text}</p>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', opacity: 0.5 }}>{item.source}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section style={{ padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            תוכניות <span style={{ color: 'var(--cyan)' }}>ומחירים</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '1.05rem' }}>
            התחילו בחינם, שדרגו כשתצטרכו. ללא התחייבות.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            {[
              { name: 'חינם', price: '0 ש"ח', responses: '3 תגובות/חודש', primary: false },
              { name: 'סטארטר', price: '79 ש"ח', responses: '50 תגובות/חודש', primary: true },
              { name: 'צמיחה', price: '149 ש"ח', responses: '200 תגובות/חודש', primary: false },
            ].map((plan, i) => (
              <div key={i} style={{
                background: 'var(--navy)', padding: '2.5rem 2rem', borderRadius: 'var(--radius)',
                border: plan.primary ? '1px solid var(--cyan)' : '1px solid var(--border-dark)',
                boxShadow: plan.primary ? 'var(--shadow-cyan)' : 'none', position: 'relative',
              }}>
                {plan.primary && (
                  <div style={{
                    position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)',
                    background: 'var(--cyan)', color: 'var(--navy)', padding: '0.2rem 1.2rem',
                    borderRadius: 'var(--radius-pill)', fontSize: '0.75rem', fontWeight: 800,
                  }}>
                    הכי פופולרי
                  </div>
                )}
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-light)', marginBottom: '0.75rem' }}>{plan.name}</h3>
                <div style={{ fontSize: '2.8rem', fontWeight: 900, color: 'var(--cyan)', marginBottom: '0.25rem' }}>{plan.price}</div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>{plan.responses}</p>
                <Link to="/pricing" style={{
                  display: 'block', padding: '0.7rem', textAlign: 'center',
                  background: plan.primary ? 'var(--cyan)' : 'transparent',
                  color: plan.primary ? 'var(--navy)' : 'var(--cyan)',
                  border: plan.primary ? 'none' : '1px solid var(--cyan)',
                  borderRadius: 'var(--radius-pill)', fontWeight: 700, fontSize: '0.95rem',
                }}>
                  {plan.primary ? 'בחרו סטארטר' : plan.price === '0 ש"ח' ? 'התחילו בחינם' : 'בחרו צמיחה'}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AdBanner variant="banner" />

      {/* FAQ */}
      <section style={{ padding: '5rem 2rem', background: 'var(--navy)' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '2.2rem', fontWeight: 800, marginBottom: '2.5rem' }}>
            שאלות <span style={{ color: 'var(--cyan)' }}>נפוצות</span>
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {FAQ.map((item, i) => (
              <details key={i} style={{
                background: 'var(--navy-card)', borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-dark)', padding: '1.25rem 1.5rem',
              }}>
                <summary style={{ fontWeight: 600, cursor: 'pointer', fontSize: '1rem', color: 'var(--text-white)', listStyle: 'none' }}>
                  {item.q}
                </summary>
                <p style={{ marginTop: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '0.95rem' }}>
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ padding: '5rem 2rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: '500px', height: '300px',
          background: 'radial-gradient(circle, var(--cyan-glow) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '1rem' }}>
            המוניטין של העסק שלכם <span style={{ color: 'var(--cyan)' }}>שווה יותר</span>
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
            עסקים שמגיבים לביקורות מרוויחים 35% יותר. התחילו להגיב מקצועית היום.
          </p>
          <Link to="/free-tool" style={{
            display: 'inline-block', background: 'var(--cyan)', color: 'var(--navy)',
            padding: '1rem 3rem', borderRadius: 'var(--radius-pill)',
            fontSize: '1.1rem', fontWeight: 800, boxShadow: 'var(--shadow-cyan)',
          }}>
            נסו עכשיו בחינם
          </Link>
        </div>
      </section>
    </div>
  )
}
