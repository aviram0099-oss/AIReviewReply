const COLORS = {
  success: { bg: 'rgba(16, 185, 129, 0.15)', border: '#10B981', text: '#6EE7B7' },
  error: { bg: 'rgba(239, 68, 68, 0.15)', border: '#EF4444', text: '#FCA5A5' },
  info: { bg: 'rgba(19, 239, 245, 0.15)', border: '#13eff5', text: '#13eff5' },
}

export default function Toast({ message, type = 'info' }) {
  const c = COLORS[type] || COLORS.info
  return (
    <div style={{
      position: 'fixed',
      bottom: '2rem',
      left: '50%',
      transform: 'translateX(-50%)',
      background: c.bg,
      backdropFilter: 'blur(20px)',
      border: `1px solid ${c.border}`,
      color: c.text,
      padding: '0.75rem 1.5rem',
      borderRadius: 'var(--radius-pill)',
      boxShadow: 'var(--shadow-lg)',
      zIndex: 9999,
      fontSize: '0.95rem',
      fontWeight: 500,
      animation: 'fadeIn 0.3s ease',
    }}>
      {message}
    </div>
  )
}
