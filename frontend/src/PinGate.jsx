import { useState } from 'react'
import { verifyPin } from './api.js'

export default function PinGate({ onUnlock }) {
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    if (!pin.trim()) return
    setLoading(true)
    setError('')
    try {
      const ok = await verifyPin(pin.trim())
      if (ok) {
        localStorage.setItem('roadmap_pin', pin.trim())
        onUnlock()
      } else {
        setError('Incorrect PIN. Try again.')
        setPin('')
      }
    } catch {
      setError('Could not reach server. Check your connection.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, #0D7377 0%, #1A6B5A 100%)',
      padding: 24
    }}>
      <div style={{
        background: 'white', borderRadius: 16, padding: '40px 32px',
        maxWidth: 360, width: '100%', boxShadow: '0 20px 60px rgba(0,0,0,0.2)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🎯</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: '#1A1A2E', marginBottom: 4 }}>
            Mashhood's Roadmap
          </div>
          <div style={{ fontSize: 14, color: '#6B7280' }}>AI Career Transition Tracker</div>
        </div>

        <form onSubmit={submit}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 8 }}>
            Enter PIN to continue
          </label>
          <input
            type="password"
            value={pin}
            onChange={e => setPin(e.target.value)}
            placeholder="••••••"
            autoFocus
            style={{
              width: '100%', padding: '12px 16px', fontSize: 20,
              border: `2px solid ${error ? '#EF4444' : '#E5E7EB'}`,
              borderRadius: 10, outline: 'none', letterSpacing: '0.3em',
              textAlign: 'center', marginBottom: 8,
              transition: 'border-color 0.2s'
            }}
            onFocus={e => { if (!error) e.target.style.borderColor = '#0D7377' }}
            onBlur={e => { if (!error) e.target.style.borderColor = '#E5E7EB' }}
          />
          {error && (
            <div style={{ fontSize: 13, color: '#EF4444', marginBottom: 12, textAlign: 'center' }}>
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading || !pin.trim()}
            style={{
              width: '100%', padding: '12px', fontSize: 15, fontWeight: 600,
              background: loading || !pin.trim() ? '#9CA3AF' : '#0D7377',
              color: 'white', border: 'none', borderRadius: 10, cursor: loading ? 'wait' : 'pointer',
              marginTop: 8, transition: 'background 0.2s'
            }}
          >
            {loading ? 'Checking…' : 'Unlock →'}
          </button>
        </form>
      </div>
    </div>
  )
}
