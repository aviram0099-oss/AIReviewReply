const TONES = [
  { id: 'friendly', label: 'ידידותי', icon: '😊', desc: 'חם ונגיש, אימוג׳י מותר' },
  { id: 'professional', label: 'מקצועי', icon: '💼', desc: 'רשמי ומכובד' },
  { id: 'apologetic', label: 'התנצלותי', icon: '🙏', desc: 'אמפתי, הצעת פתרון' },
]

export default function ToneSelector({ value, onChange }) {
  return (
    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
      {TONES.map((tone) => {
        const selected = value === tone.id
        return (
          <button
            key={tone.id}
            onClick={() => onChange(tone.id)}
            style={{
              flex: '1 1 140px',
              padding: '1rem',
              borderRadius: 'var(--radius)',
              border: `2px solid ${selected ? 'var(--primary)' : 'var(--border)'}`,
              background: selected ? 'rgba(77, 150, 255, 0.08)' : 'white',
              cursor: 'pointer',
              transition: 'var(--transition)',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '1.5rem', marginBottom: '0.3rem' }}>{tone.icon}</div>
            <div style={{ fontWeight: 600, fontSize: '0.95rem', color: selected ? 'var(--primary)' : 'var(--text)' }}>
              {tone.label}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
              {tone.desc}
            </div>
          </button>
        )
      })}
    </div>
  )
}
