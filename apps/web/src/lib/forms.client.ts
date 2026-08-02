// Client-side handler for the site's lead-capture forms (contact, book-a-seat,
// enroll-course, student complaint). Posts directly to the Payload `enquiries`
// collection's public REST endpoint — no Astro server route needed since the
// site builds fully static.

const PAYLOAD_URL = import.meta.env.PUBLIC_PAYLOAD_URL || 'http://localhost:3000'

export function initEnquiryForm(form: HTMLFormElement, type: string) {
  const statusEl = form.querySelector<HTMLElement>('[data-form-status]')
  const submitBtn = form.querySelector<HTMLButtonElement>('button[type="submit"]')
  const originalLabel = submitBtn?.textContent || 'Submit'

  form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const formData = new FormData(form)

    // Honeypot: a hidden field real users never fill in. If it has a value, a
    // bot filled it — pretend success without hitting the API.
    if (formData.get('website')) {
      form.reset()
      if (statusEl) {
        statusEl.textContent = "Thanks! We'll get back to you shortly."
        statusEl.className = 'mt-3 text-sm text-green-600'
      }
      return
    }

    const payload: Record<string, string> = { type }
    for (const [key, value] of formData.entries()) {
      if (key !== 'website' && typeof value === 'string' && value.trim()) payload[key] = value.trim()
    }

    if (submitBtn) {
      submitBtn.disabled = true
      submitBtn.textContent = 'Sending...'
    }
    if (statusEl) statusEl.textContent = ''

    try {
      const res = await fetch(`${PAYLOAD_URL}/api/enquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Request failed')
      form.reset()
      if (statusEl) {
        statusEl.textContent = "Thanks! We'll get back to you shortly."
        statusEl.className = 'mt-3 text-sm text-green-600'
      }
    } catch {
      if (statusEl) {
        statusEl.textContent = 'Something went wrong. Please try again or contact us directly by phone or email.'
        statusEl.className = 'mt-3 text-sm text-red-600'
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false
        submitBtn.textContent = originalLabel
      }
    }
  })
}
