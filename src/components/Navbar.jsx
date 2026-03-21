import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const isActive = (path) => location.pathname === path

  const linkStyle = (path) => ({
    color: isActive(path) ? 'var(--cyan)' : 'var(--text-light)',
    fontWeight: isActive(path) ? 600 : 400,
    fontSize: '0.95rem',
    transition: 'var(--transition)',
    padding: '0.4rem 0',
    borderBottom: isActive(path) ? '2px solid var(--cyan)' : '2px solid transparent',
  })

  return (
    <nav style={{
      background: 'rgba(10, 10, 46, 0.85)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border-dark)',
      padding: '0 2rem',
      height: '70px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <Link to="/" style={{
        fontSize: '1.4rem',
        fontWeight: 900,
        color: 'var(--cyan)',
        letterSpacing: '-0.5px',
      }}>
        AIReviewReply
      </Link>

      {/* Mobile menu button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          display: 'none',
          background: 'none',
          color: 'var(--text-white)',
          fontSize: '1.5rem',
          padding: '0.25rem',
        }}
        className="mobile-menu-btn"
      >
        {menuOpen ? '✕' : '☰'}
      </button>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '2rem',
      }}>
        <Link to="/free-tool" style={linkStyle('/free-tool')}>כלי חינמי</Link>
        <Link to="/pricing" style={linkStyle('/pricing')}>מחירים</Link>
        <Link to="/guide" style={linkStyle('/guide')}>מדריך</Link>
        {user ? (
          <>
            <Link to="/dashboard" style={linkStyle('/dashboard')}>לוח בקרה</Link>
            <Link to="/settings" style={linkStyle('/settings')}>הגדרות</Link>
            <button
              onClick={async () => { await logout(); navigate('/') }}
              style={{
                background: 'transparent',
                color: 'var(--text-muted)',
                fontSize: '0.9rem',
                padding: '0.45rem 1rem',
                borderRadius: 'var(--radius-pill)',
                border: '1px solid var(--border-light)',
              }}
            >
              התנתק
            </button>
          </>
        ) : (
          <Link to="/auth" style={{
            background: 'var(--cyan)',
            color: 'var(--navy)',
            padding: '0.5rem 1.5rem',
            borderRadius: 'var(--radius-pill)',
            fontWeight: 700,
            fontSize: '0.9rem',
            display: 'inline-block',
          }}>
            התחברות
          </Link>
        )}
      </div>
    </nav>
  )
}
