// api/analyzeFoodIntake.js

import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { userInput, clientDateTime } = req.body;
  console.log('Received from client:', { userInput, clientDateTime });

  if (!userInput || !clientDateTime) {
    return res.status(400).json({ error: 'User input and clientDateTime are required' });
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = `
You are a nutrition assistant. Using the user's local time: ${clientDateTime}, parse their text to identify all foods and amounts.

User's text: "${userInput}"

Return ONLY a valid JSON array where each object has:
- "id": unique identifier
- "food_name": string
- "quantity": number
- "unit": string ("pieces","g","cup","ml")
- "dateTime": string
- "confidence": number (0.0–1.0)
- "nutrition": { "calories": number, "protein": number, "carbs": number, "fats": number, "fiber": number }
- "notes": string or null
- "hydration_credit": number or null (for liquid foods)

Use per-100g values from your database for solids. For liquids (soups, broths, milk), also compute hydration_credit in ml.
If multiple foods are mentioned, list them all.
Example output:
[
  {
    "id":"idli_1_20251013_2338",
    "food_name":"idli",
    "quantity":2,
    "unit":"pieces",
    "dateTime":"${clientDateTime}",
    "confidence":0.92,
    "nutrition":{"calories":39,"protein":1.5,"carbs":8,"fats":0.2,"fiber":0.5},
    "notes":"Assumed standard idli size",
    "hydration_credit":null
  },
  {
    "id":"sambhar_1_20251013_2338",
    "food_name":"sambhar",
    "quantity":1,
    "unit":"cup",
    "dateTime":"08:30 AM",
    "confidence":0.88,
    "nutrition":{"calories":92,"protein":4,"carbs":12,"fats":2,"fiber":3},
    "notes":"1 cup standard serving",
    "hydration_credit":200
  }
]
`;

    const result = await model.generateContent(prompt);
    let text = await result.response.text();
    const textwithoutBackticks = text.replace(/``````/g, '').trim();
    const items = JSON.parse(textwithoutBackticks);

    // Post-process hydration_credit for liquid units
    items.forEach(item => {
      const liquidUnits = ['ml', 'cup'];
      if (liquidUnits.includes(item.unit)) {
        const factor = item.unit === 'cup' ? 240 : 1;
        item.hydration_credit = item.quantity * factor;
      } else {
        item.hydration_credit = null;
      }
    });

    return res.status(200).json(items);
  } catch (err) {
    console.error('Error in analyzeFoodIntake handler:', err);
    return res.status(500).json({ error: 'Failed to analyze food intake with AI' });
  }
}
