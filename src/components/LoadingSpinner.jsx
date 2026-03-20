export default function LoadingSpinner({ size = 40, text = 'טוען...' }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: '3rem', gap: '1rem',
    }}>
      <div style={{
        width: size, height: size, border: '3px solid var(--border)',
        borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 0.8s linear infinite',
      }} />
      {text && <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{text}</p>}
    </div>
  )
}
