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

const inputStyle = {
  width: '100%',
  padding: '0.85rem 1rem',
  borderRadius: 'var(--radius-sm)',
  border: '1px solid var(--border-dark)',
  background: 'var(--navy-card)',
  color: 'var(--text-white)',
  fontSize: '1rem',
  resize: 'vertical',
  lineHeight: 1.7,
  outline: 'none',
  transition: 'var(--transition)',
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
    } catch {
      const ta = document.createElement('textarea')
      ta.value = response
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '3rem 1rem' }} className="fade-in">
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '0.5rem' }}>
          כלי חינמי - מענה <span style={{ color: 'var(--cyan)' }}>AI</span> לביקורות
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
          הדביקו ביקורת מגוגל, בחרו טון, וקבלו תגובה מקצועית בעברית תוך שניות
        </p>
        <p style={{
          color: remaining > 0 ? 'var(--text-muted)' : 'var(--error)',
          fontSize: '0.85rem',
          marginTop: '0.75rem',
        }}>
          {remaining > 0 ? `נותרו ${remaining} שימושים חינמיים החודש` : 'ניצלת את כל השימושים החודשיים'}
        </p>
      </div>

      <div style={{
        background: 'var(--navy)',
        borderRadius: 'var(--radius)',
        padding: '2rem',
        border: '1px solid var(--border-dark)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
      }}>
        <div>
          <label style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.5rem', display: 'block', color: 'var(--text-light)' }}>
            טקסט הביקורת
          </label>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="הדביקו כאן את הביקורת מגוגל..."
            rows={4}
            style={inputStyle}
            onFocus={(e) => e.target.style.borderColor = 'var(--cyan)'}
            onBlur={(e) => e.target.style.borderColor = 'var(--border-dark)'}
          />
        </div>

        <div>
          <label style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.5rem', display: 'block', color: 'var(--text-light)' }}>
            טון התגובה
          </label>
          <ToneSelector value={tone} onChange={setTone} />
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading || remaining <= 0}
          style={{
            background: loading || remaining <= 0 ? 'var(--charcoal)' : 'var(--cyan)',
            color: loading || remaining <= 0 ? 'var(--text-muted)' : 'var(--navy)',
            padding: '0.95rem',
            borderRadius: 'var(--radius-pill)',
            fontSize: '1.05rem',
            fontWeight: 800,
            boxShadow: loading || remaining <= 0 ? 'none' : 'var(--shadow-cyan)',
          }}
        >
          {loading ? 'יוצר תגובה...' : 'צור תגובה עם AI'}
        </button>

        {error && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#FCA5A5',
            padding: '0.75rem 1rem',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.9rem',
          }}>
            {error}
          </div>
        )}

        {response && (
          <div style={{
            background: 'rgba(19, 239, 245, 0.05)',
            border: '1px solid rgba(19, 239, 245, 0.2)',
            borderRadius: 'var(--radius)',
            padding: '1.5rem',
            animation: 'fadeIn 0.3s ease',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem',
            }}>
              <span style={{ fontWeight: 600, color: 'var(--cyan)' }}>התגובה שנוצרה:</span>
              <button
                onClick={handleCopy}
                style={{
                  background: copied ? 'var(--success)' : 'var(--charcoal)',
                  color: 'var(--text-white)',
                  padding: '0.4rem 1.2rem',
                  borderRadius: 'var(--radius-pill)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                }}
              >
                {copied ? 'הועתק! ✓' : 'העתק'}
              </button>
            </div>
            <p style={{ color: 'var(--text-light)', lineHeight: 1.9, fontSize: '1rem' }}>{response}</p>
          </div>
        )}
      </div>

      {remaining <= 0 && (
        <div style={{
          textAlign: 'center',
          marginTop: '2rem',
          padding: '2rem',
          background: 'var(--navy)',
          border: '1px solid var(--border-dark)',
          borderRadius: 'var(--radius)',
        }}>
          <p style={{ fontWeight: 600, marginBottom: '0.75rem', fontSize: '1.1rem' }}>רוצים עוד תגובות?</p>
          <a href="/auth" style={{
            display: 'inline-block',
            background: 'var(--cyan)',
            color: 'var(--navy)',
            padding: '0.7rem 2rem',
            borderRadius: 'var(--radius-pill)',
            fontWeight: 800,
          }}>
            הירשמו עכשיו - חינם!
          </a>
        </div>
      )}
    </div>
  )
}
