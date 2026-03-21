import { Link } from 'react-router-dom'
import AdBanner from '../components/AdBanner'

const sectionStyle = {
  background: 'var(--navy)', borderRadius: 'var(--radius)',
  border: '1px solid var(--border-dark)', padding: '2.5rem',
  marginBottom: '1.5rem',
}

const h2Style = {
  fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.25rem',
  color: 'var(--text-white)', borderRight: '3px solid var(--cyan)',
  paddingRight: '1rem',
}

const pStyle = {
  color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 2,
  marginBottom: '1rem',
}

const statBoxStyle = {
  background: 'var(--dark)', borderRadius: 'var(--radius-sm)',
  border: '1px solid var(--border-dark)', padding: '1.25rem',
  textAlign: 'center',
}

const tipStyle = {
  background: 'rgba(19, 239, 245, 0.04)', border: '1px solid rgba(19, 239, 245, 0.15)',
  borderRadius: 'var(--radius-sm)', padding: '1.25rem 1.5rem',
  marginBottom: '1rem',
}

export default function GuidePage() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem 1rem 4rem' }} className="fade-in">
      {/* Breadcrumb */}
      <nav style={{ marginBottom: '2rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
        <Link to="/" style={{ color: 'var(--cyan)' }}>דף הבית</Link>
        <span style={{ margin: '0 0.5rem' }}>/</span>
        <span>המדריך המלא לביקורות גוגל</span>
      </nav>

      {/* Title */}
      <header style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, lineHeight: 1.2, marginBottom: '1rem' }}>
          המדריך המלא לניהול
          <br />
          <span style={{ color: 'var(--cyan)' }}>ביקורות גוגל</span> לעסקים בישראל
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.8, maxWidth: '650px' }}>
          כל מה שעסקים ישראליים צריכים לדעת על ביקורות גוגל: למה הן חשובות, איך להגיב נכון, ואיך AI יכול לחסוך לכם שעות של עבודה כל חודש.
        </p>
        <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <span style={{ fontWeight: 600, color: 'var(--text-light)' }}>עדכון אחרון:</span> מרץ 2026
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <span style={{ fontWeight: 600, color: 'var(--text-light)' }}>זמן קריאה:</span> 12 דקות
          </div>
        </div>
      </header>

      {/* Table of Contents */}
      <div style={{
        ...sectionStyle,
        background: 'var(--dark)',
      }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--cyan)' }}>תוכן עניינים</h2>
        <ol style={{ paddingRight: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {[
            'למה ביקורות גוגל חשובות לעסק שלכם',
            'הנתונים: ביקורות והשפעה על הכנסות',
            'השוק הישראלי - מה מיוחד',
            'איך להגיב לביקורת חיובית',
            'איך להגיב לביקורת שלילית',
            'טעויות נפוצות בתגובות לביקורות',
            'דוגמאות לתגובות מקצועיות בעברית',
            'ביקורות גוגל ו-SEO מקומי',
            'כמה זמן ומשאבים זה דורש',
            'איך AI משנה את המשחק',
          ].map((item, i) => (
            <li key={i} style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              <span style={{ color: 'var(--text-light)' }}>{item}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Section 1 */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>1. למה ביקורות גוגל חשובות לעסק שלכם</h2>
        <p style={pStyle}>
          ביקורות גוגל הפכו לאחד הגורמים המשפיעים ביותר על החלטות רכישה של צרכנים. לפי סקר BrightLocal לשנת 2026, 93% מהצרכנים קוראים ביקורות אונליין לפני שהם מחליטים לרכוש מוצר או שירות. בישראל, שבה 98% מהחיפושים מתבצעים דרך גוגל, ההשפעה אף גדולה יותר.
        </p>
        <p style={pStyle}>
          ביקורות גוגל משפיעות על העסק שלכם בשלושה מישורים מרכזיים: אמון הלקוחות, דירוג בתוצאות החיפוש, ושיעורי המרה. מחקר של Demandsage (2026) מצא ש-96% מהצרכנים מחפשים ביקורות לפני רכישה ראשונה, ו-92% בוחרים רק בעסקים עם דירוג 4 כוכבים ומעלה.
        </p>
        <p style={pStyle}>
          אבל ביקורות לבדן לא מספיקות. המפתח הוא <strong style={{ color: 'var(--text-white)' }}>התגובה לביקורות</strong>. מחקר של Ryviu מראה ש-90% מהצרכנים קוראים באופן פעיל את תגובות בעלי העסקים, ועסקים שמגיבים נהנים מכמעט כפול אמון לעומת מתחרים שלא מגיבים.
        </p>
      </section>

      {/* Section 2 - Stats */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>2. הנתונים: ביקורות והשפעה על הכנסות</h2>
        <p style={pStyle}>
          ההשפעה של ביקורות גוגל על ההכנסות מגובה במחקרים נרחבים. הנה הנתונים המעודכנים ביותר:
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            { value: '35%', label: 'יותר הכנסות לעסקים שמגיבים לביקורות', source: 'ABMatic 2025' },
            { value: '108%', label: 'יותר הכנסות לעסקים עם 25+ ביקורות', source: 'SixthCity Marketing 2026' },
            { value: '48%', label: 'יותר הוצאות של לקוחות בעסקים רספונסיביים', source: 'ABMatic 2025' },
            { value: '16.4%', label: 'עלייה בשיעור ההמרה עם 100% תגובות', source: 'Opensend 2025' },
            { value: '52%', label: 'יותר הכנסות לעסקים עם 9+ ביקורות עדכניות', source: 'SixthCity Marketing 2026' },
            { value: '31%', label: 'יותר מוכנים לשלם בעסק עם ביקורות מצוינות', source: 'WiserReview 2026' },
          ].map((s, i) => (
            <div key={i} style={statBoxStyle}>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--cyan)', marginBottom: '0.3rem' }}>{s.value}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginBottom: '0.2rem', lineHeight: 1.5 }}>{s.label}</div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', opacity: 0.6 }}>{s.source}</div>
            </div>
          ))}
        </div>
        <p style={pStyle}>
          המחקרים מראים תמונה חד-משמעית: ביקורות ותגובות הן לא רק עניין של שירות - הן מנוע הכנסות. עסקים שמשקיעים בניהול ביקורות רואים עלייה ישירה ברווחיות.
        </p>
      </section>

      <AdBanner variant="inline" style={{ marginBottom: '1.5rem' }} />

      {/* Section 3 - Israeli Market */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>3. השוק הישראלי - מה מיוחד</h2>
        <p style={pStyle}>
          ישראל מציגה מאפיינים ייחודיים שהופכים את ניהול ביקורות גוגל לקריטי במיוחד:
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {[
            { stat: '98%', text: 'מנתח השוק של גוגל בישראל - הגבוה ביותר בעולם. כמעט כל חיפוש עובר דרך גוגל, ולכן ביקורות גוגל הן הנכס הדיגיטלי החשוב ביותר שלכם.' },
            { stat: '58%', text: 'מהחיפושים בישראל מתבצעים ממכשירים ניידים. ביקורות גוגל מוצגות בולט במיוחד בתוצאות חיפוש במובייל ובמפות גוגל.' },
            { stat: '$21.3B', text: 'שווי שוק המסחר האלקטרוני הישראלי ב-2025, עם צפי לצמיחה ל-$29.15 מיליארד ב-2029. שוק עצום שמבוסס על אמון דיגיטלי.' },
            { stat: '40%', text: 'יותר הוצאות של צרכנים ישראליים בעסקים עם ביקורות מצוינות, לעומת עסקים ללא ביקורות או עם דירוג נמוך.' },
          ].map((item, i) => (
            <div key={i} style={{
              display: 'flex', gap: '1.25rem', alignItems: 'flex-start',
              background: 'var(--dark)', padding: '1.25rem', borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-dark)',
            }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--cyan)', minWidth: '80px', textAlign: 'center' }}>{item.stat}</div>
              <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>{item.text}</p>
            </div>
          ))}
        </div>
        <p style={pStyle}>
          בנוסף, ישראלים מבלים בממוצע 11 דקות בעמוד אך גולשים במספר מצומצם של עמודים (Argos Multilingual). כלומר, הרושם הראשוני חשוב מאוד - וביקורות הן לרוב הרושם הראשוני של לקוח פוטנציאלי.
        </p>
      </section>

      {/* Section 4 - Positive Reviews */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>4. איך להגיב לביקורת חיובית</h2>
        <p style={pStyle}>
          הרבה עסקים מתמקדים בביקורות שליליות ומתעלמים מהחיוביות. זו טעות. מענה לביקורת חיובית מחזק את הקשר עם הלקוח, מעודד לקוחות נוספים לכתוב ביקורות, ומשדר לגולשים שהעסק מעריך את הלקוחות שלו.
        </p>
        <div style={tipStyle}>
          <div style={{ fontWeight: 700, color: 'var(--cyan)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>עקרונות לתגובה חיובית</div>
          <ul style={{ paddingRight: '1.25rem', margin: 0 }}>
            {[
              'פנו ללקוח בשמו - זה יוצר קשר אישי',
              'הודו ללקוח באופן ספציפי על מה שציין בביקורת',
              'הזכירו את שם העסק - טוב ל-SEO',
              'הזמינו את הלקוח לחזור או לנסות שירות/מוצר נוסף',
              'שמרו על אורך סביר - 2-3 משפטים מספיקים',
            ].map((tip, i) => (
              <li key={i} style={{ color: 'var(--text-light)', fontSize: '0.9rem', lineHeight: 1.8 }}>{tip}</li>
            ))}
          </ul>
        </div>

        <div style={{ background: 'var(--dark)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-dark)', padding: '1.5rem', marginTop: '1rem' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--cyan)', marginBottom: '0.75rem' }}>דוגמה לתגובה חיובית (טון מקצועי)</div>
          <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', lineHeight: 1.8, fontStyle: 'italic', margin: 0 }}>
            "תודה רבה, יוסי. שמחים מאוד לשמוע שנהנית מהשירות והאוכל במסעדת שולחן ערוך. צוות המטבח שלנו משקיע רבות בכל מנה, ותגובות כמו שלך מעניקות לנו מוטיבציה להמשיך. נשמח לארח אותך שוב בקרוב."
          </p>
        </div>
      </section>

      {/* Section 5 - Negative Reviews */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>5. איך להגיב לביקורת שלילית</h2>
        <p style={pStyle}>
          ביקורת שלילית היא לא אסון - היא הזדמנות. מחקר של SixthCity Marketing (2026) מצא שביקורת שלילית שמקבלת מענה מקצועי ואמפתי יכולה להעלות את שיעורי ההמרה ב-85%. הסיבה: גולשים רואים שהעסק אכפתי ומוכן לתקן.
        </p>
        <p style={pStyle}>
          חשוב לזכור: 19% מהצרכנים מצפים לתגובה באותו יום (BrightLocal 2026), ו-56% מצפים לתגובה תוך 3 ימים. זמן התגובה הממוצע של עסקים הוא 8.8 ימים - עסקים שמגיבים מהר יותר בולטים לטובה.
        </p>
        <div style={tipStyle}>
          <div style={{ fontWeight: 700, color: 'var(--cyan)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>עקרונות לתגובה על ביקורת שלילית</div>
          <ul style={{ paddingRight: '1.25rem', margin: 0 }}>
            {[
              'הגיבו מהר - אידיאלית תוך 24 שעות',
              'הכירו ברגשות הלקוח - "אנחנו מצטערים לשמוע..."',
              'לעולם אל תתווכחו או תאשימו את הלקוח',
              'הציעו פתרון קונקרטי או הזמנה ליצירת קשר פרטי',
              'שמרו על טון מקצועי ורגוע גם כשהביקורת כועסת',
              'אל תציעו פיצוי פומבי - זה מעודד ביקורות שליליות נוספות',
            ].map((tip, i) => (
              <li key={i} style={{ color: 'var(--text-light)', fontSize: '0.9rem', lineHeight: 1.8 }}>{tip}</li>
            ))}
          </ul>
        </div>

        <div style={{ background: 'var(--dark)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-dark)', padding: '1.5rem', marginTop: '1rem' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--cyan)', marginBottom: '0.75rem' }}>דוגמה לתגובה על ביקורת שלילית (טון התנצלותי)</div>
          <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', lineHeight: 1.8, fontStyle: 'italic', margin: 0 }}>
            "מיכל, תודה שהקדשת מזמנך לשתף אותנו. אנחנו מצטערים מאוד לשמוע שהחוויה לא עמדה בציפיות. השירות שתיארת אינו משקף את הסטנדרט שאנחנו שואפים אליו. נשמח אם תיצרי איתנו קשר ישירות כדי שנוכל לתקן ולוודא שהביקור הבא יהיה חוויה אחרת לגמרי."
          </p>
        </div>
      </section>

      <AdBanner variant="article" style={{ marginBottom: '1.5rem' }} />

      {/* Section 6 - Common Mistakes */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>6. טעויות נפוצות בתגובות לביקורות</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {[
            { mistake: 'תגובות גנריות זהות', why: 'תגובות כמו "תודה על הביקורת" בלי התייחסות לתוכן משדרות חוסר אכפתיות. גוגל עלול גם לסמן תגובות חוזרות כספאם.' },
            { mistake: 'ויכוח עם הלקוח', why: 'ברגע שמתווכחים, גם אם צודקים, הגולשים האחרים רואים עסק שלא מקבל ביקורת. עדיף להציע פתרון.' },
            { mistake: 'זמן תגובה ארוך', why: '56% מהלקוחות מצפים לתגובה תוך 3 ימים. לאחר שבוע, ההשפעה החיובית של התגובה יורדת משמעותית.' },
            { mistake: 'התעלמות מביקורות חיוביות', why: 'רק 5% מהעסקים מגיבים באופן עקבי לביקורות. תגובה לביקורת חיובית מעודדת לקוחות נוספים לכתוב.' },
            { mistake: 'שימוש בשפה לא מקצועית', why: 'שגיאות כתיב, סלנג, או טון לא מתאים פוגעים באמינות. בעברית, שגיאות מגדר נפוצות במיוחד.' },
            { mistake: 'חשיפת מידע פרטי', why: 'לעולם אל תחשפו פרטים אישיים של הלקוח בתגובה פומבית. הציעו ליצור קשר בפרטי.' },
          ].map((item, i) => (
            <div key={i} style={{
              background: 'var(--dark)', padding: '1.25rem', borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-dark)', borderRight: '3px solid rgba(239, 68, 68, 0.5)',
            }}>
              <div style={{ fontWeight: 700, color: 'var(--text-white)', fontSize: '0.95rem', marginBottom: '0.3rem' }}>{item.mistake}</div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.7, margin: 0 }}>{item.why}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 7 - Examples */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>7. דוגמאות לתגובות מקצועיות בעברית</h2>
        <p style={pStyle}>
          הנה דוגמאות לתגובות מקצועיות בשלושה טונים שונים, לסוגי ביקורות שונים:
        </p>

        {[
          {
            type: 'מסעדה - ביקורת 5 כוכבים',
            review: '"האוכל מעולה, השירות מהיר ואדיב. נהנינו מכל רגע!"',
            response: 'תודה רבה על המילים החמות. שמחים לשמוע שנהנית מהאוכל והשירות. הצוות שלנו עובד קשה כדי להעניק חוויה מושלמת, ותגובות כמו שלך מעניקות השראה. מחכים לביקור הבא.',
            tone: 'מקצועי',
          },
          {
            type: 'קליניקה - ביקורת 2 כוכבים',
            review: '"המתנה ארוכה מדי, חיכיתי שעה מעבר לתור"',
            response: 'אנחנו מבינים את התסכול ומתנצלים על ההמתנה הארוכה. אנחנו עושים מאמצים לשפר את ניהול הזמנים שלנו. נשמח אם תיצור קשר ישירות כדי שנוכל לתאם תור בשעה נוחה יותר ולוודא חוויה טובה יותר בביקור הבא.',
            tone: 'התנצלותי',
          },
          {
            type: 'חנות - ביקורת 4 כוכבים',
            review: '"מבחר יפה ומחירים סבירים, אבל קצת קשה למצוא חנייה"',
            response: 'תודה על הביקורת! שמחים שאהבת את המבחר והמחירים. לגבי החנייה - יש חניון ציבורי ברחוב הסמוך עם תעריף מוזל ללקוחות שלנו. נשמח לספר יותר בביקור הבא.',
            tone: 'ידידותי',
          },
        ].map((ex, i) => (
          <div key={i} style={{
            background: 'var(--dark)', borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-dark)', padding: '1.5rem', marginBottom: '1rem',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-white)' }}>{ex.type}</span>
              <span style={{
                background: 'rgba(19, 239, 245, 0.1)', color: 'var(--cyan)',
                padding: '0.2rem 0.7rem', borderRadius: 'var(--radius-pill)',
                fontSize: '0.75rem', fontWeight: 600,
              }}>טון {ex.tone}</span>
            </div>
            <div style={{ marginBottom: '0.75rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>הביקורת:</div>
              <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', lineHeight: 1.6, fontStyle: 'italic', margin: 0 }}>{ex.review}</p>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--cyan)', marginBottom: '0.25rem', fontWeight: 600 }}>התגובה:</div>
              <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', lineHeight: 1.8, margin: 0 }}>{ex.response}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Section 8 - SEO */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>8. ביקורות גוגל ו-SEO מקומי</h2>
        <p style={pStyle}>
          ביקורות גוגל הן אחד הגורמים המשפיעים ביותר על דירוג החיפוש המקומי (Local SEO). גוגל מתחשב במספר ביקורות, דירוג ממוצע, תדירות ביקורות חדשות, ובתגובות של בעלי העסק.
        </p>
        <div style={tipStyle}>
          <div style={{ fontWeight: 700, color: 'var(--cyan)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>איך ביקורות משפיעות על הדירוג</div>
          <ul style={{ paddingRight: '1.25rem', margin: 0 }}>
            {[
              'כמות ביקורות - עסקים עם יותר ביקורות מדורגים גבוה יותר בתוצאות המקומיות',
              'דירוג ממוצע - דירוג 4.0+ הוא הסף שרוב הצרכנים דורשים',
              'עדכניות - ביקורות חדשות (3-6 חודשים אחרונים) משפיעות יותר מישנות',
              'תגובות בעל העסק - גוגל רואה תגובות כסימן שהעסק פעיל ואכפתי',
              'מילות מפתח בביקורות - כשלקוחות מזכירים את סוג העסק או השירות, זה מחזק את הרלוונטיות',
              'תגובות עם שם העסק - הזכרת שם העסק בתגובה מחזקת את הנוכחות בחיפוש',
            ].map((tip, i) => (
              <li key={i} style={{ color: 'var(--text-light)', fontSize: '0.9rem', lineHeight: 1.8 }}>{tip}</li>
            ))}
          </ul>
        </div>
        <p style={pStyle}>
          מחקר של SixthCity Marketing (2026) מצא שעסקים עם 25+ ביקורות רואים עלייה של עד 108% בהכנסות לעומת עסקים ללא ביקורות. המסקנה: השקעה בעידוד ביקורות ובמענה מקצועי היא השקעה ישירה ב-SEO וב הכנסות.
        </p>
      </section>

      <AdBanner variant="banner" style={{ marginBottom: '1.5rem' }} />

      {/* Section 9 - Time & Resources */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>9. כמה זמן ומשאבים זה דורש</h2>
        <p style={pStyle}>
          אחד החסמים הגדולים ביותר לניהול ביקורות הוא הזמן. לפי מחקר של Backlinko (2025), רק 5% מהעסקים מגיבים באופן עקבי לביקורות. הסיבה העיקרית: חוסר זמן.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            { label: 'זמן כתיבת תגובה ידנית', value: '5-15 דק\'', sub: 'כולל חשיבה, ניסוח, בדיקה' },
            { label: 'עלות תגובה ידנית', value: '25-50 ש"ח', sub: 'לפי שכר ממוצע + זמן' },
            { label: 'זמן תגובה עם AI', value: '10 שניות', sub: 'כולל בחירת טון ועריכה' },
            { label: 'עלות תגובה עם AI', value: '1.58 ש"ח', sub: 'בחבילת סטארטר' },
          ].map((item, i) => (
            <div key={i} style={statBoxStyle}>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--cyan)', marginBottom: '0.25rem' }}>{item.value}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-light)', fontWeight: 600, marginBottom: '0.15rem' }}>{item.label}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{item.sub}</div>
            </div>
          ))}
        </div>
        <p style={pStyle}>
          בחישוב פשוט: עסק עם 30 ביקורות בחודש שכותב כל תגובה ידנית מבזבז 5-7.5 שעות ו-750-1,500 ש"ח. עם AIReviewReply, אותו עסק חוסך 95% מהזמן ומשלם 79 ש"ח בלבד. החיסכון השנתי: בין 8,000 ל-17,000 ש"ח.
        </p>
      </section>

      {/* Section 10 - AI */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>10. איך AI משנה את המשחק</h2>
        <p style={pStyle}>
          בינה מלאכותית (AI) מאפשרת לעסקים להגיב לביקורות ברמה מקצועית, במהירות, ובעקביות - שלושה דברים שקשה מאוד להשיג בכתיבה ידנית. אבל לא כל כלי AI שווה, במיוחד בעברית.
        </p>
        <p style={pStyle}>
          עברית היא שפה מורפולוגית מורכבת: מילים משתנות לפי מגדר, מספר, וצורה דקדוקית. כלי תרגום אוטומטי או AI גנרי יפיקו לעתים קרובות תגובות עם שגיאות מגדר, סגנון לא טבעי, או ביטויים שלא משתמשים בהם בעברית מדוברת.
        </p>
        <div style={tipStyle}>
          <div style={{ fontWeight: 700, color: 'var(--cyan)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>מה שכלי AI מקצועי צריך לספק</div>
          <ul style={{ paddingRight: '1.25rem', margin: 0 }}>
            {[
              'עברית תקינה דקדוקית עם התאמה למגדר',
              'התאמת טון - ידידותי, מקצועי, או התנצלותי',
              'התחשבות בהקשר העסקי - סוג העסק, השירותים, השם',
              'תגובות ייחודיות שלא חוזרות על עצמן',
              'יכולת עריכה לפני פרסום',
              'אבטחת מידע - המידע לא משותף או מאומן',
            ].map((tip, i) => (
              <li key={i} style={{ color: 'var(--text-light)', fontSize: '0.9rem', lineHeight: 1.8 }}>{tip}</li>
            ))}
          </ul>
        </div>
        <p style={pStyle}>
          AIReviewReply נבנה מהיסוד לעברית. הפרומפטים שלנו מותאמים לדקדוק העברי, לתרבות העסקית הישראלית, ולציפיות של הצרכן הישראלי. התוצאה: תגובות שנשמעות כאילו נכתבו על ידי מנהל עסק מנוסה ואכפתי.
        </p>
      </section>

      {/* Sources */}
      <section style={{
        ...sectionStyle,
        background: 'var(--dark)',
      }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-light)' }}>מקורות ומחקרים</h2>
        <ul style={{ paddingRight: '1.25rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
          {[
            'BrightLocal - Local Consumer Review Survey 2026',
            'ABMatic - Impact of Customer Reviews on Conversion Rates (2025)',
            'WiserReview - Google Review Statistics (2026)',
            'SixthCity Marketing - Online Review Statistics (2026)',
            'Demandsage - Online Review Statistics (2026)',
            'Reputation.com - Why Respond to Reviews',
            'Ryviu - Impact of Review Response Time on Customer Trust',
            'Backlinko - Online Review Stats (2025)',
            'Argos Multilingual - Hebrew SEO Complexities',
            'ResearchandMarkets - Israel E-Commerce Market Q4 2025',
            'Clicks.so - Top Google Searches in Israel',
            'Opensend - Review Response Rate Statistics (2025)',
          ].map((source, i) => (
            <li key={i} style={{ color: 'var(--text-muted)', fontSize: '0.8rem', lineHeight: 1.6 }}>{source}</li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <section style={{
        textAlign: 'center', padding: '3rem 2rem', background: 'var(--navy)',
        borderRadius: 'var(--radius)', border: '1px solid var(--border-dark)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: '400px', height: '200px',
          background: 'radial-gradient(circle, var(--cyan-glow) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.75rem' }}>
            מוכנים להתחיל לחסוך <span style={{ color: 'var(--cyan)' }}>זמן וכסף</span>?
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '1.5rem', maxWidth: '500px', margin: '0 auto 1.5rem' }}>
            נסו את AIReviewReply בחינם - 3 תגובות ללא הרשמה
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/free-tool" style={{
              background: 'var(--cyan)', color: 'var(--navy)', padding: '0.85rem 2.5rem',
              borderRadius: 'var(--radius-pill)', fontSize: '1.05rem', fontWeight: 800,
              boxShadow: 'var(--shadow-cyan)', display: 'inline-block',
            }}>
              נסו עכשיו בחינם
            </Link>
            <Link to="/pricing" style={{
              background: 'transparent', color: 'var(--cyan)', padding: '0.85rem 2.5rem',
              borderRadius: 'var(--radius-pill)', fontSize: '1.05rem', fontWeight: 600,
              border: '1px solid var(--cyan)', display: 'inline-block',
            }}>
              צפו במחירים
            </Link>
          </div>
        </div>
      </section>

      <AdBanner variant="article" style={{ marginTop: '1.5rem' }} />
    </div>
  )
}
