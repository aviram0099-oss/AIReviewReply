export default function ReviewCard({ review, onGenerateResponse, onDelete }) {
  const rating = review.rating || 0
  const date = review.createdAt ? new Date(review.createdAt).toLocaleDateString('he-IL') : ''

  return (
    <div style={{
      background: 'var(--navy)',
      borderRadius: 'var(--radius)',
      border: '1px solid var(--border-dark)',
      padding: '1.25rem',
      transition: 'var(--transition)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
        <div>
          <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{review.reviewerName || 'לקוח אנונימי'}</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            {date}
            {rating > 0 && (
              <span style={{ display: 'inline-flex', gap: '2px', marginRight: '0.3rem' }}>
                {[1,2,3,4,5].map(s => (
                  <span key={s} style={{
                    width: '10px', height: '10px', borderRadius: '2px',
                    background: s <= rating ? 'var(--cyan)' : 'var(--charcoal)',
                    display: 'inline-block',
                  }} />
                ))}
              </span>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {!review.response && onGenerateResponse && (
            <button onClick={() => onGenerateResponse(review)} style={{
              background: 'var(--cyan)',
              color: 'var(--navy)',
              padding: '0.35rem 0.8rem',
              borderRadius: 'var(--radius-pill)',
              fontSize: '0.8rem',
              fontWeight: 700,
            }}>
              צור תגובה
            </button>
          )}
          {onDelete && (
            <button onClick={() => onDelete(review.id)} style={{
              background: 'transparent',
              color: 'var(--error)',
              padding: '0.35rem 0.5rem',
              borderRadius: 'var(--radius-pill)',
              fontSize: '0.8rem',
              border: '1px solid rgba(239, 68, 68, 0.3)',
            }}>
              מחק
            </button>
          )}
        </div>
      </div>

      <p style={{ color: 'var(--text-light)', lineHeight: 1.7, fontSize: '0.95rem', marginBottom: review.response ? '0.75rem' : 0 }}>
        {review.reviewText}
      </p>

      {review.response && (
        <div style={{
          background: 'rgba(19, 239, 245, 0.05)',
          border: '1px solid rgba(19, 239, 245, 0.15)',
          borderRadius: 'var(--radius-sm)',
          padding: '0.75rem 1rem',
          marginTop: '0.5rem',
        }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--cyan)', marginBottom: '0.3rem' }}>
            התגובה שלכם:
          </div>
          <p style={{ color: 'var(--text-light)', lineHeight: 1.7, fontSize: '0.9rem' }}>{review.response}</p>
        </div>
      )}
    </div>
  )
}
