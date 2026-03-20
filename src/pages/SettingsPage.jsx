import { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'
import ToneSelector from '../components/ToneSelector'
import LoadingSpinner from '../components/LoadingSpinner'

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

export default function SettingsPage() {
  const { profile, loadingProfile, updateProfile, getUsageInfo } = useApp()
  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [description, setDescription] = useState('')
  const [tone, setTone] = useState('professional')
  const [gender, setGender] = useState('male')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (profile) {
      const bp = profile.businessProfile || {}
      setName(bp.name || '')
      setType(bp.type || '')
      setDescription(bp.description || '')
      setTone(profile.preferences?.tone || 'professional')
      setGender(profile.preferences?.gender || 'male')
    }
  }, [profile])

  async function handleSave() {
    setSaving(true)
    await updateProfile({
      businessProfile: { name, type, description },
      preferences: { tone, gender },
    })
    setSaving(false)
  }

  if (loadingProfile) return <LoadingSpinner />

  const usage = getUsageInfo()
  const tierLabels = { free: 'חינם', starter: 'סטארטר', growth: 'צמיחה' }

  return (
    <div style={{ maxWidth: '650px', margin: '0 auto', padding: '2.5rem 1rem' }} className="fade-in">
      <h1 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '2rem' }}>הגדרות</h1>

      {/* Subscription Info */}
      <div style={{
        background: 'var(--navy)',
        padding: '1.5rem',
        borderRadius: 'var(--radius)',
        border: '1px solid var(--border-dark)',
        marginBottom: '1.5rem',
      }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--cyan)' }}>מנוי</h2>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>חבילה: </span>
            <span style={{ fontWeight: 600 }}>{tierLabels[usage.tier]}</span>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>שימוש: </span>
            <span style={{ fontWeight: 600 }}>{usage.used} / {usage.limit} תגובות החודש</span>
          </div>
        </div>
        <div style={{
          background: 'var(--dark)',
          borderRadius: '4px',
          height: '6px',
          marginTop: '0.75rem',
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            borderRadius: '4px',
            width: `${Math.min((usage.used / usage.limit) * 100, 100)}%`,
            background: usage.used >= usage.limit ? 'var(--error)' : 'var(--cyan)',
            transition: 'width 0.3s ease',
            boxShadow: usage.used < usage.limit ? '0 0 8px var(--cyan-glow)' : 'none',
          }} />
        </div>
      </div>

      {/* Business Profile */}
      <div style={{
        background: 'var(--navy)',
        padding: '1.5rem',
        borderRadius: 'var(--radius)',
        border: '1px solid var(--border-dark)',
        marginBottom: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--cyan)' }}>פרופיל עסקי</h2>
        <div>
          <label style={{ fontWeight: 500, fontSize: '0.9rem', marginBottom: '0.4rem', display: 'block', color: 'var(--text-light)' }}>שם העסק</label>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="למשל: מסעדת שולחן ערוך" style={inputStyle}
            onFocus={(e) => e.target.style.borderColor = 'var(--cyan)'}
            onBlur={(e) => e.target.style.borderColor = 'var(--border-dark)'}
          />
        </div>
        <div>
          <label style={{ fontWeight: 500, fontSize: '0.9rem', marginBottom: '0.4rem', display: 'block', color: 'var(--text-light)' }}>סוג העסק</label>
          <input value={type} onChange={(e) => setType(e.target.value)} placeholder="למשל: מסעדה, מספרה, חנות" style={inputStyle}
            onFocus={(e) => e.target.style.borderColor = 'var(--cyan)'}
            onBlur={(e) => e.target.style.borderColor = 'var(--border-dark)'}
          />
        </div>
        <div>
          <label style={{ fontWeight: 500, fontSize: '0.9rem', marginBottom: '0.4rem', display: 'block', color: 'var(--text-light)' }}>תיאור קצר</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)}
            placeholder="תארו את העסק בכמה מילים..." rows={3}
            style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.7 }}
            onFocus={(e) => e.target.style.borderColor = 'var(--cyan)'}
            onBlur={(e) => e.target.style.borderColor = 'var(--border-dark)'}
          />
        </div>
      </div>

      {/* Preferences */}
      <div style={{
        background: 'var(--navy)',
        padding: '1.5rem',
        borderRadius: 'var(--radius)',
        border: '1px solid var(--border-dark)',
        marginBottom: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--cyan)' }}>העדפות</h2>
        <div>
          <label style={{ fontWeight: 500, fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block', color: 'var(--text-light)' }}>טון ברירת מחדל</label>
          <ToneSelector value={tone} onChange={setTone} />
        </div>
        <div>
          <label style={{ fontWeight: 500, fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block', color: 'var(--text-light)' }}>מגדר הפנייה</label>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {[{ id: 'male', label: 'זכר' }, { id: 'female', label: 'נקבה' }].map((g) => (
              <button key={g.id} onClick={() => setGender(g.id)} style={{
                flex: 1,
                padding: '0.7rem',
                borderRadius: 'var(--radius-sm)',
                border: `1px solid ${gender === g.id ? 'var(--cyan)' : 'var(--border-dark)'}`,
                background: gender === g.id ? 'rgba(19, 239, 245, 0.08)' : 'var(--navy-card)',
                fontWeight: gender === g.id ? 700 : 400,
                color: gender === g.id ? 'var(--cyan)' : 'var(--text-muted)',
              }}>
                {g.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button onClick={handleSave} disabled={saving} style={{
        width: '100%',
        background: saving ? 'var(--charcoal)' : 'var(--cyan)',
        color: saving ? 'var(--text-muted)' : 'var(--navy)',
        padding: '0.9rem',
        borderRadius: 'var(--radius-pill)',
        fontSize: '1.05rem',
        fontWeight: 800,
        boxShadow: saving ? 'none' : 'var(--shadow-cyan)',
      }}>
        {saving ? 'שומר...' : 'שמור הגדרות'}
      </button>
    </div>
  )
}
