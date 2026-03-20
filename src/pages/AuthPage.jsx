import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const inputStyle = {
  width: '100%',
  padding: '0.8rem 1rem',
  borderRadius: 'var(--radius-sm)',
  border: '1px solid var(--border-dark)',
  background: 'var(--navy-card)',
  color: 'var(--text-white)',
  fontSize: '1rem',
  outline: 'none',
  transition: 'var(--transition)',
}

export default function AuthPage() {
  const [tab, setTab] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login, register } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!email.trim() || !password.trim()) {
      setError('נא למלא את כל השדות')
      return
    }
    if (tab === 'register' && !displayName.trim()) {
      setError('נא להזין שם מלא')
      return
    }
    if (password.length < 6) {
      setError('הסיסמה חייבת להכיל לפחות 6 תווים')
      return
    }

    setLoading(true)
    try {
      if (tab === 'login') {
        await login(email, password)
      } else {
        await register(email, password, displayName)
      }
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
    }
    setLoading(false)
  }

  return (
    <div style={{ maxWidth: '420px', margin: '0 auto', padding: '4rem 1rem' }} className="fade-in">
      <h1 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 900, marginBottom: '2.5rem' }}>
        {tab === 'login' ? 'התחברות' : 'הרשמה'}
      </h1>

      <div style={{
        display: 'flex',
        marginBottom: '1.5rem',
        background: 'var(--navy)',
        borderRadius: 'var(--radius-pill)',
        padding: '4px',
        border: '1px solid var(--border-dark)',
      }}>
        {['login', 'register'].map((t) => (
          <button key={t} onClick={() => { setTab(t); setError('') }} style={{
            flex: 1,
            padding: '0.6rem',
            borderRadius: 'var(--radius-pill)',
            background: tab === t ? 'var(--cyan)' : 'transparent',
            color: tab === t ? 'var(--navy)' : 'var(--text-muted)',
            fontWeight: tab === t ? 700 : 400,
            fontSize: '0.95rem',
          }}>
            {t === 'login' ? 'התחברות' : 'הרשמה'}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} style={{
        background: 'var(--navy)',
        padding: '2rem',
        borderRadius: 'var(--radius)',
        border: '1px solid var(--border-dark)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
      }}>
        {tab === 'register' && (
          <div>
            <label style={{ fontWeight: 500, fontSize: '0.9rem', marginBottom: '0.4rem', display: 'block', color: 'var(--text-light)' }}>שם מלא</label>
            <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)}
              placeholder="ישראל ישראלי" style={inputStyle}
              onFocus={(e) => e.target.style.borderColor = 'var(--cyan)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--border-dark)'}
            />
          </div>
        )}
        <div>
          <label style={{ fontWeight: 500, fontSize: '0.9rem', marginBottom: '0.4rem', display: 'block', color: 'var(--text-light)' }}>אימייל</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com" style={{ ...inputStyle, direction: 'ltr', textAlign: 'right' }}
            onFocus={(e) => e.target.style.borderColor = 'var(--cyan)'}
            onBlur={(e) => e.target.style.borderColor = 'var(--border-dark)'}
          />
        </div>
        <div>
          <label style={{ fontWeight: 500, fontSize: '0.9rem', marginBottom: '0.4rem', display: 'block', color: 'var(--text-light)' }}>סיסמה</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
            placeholder="לפחות 6 תווים" style={{ ...inputStyle, direction: 'ltr', textAlign: 'right' }}
            onFocus={(e) => e.target.style.borderColor = 'var(--cyan)'}
            onBlur={(e) => e.target.style.borderColor = 'var(--border-dark)'}
          />
        </div>

        {error && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#FCA5A5',
            padding: '0.6rem 0.8rem',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.9rem',
          }}>
            {error}
          </div>
        )}

        <button type="submit" disabled={loading} style={{
          background: loading ? 'var(--charcoal)' : 'var(--cyan)',
          color: loading ? 'var(--text-muted)' : 'var(--navy)',
          padding: '0.85rem',
          borderRadius: 'var(--radius-pill)',
          fontSize: '1rem',
          fontWeight: 800,
          marginTop: '0.5rem',
          boxShadow: loading ? 'none' : 'var(--shadow-cyan)',
        }}>
          {loading ? 'טוען...' : tab === 'login' ? 'התחבר' : 'הירשם'}
        </button>
      </form>
    </div>
  )
}
