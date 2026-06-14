// Set this to your deployed Cloudflare Worker URL after deploying
// e.g. https://ai-roadmap-worker.YOUR-SUBDOMAIN.workers.dev
const WORKER_URL = import.meta.env.VITE_WORKER_URL || ''

function getPin() {
  return localStorage.getItem('roadmap_pin') || ''
}

function getUserId() {
  let uid = localStorage.getItem('roadmap_user_id')
  if (!uid) {
    uid = 'user_' + Math.random().toString(36).slice(2, 10)
    localStorage.setItem('roadmap_user_id', uid)
  }
  return uid
}

export { getUserId }

export async function fetchProgress() {
  const userId = getUserId()
  const res = await fetch(`${WORKER_URL}/api/progress?user_id=${encodeURIComponent(userId)}`, {
    headers: { 'X-PIN': getPin() }
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json() // { checked: { task_id: true, ... } }
}

export async function saveTask(taskId, checked) {
  const userId = getUserId()
  const res = await fetch(`${WORKER_URL}/api/progress`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-PIN': getPin()
    },
    body: JSON.stringify({ user_id: userId, task_id: taskId, checked: checked ? 1 : 0 })
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

export async function verifyPin(pin) {
  const res = await fetch(`${WORKER_URL}/api/verify-pin`, {
    headers: { 'X-PIN': pin }
  })
  return res.ok
}
