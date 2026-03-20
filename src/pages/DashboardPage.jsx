import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { useAuth } from '../context/AuthContext'
import ReviewCard from '../components/ReviewCard'
import ResponseGenerator from '../components/ResponseGenerator'
import LoadingSpinner from '../components/LoadingSpinner'

const inputStyle = {
  width: '100%',
  padding: '0.75rem 1rem',
  borderRadius: 'var(--radius-sm)',
  border: '1px solid var(--border-dark)',
  background: 'var(--navy-card)',
  color: 'var(--text-white)',
  fontSize: '1rem',
  outline: 'none',
  transition: 'var(--transition)',
}

export default function DashboardPage() {
  const { user } = useAuth()
  const { profile, loadingProfile, reviews, addReview, updateReview, deleteReview, getUsageInfo, showToast, syncGoogleReviews, publishReply } = useApp()
  const [showAddForm, setShowAddForm] = useState(false)
  const [reviewerName, setReviewerName] = useState('')
  const [reviewText, setReviewText] = useState('')
  const [rating, setRating] = useState(5)
  const [filter, setFilter] = useState('all')
  const [generatingFor, setGeneratingFor] = useState(null)
  const [adding, setAdding] = useState(false)
  const [syncing, setSyncing] = useState(false)
  const [publishingId, setPublishingId] = useState(null)

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

  async function handleSyncGoogle() {
    setSyncing(true)
    try {
      const newReviews = await syncGoogleReviews()
      if (newReviews.length === 0) {
        showToast('אין ביקורות חדשות לסנכרון', 'info')
      } else {
        showToast(`סונכרנו ${newReviews.length} ביקורות חדשות`, 'success')

        // Auto-generate AI responses for reviews without responses
        for (const review of newReviews) {
          if (!review.response) {
            try {
              const genRes = await fetch('/.netlify/functions/generate-response', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  reviewText: review.reviewText,
                  tone: profile?.preferences?.tone || 'professional',
                  gender: profile?.preferences?.gender || 'male',
                  businessProfile: profile?.businessProfile || {},
                }),
              })
              if (genRes.ok) {
                const data = await genRes.json()
                if (data.response) {
                  await updateReview(review.id, { response: data.response })
                }
              }
            } catch (err) {
              console.error('Auto-generate failed for review:', review.id, err)
            }
          }
        }
      }
    } catch (err) {
      showToast(err.message || 'שגיאה בסנכרון ביקורות מגוגל', 'error')
    }
    setSyncing(false)
  }

  async function handlePublishReply(review) {
    setPublishingId(review.id)
    try {
      await publishReply(review.id, review)
      showToast('התגובה פורסמה בגוגל בהצלחה!', 'success')
    } catch (err) {
      showToast(err.message || 'שגיאה בפרסום התגובה', 'error')
    }
    setPublishingId(null)
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2.5rem 1rem' }} className="fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 900 }}>לוח בקרה</h1>
        <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          שלום, {user?.displayName || 'משתמש'}
        </div>
      </div>

      {/* Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '1rem',
        marginBottom: '1.5rem',
      }}>
        {[
          { label: 'סה"כ ביקורות', value: stats.total, color: 'var(--cyan)' },
          { label: 'עם תגובה', value: stats.withResponse, color: 'var(--success)' },
          { label: 'ממתינות', value: stats.withoutResponse, color: 'var(--warning)' },
          { label: 'תגובות החודש', value: `${usage.used}/${usage.limit}`, color: '#a78bfa' },
        ].map((s, i) => (
          <div key={i} style={{
            background: 'var(--navy)',
            padding: '1.25rem',
            borderRadius: 'var(--radius)',
            border: '1px solid var(--border-dark)',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '1.8rem', fontWeight: 900, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Usage warning */}
      {usage.used >= usage.limit && (
        <div style={{
          background: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          borderRadius: 'var(--radius-sm)',
          padding: '1rem',
          marginBottom: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.5rem',
        }}>
          <span style={{ color: '#FCA5A5', fontWeight: 500 }}>הגעת למגבלת התגובות החודשית</span>
          <Link to="/pricing" style={{
            background: 'var(--cyan)',
            color: 'var(--navy)',
            padding: '0.4rem 1rem',
            borderRadius: 'var(--radius-pill)',
            fontWeight: 700,
            fontSize: '0.85rem',
          }}>
            שדרגו עכשיו
          </Link>
        </div>
      )}

      {/* Actions bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem',
        flexWrap: 'wrap',
        gap: '0.75rem',
      }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button onClick={() => setShowAddForm(!showAddForm)} style={{
            background: showAddForm ? 'var(--charcoal)' : 'var(--cyan)',
            color: showAddForm ? 'var(--text-white)' : 'var(--navy)',
            padding: '0.6rem 1.2rem',
            borderRadius: 'var(--radius-pill)',
            fontWeight: 700,
            fontSize: '0.9rem',
          }}>
            {showAddForm ? 'ביטול' : '+ הוסף ביקורת'}
          </button>
          {profile?.googleConnected && (
            <button onClick={handleSyncGoogle} disabled={syncing} style={{
              background: syncing ? 'var(--charcoal)' : 'transparent',
              color: syncing ? 'var(--text-muted)' : 'var(--cyan)',
              padding: '0.6rem 1.2rem',
              borderRadius: 'var(--radius-pill)',
              fontWeight: 700,
              fontSize: '0.9rem',
              border: '1px solid var(--cyan)',
            }}>
              {syncing ? 'מסנכרן...' : 'סנכרן ביקורות מגוגל'}
            </button>
          )}
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {[
            { id: 'all', label: 'הכל' },
            { id: 'without-response', label: 'ממתינות' },
            { id: 'with-response', label: 'עם תגובה' },
          ].map((f) => (
            <button key={f.id} onClick={() => setFilter(f.id)} style={{
              padding: '0.4rem 0.8rem',
              borderRadius: 'var(--radius-pill)',
              fontSize: '0.85rem',
              background: filter === f.id ? 'var(--cyan)' : 'transparent',
              color: filter === f.id ? 'var(--navy)' : 'var(--text-muted)',
              border: `1px solid ${filter === f.id ? 'var(--cyan)' : 'var(--border-dark)'}`,
              fontWeight: filter === f.id ? 700 : 400,
            }}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Add Review Form */}
      {showAddForm && (
        <form onSubmit={handleAddReview} style={{
          background: 'var(--navy)',
          padding: '1.5rem',
          borderRadius: 'var(--radius)',
          border: '1px solid var(--border-dark)',
          marginBottom: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          animation: 'fadeIn 0.2s ease',
        }}>
          <input value={reviewerName} onChange={(e) => setReviewerName(e.target.value)}
            placeholder="שם המבקר (אופציונלי)" style={inputStyle}
            onFocus={(e) => e.target.style.borderColor = 'var(--cyan)'}
            onBlur={(e) => e.target.style.borderColor = 'var(--border-dark)'}
          />
          <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)}
            placeholder="טקסט הביקורת..." rows={3}
            style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.7 }}
            onFocus={(e) => e.target.style.borderColor = 'var(--cyan)'}
            onBlur={(e) => e.target.style.borderColor = 'var(--border-dark)'}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <label style={{ fontWeight: 500, fontSize: '0.9rem', color: 'var(--text-light)' }}>דירוג:</label>
            {[1, 2, 3, 4, 5].map((s) => (
              <button key={s} type="button" onClick={() => setRating(s)} style={{
                background: 'none', fontSize: '1.3rem', padding: '0.2rem',
                opacity: s <= rating ? 1 : 0.3,
              }}>⭐</button>
            ))}
          </div>
          <button type="submit" disabled={adding} style={{
            background: adding ? 'var(--charcoal)' : 'var(--success)',
            color: 'white',
            padding: '0.7rem',
            borderRadius: 'var(--radius-pill)',
            fontWeight: 700,
            fontSize: '0.95rem',
          }}>
            {adding ? 'מוסיף...' : 'הוסף ביקורת'}
          </button>
        </form>
      )}

      {/* Reviews list */}
      {filteredReviews.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '4rem 2rem',
          background: 'var(--navy)',
          borderRadius: 'var(--radius)',
          border: '1px solid var(--border-dark)',
        }}>
          <p style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>📋</p>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
            {reviews.length === 0 ? 'עדיין אין ביקורות. הוסיפו את הביקורת הראשונה!' : 'אין ביקורות בקטגוריה זו'}
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {filteredReviews.map((review) => (
            <div key={review.id}>
              <ReviewCard
                review={review}
                onGenerateResponse={(r) => setGeneratingFor(r)}
                onDelete={deleteReview}
              />
              {/* Source badge and publish button overlay */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '-0.5rem',
                padding: '0 1.25rem 0.75rem',
                background: 'var(--navy)',
                borderRadius: '0 0 var(--radius) var(--radius)',
                border: '1px solid var(--border-dark)',
                borderTop: 'none',
                marginTop: '-1px',
              }}>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  padding: '0.2rem 0.6rem',
                  borderRadius: 'var(--radius-pill)',
                  background: review.source === 'google' ? 'rgba(66, 133, 244, 0.15)' : 'rgba(255, 255, 255, 0.08)',
                  color: review.source === 'google' ? '#60a5fa' : 'var(--text-muted)',
                  border: `1px solid ${review.source === 'google' ? 'rgba(66, 133, 244, 0.3)' : 'var(--border-dark)'}`,
                }}>
                  {review.source === 'google' ? 'גוגל' : 'ידני'}
                </span>
                {review.source === 'google' && review.response && !review.publishedToGoogle && (
                  <button
                    onClick={() => handlePublishReply(review)}
                    disabled={publishingId === review.id}
                    style={{
                      background: publishingId === review.id ? 'var(--charcoal)' : 'var(--success)',
                      color: 'white',
                      padding: '0.35rem 0.8rem',
                      borderRadius: 'var(--radius-pill)',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                    }}
                  >
                    {publishingId === review.id ? 'מפרסם...' : 'אשר ופרסם'}
                  </button>
                )}
                {review.source === 'google' && review.publishedToGoogle && (
                  <span style={{
                    fontSize: '0.75rem',
                    color: '#4ade80',
                    fontWeight: 600,
                  }}>
                    פורסם בגוגל ✓
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

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
