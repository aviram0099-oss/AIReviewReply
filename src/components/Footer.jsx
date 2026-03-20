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
        <div>
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
          }}>
            כלי AI חכם שעוזר לעסקים ישראליים להגיב לביקורות גוגל בעברית מקצועית.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '4rem' }}>
          <div>
            <h4 style={{
              fontSize: '0.85rem',
              fontWeight: 600,
              color: 'var(--text-light)',
              marginBottom: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}>
              ניווט
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <Link to="/free-tool" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>כלי חינמי</Link>
              <Link to="/pricing" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>מחירים</Link>
              <Link to="/auth" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>התחברות</Link>
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
              קישורים
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <Link to="/dashboard" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>לוח בקרה</Link>
              <Link to="/settings" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>הגדרות</Link>
            </div>
          </div>
        </div>
      </div>
      <div style={{
        borderTop: '1px solid var(--border-dark)',
        marginTop: '2.5rem',
        paddingTop: '1.25rem',
        textAlign: 'center',
        color: 'var(--text-muted)',
        fontSize: '0.8rem',
      }}>
        © {new Date().getFullYear()} AIReviewReply. כל הזכויות שמורות.
      </div>
    </footer>
  )
}
