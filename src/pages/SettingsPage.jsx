import { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'
import ToneSelector from '../components/ToneSelector'
import LoadingSpinner from '../components/LoadingSpinner'

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

  const inputStyle = {
    width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)',
    border: '1px solid var(--border)', fontSize: '1rem', outline: 'none',
  }

  return (
    <div style={{ maxWidth: '650px', margin: '0 auto', padding: '2rem 1rem' }} className="fade-in">
      <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '2rem' }}>הגדרות</h1>

      {/* Subscription Info */}
      <div style={{
        background: 'white', padding: '1.5rem', borderRadius: 'var(--radius)',
        boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border)', marginBottom: '1.5rem',
      }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>מנוי</h2>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <span style={{ color: 'var(--text-secondary)' }}>חבילה: </span>
            <span style={{ fontWeight: 600 }}>{tierLabels[usage.tier]}</span>
          </div>
          <div>
            <span style={{ color: 'var(--text-secondary)' }}>שימוש: </span>
            <span style={{ fontWeight: 600 }}>{usage.used} / {usage.limit} תגובות החודש</span>
          </div>
        </div>
        <div style={{
          background: 'var(--bg)', borderRadius: '4px', height: '8px', marginTop: '0.75rem', overflow: 'hidden',
        }}>
          <div style={{
            height: '100%', borderRadius: '4px',
            width: `${Math.min((usage.used / usage.limit) * 100, 100)}%`,
            background: usage.used >= usage.limit ? 'var(--error)' : 'var(--primary)',
            transition: 'width 0.3s ease',
          }} />
        </div>
      </div>

      {/* Business Profile */}
      <div style={{
        background: 'white', padding: '1.5rem', borderRadius: 'var(--radius)',
        boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border)', marginBottom: '1.5rem',
        display: 'flex', flexDirection: 'column', gap: '1rem',
      }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>פרופיל עסקי</h2>
        <div>
          <label style={{ fontWeight: 500, fontSize: '0.9rem', marginBottom: '0.3rem', display: 'block' }}>שם העסק</label>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="למשל: מסעדת שולחן ערוך" style={inputStyle} />
        </div>
        <div>
          <label style={{ fontWeight: 500, fontSize: '0.9rem', marginBottom: '0.3rem', display: 'block' }}>סוג העסק</label>
          <input value={type} onChange={(e) => setType(e.target.value)} placeholder="למשל: מסעדה, מספרה, חנות" style={inputStyle} />
        </div>
        <div>
          <label style={{ fontWeight: 500, fontSize: '0.9rem', marginBottom: '0.3rem', display: 'block' }}>תיאור קצר</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)}
            placeholder="תארו את העסק בכמה מילים..." rows={3}
            style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
          />
        </div>
      </div>

      {/* Preferences */}
      <div style={{
        background: 'white', padding: '1.5rem', borderRadius: 'var(--radius)',
        boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border)', marginBottom: '1.5rem',
        display: 'flex', flexDirection: 'column', gap: '1rem',
      }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>העדפות</h2>
        <div>
          <label style={{ fontWeight: 500, fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block' }}>טון ברירת מחדל</label>
          <ToneSelector value={tone} onChange={setTone} />
        </div>
        <div>
          <label style={{ fontWeight: 500, fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block' }}>מגדר הפנייה</label>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {[{ id: 'male', label: 'זכר' }, { id: 'female', label: 'נקבה' }].map((g) => (
              <button key={g.id} onClick={() => setGender(g.id)} style={{
                flex: 1, padding: '0.6rem', borderRadius: 'var(--radius-sm)',
                border: `2px solid ${gender === g.id ? 'var(--primary)' : 'var(--border)'}`,
                background: gender === g.id ? 'rgba(77,150,255,0.08)' : 'white',
                fontWeight: gender === g.id ? 600 : 400,
                color: gender === g.id ? 'var(--primary)' : 'var(--text)',
              }}>
                {g.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button onClick={handleSave} disabled={saving} style={{
        width: '100%', background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
        color: 'white', padding: '0.85rem', borderRadius: 'var(--radius-sm)',
        fontSize: '1.05rem', fontWeight: 700, opacity: saving ? 0.7 : 1,
      }}>
        {saving ? 'שומר...' : 'שמור הגדרות'}
      </button>
    </div>
  )
}
