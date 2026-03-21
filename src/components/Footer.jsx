import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--navy)',
      borderTop: '1px solid var(--border-dark)',
      padding: '3.5rem 2rem 1.5rem',
      marginTop: 'auto',
    }}>
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '2.5rem',
      }}>
        <div style={{ flex: '1 1 300px' }}>
          <h3 style={{
            fontSize: '1.3rem',
            fontWeight: 800,
            color: 'var(--cyan)',
            marginBottom: '0.75rem',
          }}>
            AIReviewReply
          </h3>
          <p style={{
            color: 'var(--text-muted)',
            fontSize: '0.9rem',
            maxWidth: '300px',
            lineHeight: 1.7,
            marginBottom: '1rem',
          }}>
            כלי AI חכם שעוזר לעסקים ישראליים להגיב לביקורות גוגל בעברית מקצועית. חוסכים 95% מהזמן, משפרים מוניטין, מגדילים הכנסות.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '4rem', flexWrap: 'wrap' }}>
          <div>
            <h4 style={{
              fontSize: '0.85rem',
              fontWeight: 600,
              color: 'var(--text-light)',
              marginBottom: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}>
              מוצר
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <Link to="/free-tool" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>כלי חינמי לתגובות</Link>
              <Link to="/pricing" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>מחירים ותוכניות</Link>
              <Link to="/dashboard" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>לוח בקרה</Link>
              <Link to="/settings" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>הגדרות</Link>
            </div>
          </div>
          <div>
            <h4 style={{
              fontSize: '0.85rem',
              fontWeight: 600,
              color: 'var(--text-light)',
              marginBottom: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}>
              משאבים
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <Link to="/guide" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>מדריך ביקורות גוגל</Link>
              <Link to="/auth" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>הרשמה / התחברות</Link>
            </div>
          </div>
        </div>
      </div>

      {/* SEO Keywords Footer */}
      <div style={{
        maxWidth: '1100px',
        margin: '2rem auto 0',
        padding: '1.5rem 0',
        borderTop: '1px solid var(--border-dark)',
      }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', lineHeight: 1.8, opacity: 0.5, textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
          AIReviewReply - מענה חכם לביקורות גוגל | כלי AI לתגובות מקצועיות בעברית | ניהול ביקורות גוגל לעסקים ישראליים | מענה אוטומטי לביקורות | שיפור מוניטין עסקי | ניהול מוניטין דיגיטלי | תגובות AI בעברית
        </p>
      </div>

      <div style={{
        borderTop: '1px solid var(--border-dark)',
        marginTop: '1rem',
        paddingTop: '1.25rem',
        textAlign: 'center',
        color: 'var(--text-muted)',
        fontSize: '0.8rem',
      }}>
        &copy; {new Date().getFullYear()} AIReviewReply. כל הזכויות שמורות.
      </div>
    </footer>
  )
}
