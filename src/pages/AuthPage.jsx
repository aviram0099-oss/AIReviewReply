import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

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

  const inputStyle = {
    width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)',
    border: '1px solid var(--border)', fontSize: '1rem', outline: 'none',
  }

  return (
    <div style={{
      maxWidth: '420px', margin: '0 auto', padding: '3rem 1rem',
    }} className="fade-in">
      <h1 style={{ textAlign: 'center', fontSize: '1.8rem', fontWeight: 800, marginBottom: '2rem' }}>
        {tab === 'login' ? 'התחברות' : 'הרשמה'}
      </h1>

      <div style={{
        display: 'flex', marginBottom: '1.5rem', background: 'var(--bg)',
        borderRadius: 'var(--radius-sm)', padding: '4px',
      }}>
        {['login', 'register'].map((t) => (
          <button key={t} onClick={() => { setTab(t); setError('') }} style={{
            flex: 1, padding: '0.6rem', borderRadius: 'var(--radius-sm)',
            background: tab === t ? 'white' : 'transparent',
            color: tab === t ? 'var(--primary)' : 'var(--text-secondary)',
            fontWeight: tab === t ? 600 : 400, fontSize: '0.95rem',
            boxShadow: tab === t ? 'var(--shadow-sm)' : 'none',
            transition: 'var(--transition)',
          }}>
            {t === 'login' ? 'התחברות' : 'הרשמה'}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} style={{
        background: 'white', padding: '2rem', borderRadius: 'var(--radius)',
        boxShadow: 'var(--shadow)', display: 'flex', flexDirection: 'column', gap: '1rem',
      }}>
        {tab === 'register' && (
          <div>
            <label style={{ fontWeight: 500, fontSize: '0.9rem', marginBottom: '0.3rem', display: 'block' }}>שם מלא</label>
            <input
              type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)}
              placeholder="ישראל ישראלי" style={inputStyle}
            />
          </div>
        )}
        <div>
          <label style={{ fontWeight: 500, fontSize: '0.9rem', marginBottom: '0.3rem', display: 'block' }}>אימייל</label>
          <input
            type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com" style={{ ...inputStyle, direction: 'ltr', textAlign: 'right' }}
          />
        </div>
        <div>
          <label style={{ fontWeight: 500, fontSize: '0.9rem', marginBottom: '0.3rem', display: 'block' }}>סיסמה</label>
          <input
            type="password" value={password} onChange={(e) => setPassword(e.target.value)}
            placeholder="לפחות 6 תווים" style={{ ...inputStyle, direction: 'ltr', textAlign: 'right' }}
          />
        </div>

        {error && (
          <div style={{
            background: '#FEF2F2', border: '1px solid var(--error)', color: '#991B1B',
            padding: '0.6rem 0.8rem', borderRadius: 'var(--radius-sm)', fontSize: '0.9rem',
          }}>
            {error}
          </div>
        )}

        <button type="submit" disabled={loading} style={{
          background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
          color: 'white', padding: '0.85rem', borderRadius: 'var(--radius-sm)',
          fontSize: '1rem', fontWeight: 700, opacity: loading ? 0.7 : 1,
          transition: 'var(--transition)', marginTop: '0.5rem',
        }}>
          {loading ? 'טוען...' : tab === 'login' ? 'התחבר' : 'הירשם'}
        </button>
      </form>
    </div>
  )
}
