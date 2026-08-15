// NOTE: this calls Gemini directly from the browser, so the API key is
// technically visible in the shipped code. Fine for a demo/portfolio project;
// for a real production app, move this call behind a backend/edge function
// so the key stays server-side only.

const PROMPT = `You are analyzing a photo submitted to a river-cleanup reporting app.
Look at the image and respond with ONLY a JSON object (no markdown) in this exact shape:
{
  "items": ["short item name", "..."],
  "estimatedKg": number,
  "severity": "Low" | "Medium" | "High",
  "recommendedVolunteers": number,
  "recommendedEquipment": ["short item name", "..."]
}
Base the estimate only on what's visible in the image. If the spot looks clean, return
an empty items array, estimatedKg 0, and severity "Low".`;

export async function analyzeWastePhoto(base64Image) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('AI analysis is not configured (missing VITE_GEMINI_API_KEY).');
  }

  // Strip the "data:image/jpeg;base64," prefix if present - Gemini wants raw base64.
  const rawBase64 = base64Image.includes(',') ? base64Image.split(',')[1] : base64Image;

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: PROMPT },
              { inline_data: { mime_type: 'image/jpeg', data: rawBase64 } },
            ],
          },
        ],
        generationConfig: { responseMimeType: 'application/json' },
      }),
    }
  );

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`AI analysis failed (${res.status}): ${errText.slice(0, 200)}`);
  }

  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('AI analysis returned no result.');

  return JSON.parse(text);
}