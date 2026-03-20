const COLORS = {
  success: { bg: '#ECFDF5', border: '#10B981', text: '#065F46' },
  error: { bg: '#FEF2F2', border: '#EF4444', text: '#991B1B' },
  info: { bg: '#EFF6FF', border: '#4D96FF', text: '#1E40AF' },
}

export default function Toast({ message, type = 'info' }) {
  const c = COLORS[type] || COLORS.info
  return (
    <div style={{
      position: 'fixed', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
      background: c.bg, border: `1px solid ${c.border}`, color: c.text,
      padding: '0.75rem 1.5rem', borderRadius: 'var(--radius-sm)',
      boxShadow: 'var(--shadow-lg)', zIndex: 9999, fontSize: '0.95rem', fontWeight: 500,
      animation: 'fadeIn 0.3s ease',
    }}>
      {message}
    </div>
  )
}
