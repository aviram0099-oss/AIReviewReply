import { Component } from 'react'

export default class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          minHeight: '60vh', padding: '2rem', textAlign: 'center',
        }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text)' }}>משהו השתבש</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>אירעה שגיאה לא צפויה. נסו לרענן את הדף.</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: 'var(--primary)', color: 'white', border: 'none', padding: '0.75rem 2rem',
              borderRadius: 'var(--radius-sm)', fontSize: '1rem', fontWeight: 600,
            }}
          >
            רענון הדף
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
