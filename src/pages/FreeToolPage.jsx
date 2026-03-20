import { useState } from 'react'
import ToneSelector from '../components/ToneSelector'
import { generateResponse } from '../api/generate'

const FREE_LIMIT = 3
const STORAGE_KEY = 'aireviewreply_free_usage'

function getFreeTierUsage() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    const currentMonth = new Date().toISOString().slice(0, 7)
    if (data.month !== currentMonth) return { month: currentMonth, count: 0 }
    return data
  } catch {
    return { month: new Date().toISOString().slice(0, 7), count: 0 }
  }
}

function incrementFreeTierUsage() {
  const usage = getFreeTierUsage()
  usage.count += 1
  localStorage.setItem(STORAGE_KEY, JSON.stringify(usage))
  return usage
}

export default function FreeToolPage() {
  const [reviewText, setReviewText] = useState('')
  const [tone, setTone] = useState('professional')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const usage = getFreeTierUsage()
  const remaining = FREE_LIMIT - usage.count

  async function handleGenerate() {
    if (!reviewText.trim()) {
      setError('נא להזין את טקסט הביקורת')
      return
    }

    if (remaining <= 0) {
      setError('ניצלת את כל השימושים החינמיים החודשיים. הירשם לחשבון לשימוש נוסף!')
      return
    }

    setLoading(true)
    setError('')
    setResponse('')

    try {
      const result = await generateResponse({ reviewText, tone, gender: 'male' })
      setResponse(result)
      incrementFreeTierUsage()
    } catch (err) {
      setError(err.message || 'שגיאה ביצירת תגובה')
    }
    setLoading(false)
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(response)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback
      const ta = document.createElement('textarea')
      ta.value = response
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '2rem 1rem' }} className="fade-in">
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          כלי חינמי - מענה AI לביקורות
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          הדביקו ביקורת מגוגל, בחרו טון, וקבלו תגובה מקצועית בעברית תוך שניות
        </p>
        <p style={{ color: 'var(--text-light)', fontSize: '0.85rem', marginTop: '0.5rem' }}>
          {remaining > 0 ? `נותרו ${remaining} שימושים חינמיים החודש` : 'ניצלת את כל השימושים החודשיים'}
        </p>
      </div>

      <div style={{
        background: 'white', borderRadius: 'var(--radius)', padding: '2rem',
        boxShadow: 'var(--shadow)', display: 'flex', flexDirection: 'column', gap: '1.5rem',
      }}>
        <div>
          <label style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.5rem', display: 'block' }}>
            טקסט הביקורת
          </label>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="הדביקו כאן את הביקורת מגוגל..."
            rows={4}
            style={{
              width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border)', fontSize: '1rem', resize: 'vertical',
              lineHeight: 1.6, outline: 'none', transition: 'var(--transition)',
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
            onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
          />
        </div>

        <div>
          <label style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.5rem', display: 'block' }}>
            טון התגובה
          </label>
          <ToneSelector value={tone} onChange={setTone} />
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading || remaining <= 0}
          style={{
            background: loading ? 'var(--text-light)' : 'linear-gradient(135deg, var(--primary), var(--secondary))',
            color: 'white', padding: '0.9rem', borderRadius: 'var(--radius-sm)',
            fontSize: '1.05rem', fontWeight: 700, transition: 'var(--transition)',
            opacity: loading || remaining <= 0 ? 0.7 : 1,
          }}
        >
          {loading ? 'יוצר תגובה...' : 'צור תגובה עם AI ✨'}
        </button>

        {error && (
          <div style={{
            background: '#FEF2F2', border: '1px solid var(--error)', color: '#991B1B',
            padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', fontSize: '0.9rem',
          }}>
            {error}
          </div>
        )}

        {response && (
          <div style={{
            background: '#F0FDF4', border: '1px solid var(--success)', borderRadius: 'var(--radius)',
            padding: '1.25rem', animation: 'fadeIn 0.3s ease',
          }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              marginBottom: '0.75rem',
            }}>
              <span style={{ fontWeight: 600, color: '#065F46' }}>התגובה שנוצרה:</span>
              <button
                onClick={handleCopy}
                style={{
                  background: copied ? 'var(--success)' : 'white', color: copied ? 'white' : 'var(--text)',
                  padding: '0.4rem 1rem', borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border)', fontSize: '0.85rem', fontWeight: 500,
                  transition: 'var(--transition)',
                }}
              >
                {copied ? 'הועתק! ✓' : 'העתק'}
              </button>
            </div>
            <p style={{ color: '#1E293B', lineHeight: 1.8, fontSize: '1rem' }}>{response}</p>
          </div>
        )}
      </div>

      {remaining <= 0 && (
        <div style={{
          textAlign: 'center', marginTop: '1.5rem', padding: '1.5rem',
          background: 'linear-gradient(135deg, rgba(77,150,255,0.08), rgba(124,58,237,0.08))',
          borderRadius: 'var(--radius)',
        }}>
          <p style={{ fontWeight: 600, marginBottom: '0.5rem' }}>רוצים עוד תגובות?</p>
          <a href="/auth" style={{
            display: 'inline-block', background: 'var(--primary)', color: 'white',
            padding: '0.6rem 1.5rem', borderRadius: 'var(--radius-sm)', fontWeight: 600,
          }}>
            הירשמו עכשיו - חינם!
          </a>
        </div>
      )}
    </div>
  )
}
