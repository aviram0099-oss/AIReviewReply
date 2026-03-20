export default function ReviewCard({ review, onGenerateResponse, onDelete }) {
  const stars = '⭐'.repeat(review.rating || 0)
  const date = review.createdAt ? new Date(review.createdAt).toLocaleDateString('he-IL') : ''

  return (
    <div style={{
      background: 'white', borderRadius: 'var(--radius)', border: '1px solid var(--border)',
      padding: '1.25rem', boxShadow: 'var(--shadow-sm)', transition: 'var(--transition)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
        <div>
          <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{review.reviewerName || 'לקוח אנונימי'}</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>{date} {stars && `| ${stars}`}</div>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {!review.response && onGenerateResponse && (
            <button onClick={() => onGenerateResponse(review)} style={{
              background: 'var(--primary)', color: 'white', padding: '0.35rem 0.8rem',
              borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', fontWeight: 600,
            }}>
              צור תגובה
            </button>
          )}
          {onDelete && (
            <button onClick={() => onDelete(review.id)} style={{
              background: 'none', color: 'var(--error)', padding: '0.35rem 0.5rem',
              borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', border: '1px solid var(--error)',
            }}>
              מחק
            </button>
          )}
        </div>
      </div>

      <p style={{ color: 'var(--text)', lineHeight: 1.6, fontSize: '0.95rem', marginBottom: review.response ? '0.75rem' : 0 }}>
        {review.reviewText}
      </p>

      {review.response && (
        <div style={{
          background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 'var(--radius-sm)',
          padding: '0.75rem 1rem', marginTop: '0.5rem',
        }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#065F46', marginBottom: '0.3rem' }}>
            התגובה שלכם:
          </div>
          <p style={{ color: '#1E293B', lineHeight: 1.6, fontSize: '0.9rem' }}>{review.response}</p>
        </div>
      )}
    </div>
  )
}
