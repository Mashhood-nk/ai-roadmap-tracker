/**
 * AI Roadmap Tracker — Cloudflare Worker
 * Routes:
 *   GET  /api/progress?user_id=xxx   → { checked: { task_id: bool } }
 *   POST /api/progress               → { user_id, task_id, checked: 0|1 }
 *   GET  /api/verify-pin             → 200 OK or 401
 *
 * All routes require X-PIN header matching env.APP_PIN
 */

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, X-PIN',
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
  })
}

function checkPin(request, env) {
  const pin = request.headers.get('X-PIN') || ''
  return pin === env.APP_PIN
}

export default {
  async fetch(request, env) {
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS_HEADERS })
    }

    const url = new URL(request.url)
    const path = url.pathname

    // PIN check on all routes
    if (!checkPin(request, env)) {
      return json({ error: 'Unauthorised' }, 401)
    }

    // ── GET /api/verify-pin ──
    if (path === '/api/verify-pin' && request.method === 'GET') {
      return json({ ok: true })
    }

    // ── GET /api/progress ──
    if (path === '/api/progress' && request.method === 'GET') {
      const userId = url.searchParams.get('user_id')
      if (!userId) return json({ error: 'user_id required' }, 400)

      const rows = await env.DB.prepare(
        'SELECT task_id, checked FROM progress WHERE user_id = ?'
      ).bind(userId).all()

      const checkedMap = {}
      for (const row of rows.results) {
        checkedMap[row.task_id] = row.checked === 1
      }

      return json({ checked: checkedMap })
    }

    // ── POST /api/progress ──
    if (path === '/api/progress' && request.method === 'POST') {
      let body
      try {
        body = await request.json()
      } catch {
        return json({ error: 'Invalid JSON' }, 400)
      }

      const { user_id, task_id, checked } = body
      if (!user_id || !task_id || checked === undefined) {
        return json({ error: 'user_id, task_id, checked required' }, 400)
      }

      const now = new Date().toISOString()
      await env.DB.prepare(
        `INSERT INTO progress (user_id, task_id, checked, updated_at)
         VALUES (?, ?, ?, ?)
         ON CONFLICT(user_id, task_id) DO UPDATE SET checked = excluded.checked, updated_at = excluded.updated_at`
      ).bind(user_id, task_id, checked ? 1 : 0, now).run()

      return json({ ok: true })
    }

    return json({ error: 'Not found' }, 404)
  }
}
