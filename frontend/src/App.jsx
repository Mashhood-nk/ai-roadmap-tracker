import { useState, useEffect, useCallback } from 'react'
import { PHASES, getTotalTasks } from './data.js'
import { fetchProgress, saveTask, getUserId } from './api.js'
import PinGate from './PinGate.jsx'

const WORKER_URL = import.meta.env.VITE_WORKER_URL || ''

export default function App() {
  const [unlocked, setUnlocked] = useState(() => !!localStorage.getItem('roadmap_pin'))
  const [checked, setChecked] = useState({})
  const [activePhase, setActivePhase] = useState('p0')
  const [expandedSections, setExpandedSections] = useState({})
  const [syncStatus, setSyncStatus] = useState('idle') // idle | saving | saved | error
  const [loadError, setLoadError] = useState(false)

  // Load progress from worker on mount
  useEffect(() => {
    if (!unlocked || !WORKER_URL) return
    fetchProgress()
      .then(data => setChecked(data.checked || {}))
      .catch(() => setLoadError(true))
  }, [unlocked])

  const toggle = useCallback(async (taskId) => {
    const newVal = !checked[taskId]
    // Optimistic update
    setChecked(prev => ({ ...prev, [taskId]: newVal }))
    setSyncStatus('saving')
    try {
      await saveTask(taskId, newVal)
      setSyncStatus('saved')
      setTimeout(() => setSyncStatus('idle'), 2000)
    } catch {
      // Roll back
      setChecked(prev => ({ ...prev, [taskId]: !newVal }))
      setSyncStatus('error')
      setTimeout(() => setSyncStatus('idle'), 3000)
    }
  }, [checked])

  const toggleSection = (id) =>
    setExpandedSections(prev => ({ ...prev, [id]: prev[id] === false ? true : false }))

  const phaseProgress = (phase) => {
    const all = phase.sections.flatMap(s => s.tasks)
    const done = all.filter(t => checked[t.id]).length
    return { done, total: all.length, pct: all.length ? Math.round((done / all.length) * 100) : 0 }
  }

  const totalTasks = getTotalTasks()
  const totalDone = Object.values(checked).filter(Boolean).length
  const totalPct = Math.round((totalDone / totalTasks) * 100)
  const currentPhase = PHASES.find(p => p.id === activePhase)

  if (!unlocked) return <PinGate onUnlock={() => setUnlocked(true)} />

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: '#F8FAFC', minHeight: '100vh', color: '#1A1A2E' }}>

      {/* ── Header ── */}
      <div style={{ background: 'linear-gradient(135deg, #0D7377 0%, #1A6B5A 100%)', color: 'white', padding: '20px 20px 16px', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
            <div>
              <div style={{ fontSize: 10, letterSpacing: '0.18em', opacity: 0.7, marginBottom: 2 }}>MASHHOOD NK</div>
              <div style={{ fontSize: 18, fontWeight: 700 }}>AI Career Roadmap</div>
              <div style={{ fontSize: 12, opacity: 0.8 }}>0–6 Month · 1–2 hrs/day</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 30, fontWeight: 800, lineHeight: 1 }}>{totalPct}%</div>
              <div style={{ fontSize: 11, opacity: 0.75 }}>{totalDone} / {totalTasks} done</div>
              <div style={{ fontSize: 10, opacity: 0.6, marginTop: 2 }}>
                {syncStatus === 'saving' && '⏳ saving…'}
                {syncStatus === 'saved' && '✓ synced'}
                {syncStatus === 'error' && '⚠ sync failed'}
              </div>
            </div>
          </div>
          {/* Global bar */}
          <div style={{ marginTop: 12, background: 'rgba(255,255,255,0.22)', borderRadius: 99, height: 7, overflow: 'hidden' }}>
            <div style={{ width: `${totalPct}%`, background: 'white', height: '100%', borderRadius: 99, transition: 'width 0.5s ease' }} />
          </div>
        </div>
      </div>

      {/* ── Phase tabs ── */}
      <div style={{ background: 'white', borderBottom: '1px solid #E5E7EB', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', display: 'flex', padding: '0 12px', minWidth: 'max-content' }}>
          {PHASES.map(phase => {
            const { done, total, pct } = phaseProgress(phase)
            const active = activePhase === phase.id
            return (
              <button key={phase.id} onClick={() => setActivePhase(phase.id)} style={{
                border: 'none', background: 'none', cursor: 'pointer',
                padding: '10px 14px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
                borderBottom: active ? `3px solid ${phase.color}` : '3px solid transparent',
                color: active ? phase.color : '#6B7280',
                fontWeight: active ? 700 : 500, fontSize: 11, whiteSpace: 'nowrap',
                transition: 'all 0.15s', minWidth: 70
              }}>
                <span style={{ fontSize: 18 }}>{phase.icon}</span>
                <span>{phase.label}</span>
                <span style={{ fontSize: 10, opacity: 0.8 }}>{pct}%</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Content ── */}
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '16px 12px 80px' }}>

        {loadError && (
          <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 10, padding: '12px 16px', marginBottom: 16, fontSize: 13, color: '#991B1B' }}>
            ⚠️ Could not load saved progress from server. Check your Worker URL in .env and try refreshing.
          </div>
        )}

        {currentPhase && (
          <>
            {/* Phase hero */}
            <div style={{
              background: `linear-gradient(135deg, ${currentPhase.color} 0%, ${currentPhase.color}CC 100%)`,
              borderRadius: 14, padding: '16px 20px', marginBottom: 16, color: 'white'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                <div>
                  <div style={{ fontSize: 17, fontWeight: 700 }}>{currentPhase.icon} {currentPhase.title}</div>
                  <div style={{ fontSize: 12, opacity: 0.85 }}>{currentPhase.weeks}</div>
                </div>
                {(() => {
                  const { done, total, pct } = phaseProgress(currentPhase)
                  return (
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 26, fontWeight: 800 }}>{pct}%</div>
                      <div style={{ fontSize: 11, opacity: 0.8 }}>{done}/{total} tasks</div>
                    </div>
                  )
                })()}
              </div>
              <div style={{ marginTop: 10, background: 'rgba(255,255,255,0.25)', borderRadius: 99, height: 5 }}>
                <div style={{ width: `${phaseProgress(currentPhase).pct}%`, background: 'white', height: '100%', borderRadius: 99, transition: 'width 0.4s ease' }} />
              </div>
            </div>

            {/* Sections */}
            {currentPhase.sections.map(section => {
              const sectionDone = section.tasks.filter(t => checked[t.id]).length
              const sectionTotal = section.tasks.length
              const allDone = sectionDone === sectionTotal
              // Default expanded — only false if explicitly collapsed
              const isExpanded = expandedSections[section.id] !== false

              return (
                <div key={section.id} style={{
                  background: section.isDeliverables ? currentPhase.lightColor : 'white',
                  border: `1px solid ${section.isDeliverables ? currentPhase.color + '35' : '#E5E7EB'}`,
                  borderRadius: 12, marginBottom: 10, overflow: 'hidden',
                  boxShadow: section.isDeliverables ? `0 0 0 2px ${currentPhase.color}18` : '0 1px 3px rgba(0,0,0,0.05)'
                }}>
                  {/* Section header — tap to collapse */}
                  <button onClick={() => toggleSection(section.id)} style={{
                    width: '100%', border: 'none', cursor: 'pointer',
                    background: section.isDeliverables ? `${currentPhase.color}12` : '#FAFAFA',
                    padding: '11px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    textAlign: 'left', borderBottom: isExpanded ? '1px solid #F3F4F6' : 'none'
                  }}>
                    <span style={{ fontWeight: 600, fontSize: 13, color: section.isDeliverables ? currentPhase.color : '#1A1A2E', flex: 1, paddingRight: 12 }}>
                      {section.title}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                      {allDone && <span style={{ fontSize: 14 }}>🎉</span>}
                      <span style={{ fontSize: 12, color: allDone ? '#16A34A' : '#6B7280', fontWeight: 600 }}>
                        {sectionDone}/{sectionTotal}
                      </span>
                      <span style={{
                        fontSize: 14, color: '#9CA3AF', display: 'inline-block',
                        transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s'
                      }}>▾</span>
                    </div>
                  </button>

                  {isExpanded && section.tasks.map((task, i) => {
                    const done = !!checked[task.id]
                    return (
                      <div key={task.id} onClick={() => toggle(task.id)} style={{
                        display: 'flex', alignItems: 'flex-start', gap: 12, padding: '11px 14px',
                        cursor: 'pointer',
                        background: done ? `${currentPhase.color}07` : 'transparent',
                        borderBottom: i < section.tasks.length - 1 ? '1px solid #F3F4F6' : 'none',
                        transition: 'background 0.15s',
                        WebkitTapHighlightColor: 'transparent'
                      }}>
                        {/* Checkbox */}
                        <div style={{
                          width: 22, height: 22, borderRadius: 6, flexShrink: 0, marginTop: 1,
                          border: `2px solid ${done ? currentPhase.color : '#D1D5DB'}`,
                          background: done ? currentPhase.color : 'white',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          transition: 'all 0.15s', boxShadow: done ? `0 2px 6px ${currentPhase.color}40` : 'none'
                        }}>
                          {done && <span style={{ color: 'white', fontSize: 13, lineHeight: 1, fontWeight: 700 }}>✓</span>}
                        </div>
                        {/* Text */}
                        <div style={{ flex: 1 }}>
                          <div style={{
                            fontSize: 14, lineHeight: 1.45,
                            color: done ? '#9CA3AF' : '#1A1A2E',
                            textDecoration: done ? 'line-through' : 'none',
                            fontWeight: section.isDeliverables ? 600 : 400,
                            transition: 'color 0.15s'
                          }}>{task.text}</div>
                          {task.note && (
                            <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 3 }}>
                              💡 {task.note}
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </>
        )}
      </div>

      {/* ── Footer bar ── */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        background: 'white', borderTop: '1px solid #E5E7EB',
        padding: '8px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <span style={{ fontSize: 11, color: '#9CA3AF' }}>Tap any task to tick · Syncs to cloud</span>
        <button onClick={() => {
          localStorage.removeItem('roadmap_pin')
          setUnlocked(false)
        }} style={{ fontSize: 11, color: '#9CA3AF', background: 'none', border: 'none', cursor: 'pointer' }}>
          Lock 🔒
        </button>
      </div>
    </div>
  )
}
