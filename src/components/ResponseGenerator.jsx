import { useState } from 'react'
import ToneSelector from './ToneSelector'
import { generateResponse } from '../api/generate'
import { useApp } from '../context/AppContext'

export default function ResponseGenerator({ review, onResponseGenerated, onClose }) {
  const { profile, incrementUsage, getUsageInfo, showToast } = useApp()
  const [tone, setTone] = useState(profile?.preferences?.tone || 'professional')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const usage = getUsageInfo()

  async function handleGenerate() {
    if (usage.used >= usage.limit) {
      showToast('הגעת למגבלת התגובות החודשית. שדרגו את החבילה!', 'error')
      return
    }

    setLoading(true)
    try {
      const result = await generateResponse({
        reviewText: review.reviewText,
        tone,
        gender: profile?.preferences?.gender || 'male',
        businessProfile: profile?.businessProfile || {},
      })
      setResponse(result)
      await incrementUsage()
    } catch (err) {
      showToast(err.message || 'שגיאה ביצירת תגובה', 'error')
    }
    setLoading(false)
  }

  async function handleSave() {
    if (onResponseGenerated) onResponseGenerated(response)
    showToast('התגובה נשמרה בהצלחה', 'success')
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(response).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)',
      zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem',
    }} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={{
        background: 'var(--navy)', borderRadius: 'var(--radius)', padding: '2rem',
        border: '1px solid var(--border-dark)',
        maxWidth: '600px', width: '100%', maxHeight: '90vh', overflowY: 'auto',
        animation: 'fadeIn 0.2s ease',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700 }}>יצירת תגובה</h2>
          <button onClick={onClose} style={{
            background: 'none', fontSize: '1.5rem', color: 'var(--text-muted)', padding: '0.25rem',
          }}>✕</button>
        </div>

        <div style={{
          background: 'var(--dark)', padding: '1rem', borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border-dark)', marginBottom: '1rem',
        }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>ביקורת הלקוח:</div>
          <p style={{ lineHeight: 1.7, color: 'var(--text-light)' }}>{review.reviewText}</p>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block', color: 'var(--text-light)' }}>טון התגובה</label>
          <ToneSelector value={tone} onChange={setTone} />
        </div>

        <button onClick={handleGenerate} disabled={loading} style={{
          width: '100%', background: loading ? 'var(--charcoal)' : 'var(--cyan)',
          color: loading ? 'var(--text-muted)' : 'var(--navy)',
          padding: '0.8rem', borderRadius: 'var(--radius-pill)',
          fontSize: '1rem', fontWeight: 800, marginBottom: '1rem',
          boxShadow: loading ? 'none' : 'var(--shadow-cyan)',
        }}>
          {loading ? 'יוצר תגובה...' : 'צור תגובה'}
        </button>

        {response && (
          <div style={{
            background: 'rgba(19, 239, 245, 0.05)', border: '1px solid rgba(19, 239, 245, 0.2)',
            borderRadius: 'var(--radius)', padding: '1rem', animation: 'fadeIn 0.3s ease',
          }}>
            <p style={{ lineHeight: 1.8, marginBottom: '1rem', color: 'var(--text-light)' }}>{response}</p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button onClick={handleSave} style={{
                flex: 1, background: 'var(--success)', color: 'white', padding: '0.6rem',
                borderRadius: 'var(--radius-pill)', fontWeight: 700, fontSize: '0.9rem',
              }}>שמור</button>
              <button onClick={handleCopy} style={{
                flex: 1, background: 'var(--charcoal)', color: 'var(--text-white)', padding: '0.6rem',
                borderRadius: 'var(--radius-pill)', fontWeight: 600, fontSize: '0.9rem',
              }}>{copied ? 'הועתק! ✓' : 'העתק'}</button>
              <button onClick={handleGenerate} disabled={loading} style={{
                flex: 1, background: 'transparent', color: 'var(--cyan)', padding: '0.6rem',
                borderRadius: 'var(--radius-pill)', fontWeight: 600, fontSize: '0.9rem',
                border: '1px solid var(--cyan)',
              }}>נסה שוב</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
