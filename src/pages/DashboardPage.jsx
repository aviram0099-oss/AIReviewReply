import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { useAuth } from '../context/AuthContext'
import ReviewCard from '../components/ReviewCard'
import ResponseGenerator from '../components/ResponseGenerator'
import LoadingSpinner from '../components/LoadingSpinner'

export default function DashboardPage() {
  const { user } = useAuth()
  const { profile, loadingProfile, reviews, addReview, updateReview, deleteReview, getUsageInfo, showToast } = useApp()
  const [showAddForm, setShowAddForm] = useState(false)
  const [reviewerName, setReviewerName] = useState('')
  const [reviewText, setReviewText] = useState('')
  const [rating, setRating] = useState(5)
  const [filter, setFilter] = useState('all') // all, with-response, without-response
  const [generatingFor, setGeneratingFor] = useState(null)
  const [adding, setAdding] = useState(false)

  if (loadingProfile) return <LoadingSpinner />

  const usage = getUsageInfo()
  const filteredReviews = reviews.filter((r) => {
    if (filter === 'with-response') return r.response
    if (filter === 'without-response') return !r.response
    return true
  })

  const stats = {
    total: reviews.length,
    withResponse: reviews.filter((r) => r.response).length,
    withoutResponse: reviews.filter((r) => !r.response).length,
  }

  async function handleAddReview(e) {
    e.preventDefault()
    if (!reviewText.trim()) {
      showToast('נא להזין את טקסט הביקורת', 'error')
      return
    }
    setAdding(true)
    await addReview({ reviewerName: reviewerName.trim() || 'לקוח אנונימי', reviewText: reviewText.trim(), rating, response: '' })
    setReviewerName('')
    setReviewText('')
    setRating(5)
    setShowAddForm(false)
    showToast('הביקורת נוספה בהצלחה', 'success')
    setAdding(false)
  }

  async function handleResponseGenerated(response) {
    if (generatingFor) {
      await updateReview(generatingFor.id, { response })
      setGeneratingFor(null)
    }
  }

  const inputStyle = {
    width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)',
    border: '1px solid var(--border)', fontSize: '1rem', outline: 'none',
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1rem' }} className="fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>לוח בקרה</h1>
        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          שלום, {user?.displayName || 'משתמש'}
        </div>
      </div>

      {/* Stats */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '1rem', marginBottom: '1.5rem',
      }}>
        {[
          { label: 'סה"כ ביקורות', value: stats.total, color: 'var(--primary)' },
          { label: 'עם תגובה', value: stats.withResponse, color: 'var(--success)' },
          { label: 'ממתינות', value: stats.withoutResponse, color: 'var(--accent)' },
          { label: 'תגובות החודש', value: `${usage.used}/${usage.limit}`, color: 'var(--secondary)' },
        ].map((s, i) => (
          <div key={i} style={{
            background: 'white', padding: '1.25rem', borderRadius: 'var(--radius)',
            border: '1px solid var(--border)', textAlign: 'center',
          }}>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Usage warning */}
      {usage.used >= usage.limit && (
        <div style={{
          background: '#FEF2F2', border: '1px solid var(--error)', borderRadius: 'var(--radius-sm)',
          padding: '1rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem',
        }}>
          <span style={{ color: '#991B1B', fontWeight: 500 }}>הגעת למגבלת התגובות החודשית</span>
          <Link to="/pricing" style={{
            background: 'var(--primary)', color: 'white', padding: '0.4rem 1rem',
            borderRadius: 'var(--radius-sm)', fontWeight: 600, fontSize: '0.85rem',
          }}>
            שדרגו עכשיו
          </Link>
        </div>
      )}

      {/* Actions bar */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem',
      }}>
        <button onClick={() => setShowAddForm(!showAddForm)} style={{
          background: showAddForm ? 'var(--text-light)' : 'var(--primary)', color: 'white',
          padding: '0.6rem 1.2rem', borderRadius: 'var(--radius-sm)', fontWeight: 600, fontSize: '0.9rem',
        }}>
          {showAddForm ? 'ביטול' : '+ הוסף ביקורת'}
        </button>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {[
            { id: 'all', label: 'הכל' },
            { id: 'without-response', label: 'ממתינות' },
            { id: 'with-response', label: 'עם תגובה' },
          ].map((f) => (
            <button key={f.id} onClick={() => setFilter(f.id)} style={{
              padding: '0.4rem 0.8rem', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem',
              background: filter === f.id ? 'var(--primary)' : 'white',
              color: filter === f.id ? 'white' : 'var(--text-secondary)',
              border: `1px solid ${filter === f.id ? 'var(--primary)' : 'var(--border)'}`,
              fontWeight: filter === f.id ? 600 : 400,
            }}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Add Review Form */}
      {showAddForm && (
        <form onSubmit={handleAddReview} style={{
          background: 'white', padding: '1.5rem', borderRadius: 'var(--radius)',
          border: '1px solid var(--border)', marginBottom: '1rem',
          display: 'flex', flexDirection: 'column', gap: '0.75rem',
          animation: 'fadeIn 0.2s ease',
        }}>
          <input value={reviewerName} onChange={(e) => setReviewerName(e.target.value)}
            placeholder="שם המבקר (אופציונלי)" style={inputStyle} />
          <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)}
            placeholder="טקסט הביקורת..." rows={3} style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <label style={{ fontWeight: 500, fontSize: '0.9rem' }}>דירוג:</label>
            {[1, 2, 3, 4, 5].map((s) => (
              <button key={s} type="button" onClick={() => setRating(s)} style={{
                background: 'none', fontSize: '1.3rem', padding: '0.2rem',
                opacity: s <= rating ? 1 : 0.3,
              }}>⭐</button>
            ))}
          </div>
          <button type="submit" disabled={adding} style={{
            background: 'var(--success)', color: 'white', padding: '0.7rem',
            borderRadius: 'var(--radius-sm)', fontWeight: 600, fontSize: '0.95rem',
            opacity: adding ? 0.7 : 1,
          }}>
            {adding ? 'מוסיף...' : 'הוסף ביקורת'}
          </button>
        </form>
      )}

      {/* Reviews list */}
      {filteredReviews.length === 0 ? (
        <div style={{
          textAlign: 'center', padding: '3rem', background: 'white',
          borderRadius: 'var(--radius)', border: '1px solid var(--border)',
        }}>
          <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📋</p>
          <p style={{ color: 'var(--text-secondary)' }}>
            {reviews.length === 0 ? 'עדיין אין ביקורות. הוסיפו את הביקורת הראשונה!' : 'אין ביקורות בקטגוריה זו'}
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {filteredReviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              onGenerateResponse={(r) => setGeneratingFor(r)}
              onDelete={deleteReview}
            />
          ))}
        </div>
      )}

      {/* Response Generator Modal */}
      {generatingFor && (
        <ResponseGenerator
          review={generatingFor}
          onResponseGenerated={handleResponseGenerated}
          onClose={() => setGeneratingFor(null)}
        />
      )}
    </div>
  )
}
