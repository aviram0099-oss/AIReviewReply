const TONE_INSTRUCTIONS = {
  friendly: 'כתוב בטון חם, ידידותי ונגיש. מותר להשתמש באימוג׳י אחד. הראה שאתה שמח לשמוע מהלקוח.',
  professional: 'כתוב בטון מקצועי ורשמי. ללא אימוג׳י. השתמש בשפה מכובדת ועניינית.',
  apologetic: 'כתוב בטון אמפתי והתנצלותי. הבע צער כנה, הצע פתרון קונקרטי או דרך ליצור קשר.',
}

export default async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('', {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
    })
  }

  if (req.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 })
  }

  try {
    const { reviewText, tone = 'professional', gender = 'male', businessProfile = {} } = await req.json()

    if (!reviewText || reviewText.trim().length < 5) {
      return Response.json({ error: 'נא להזין טקסט ביקורת' }, { status: 400 })
    }

    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      return Response.json({ error: 'OpenAI API key not configured' }, { status: 500 })
    }

    const genderInstruction = gender === 'female'
      ? 'כתוב בלשון נקבה (פנייה מנקודת מבט של אישה).'
      : 'כתוב בלשון זכר (פנייה מנקודת מבט של גבר).'

    const businessContext = businessProfile.name
      ? `שם העסק: ${businessProfile.name}. סוג העסק: ${businessProfile.type || 'לא צוין'}. תיאור: ${businessProfile.description || 'לא צוין'}.`
      : ''

    const systemPrompt = `אתה עוזר AI מומחה בכתיבת תגובות לביקורות גוגל בעברית עבור עסקים ישראליים.

כללים:
- כתוב תגובה בת 2-4 משפטים בעברית תקינה ומקצועית.
- ${TONE_INSTRUCTIONS[tone] || TONE_INSTRUCTIONS.professional}
- ${genderInstruction}
- ${businessContext}
- אל תמציא עובדות שלא הוזכרו בביקורת.
- התאם את התגובה לתוכן הביקורת (חיובית/שלילית/ניטרלית).
- החזר רק את טקסט התגובה, ללא הסברים נוספים.`

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `ביקורת הלקוח:\n"${reviewText.trim()}"` },
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    })

    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      console.error('OpenAI error:', err)
      return Response.json({ error: 'שגיאה בשירות ה-AI' }, { status: 502 })
    }

    const data = await res.json()
    const response = data.choices?.[0]?.message?.content?.trim()

    if (!response) {
      return Response.json({ error: 'לא התקבלה תגובה מה-AI' }, { status: 502 })
    }

    return Response.json({ response })
  } catch (err) {
    console.error('Generate error:', err)
    return Response.json({ error: 'שגיאה פנימית' }, { status: 500 })
  }
}

export const config = {
  path: '/.netlify/functions/generate-response',
}
