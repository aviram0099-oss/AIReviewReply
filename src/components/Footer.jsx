import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--text)', color: 'white', padding: '3rem 2rem 1.5rem',
      marginTop: 'auto',
    }}>
      <div style={{
        maxWidth: '1100px', margin: '0 auto',
        display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem',
      }}>
        <div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>AIReviewReply</h3>
          <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', maxWidth: '300px' }}>
            כלי AI חכם שעוזר לעסקים ישראליים להגיב לביקורות גוגל בעברית מקצועית.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '3rem' }}>
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem' }}>ניווט</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              <Link to="/free-tool" style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>כלי חינמי</Link>
              <Link to="/pricing" style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>מחירים</Link>
              <Link to="/auth" style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>התחברות</Link>
            </div>
          </div>
        </div>
      </div>
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '2rem', paddingTop: '1rem',
        textAlign: 'center', color: 'var(--text-light)', fontSize: '0.8rem',
      }}>
        © {new Date().getFullYear()} AIReviewReply. כל הזכויות שמורות.
      </div>
    </footer>
  )
}
