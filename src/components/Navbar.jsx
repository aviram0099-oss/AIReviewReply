import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const linkStyle = (path) => ({
    color: location.pathname === path ? 'var(--primary)' : 'var(--text)',
    fontWeight: location.pathname === path ? 600 : 400,
    fontSize: '0.95rem', transition: 'var(--transition)',
  })

  return (
    <nav style={{
      background: 'white', borderBottom: '1px solid var(--border)',
      padding: '0 2rem', height: '64px', display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100,
      boxShadow: 'var(--shadow-sm)',
    }}>
      <Link to="/" style={{
        fontSize: '1.3rem', fontWeight: 800, color: 'var(--primary)',
        background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
      }}>
        AIReviewReply
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <Link to="/free-tool" style={linkStyle('/free-tool')}>כלי חינמי</Link>
        <Link to="/pricing" style={linkStyle('/pricing')}>מחירים</Link>
        {user ? (
          <>
            <Link to="/dashboard" style={linkStyle('/dashboard')}>לוח בקרה</Link>
            <Link to="/settings" style={linkStyle('/settings')}>הגדרות</Link>
            <button
              onClick={async () => { await logout(); navigate('/') }}
              style={{
                background: 'none', color: 'var(--text-secondary)', fontSize: '0.9rem',
                padding: '0.4rem 0.8rem', borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border)', transition: 'var(--transition)',
              }}
            >
              התנתק
            </button>
          </>
        ) : (
          <Link to="/auth" style={{
            background: 'var(--primary)', color: 'white', padding: '0.5rem 1.2rem',
            borderRadius: 'var(--radius-sm)', fontWeight: 600, fontSize: '0.9rem',
            transition: 'var(--transition)',
          }}>
            התחברות
          </Link>
        )}
      </div>
    </nav>
  )
}
