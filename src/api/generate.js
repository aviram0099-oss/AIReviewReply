export async function generateResponse({ reviewText, tone, gender, businessProfile }) {
  const res = await fetch('/.netlify/functions/generate-response', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ reviewText, tone, gender, businessProfile }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || 'שגיאה ביצירת תגובה')
  }

  const data = await res.json()
  return data.response
}
