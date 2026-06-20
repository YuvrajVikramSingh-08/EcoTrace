import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_GEMINI_API_KEY || ''
);
export const flashModel = genAI.getGenerativeModel({
  model: 'gemini-2.0-flash',
});

let lastApiCallTime = 0;
const MIN_CALL_INTERVAL_MS = 2000;

async function throttledCall(fn) {
  const now = Date.now();
  const timeSinceLastCall = now - lastApiCallTime;
  if (timeSinceLastCall < MIN_CALL_INTERVAL_MS) {
    await new Promise((resolve) =>
      setTimeout(resolve, MIN_CALL_INTERVAL_MS - timeSinceLastCall)
    );
  }
  lastApiCallTime = Date.now();
  return fn();
}

/**
 * Parse a diary entry using Gemini.
 * @param {string} rawText
 * @param {object} userProfile
 * @returns {Promise<{ data: object[]|null, error: string|null }>}
 */
export async function parseDiaryEntry(rawText, userProfile) {
  const systemPrompt = `You are EcoTrace's carbon activity extractor. Your job is to read a person's
description of their day and extract every carbon-emitting or carbon-saving
activity.

Return ONLY a valid JSON array — no markdown, no backticks, no explanation.
Each object in the array must have exactly these fields:
  description (string): human-friendly description of the activity
  category (string): one of: transport, food, energy, shopping, waste
  quantity (number): the numeric amount
  unit (string): the unit, e.g. "km", "kg", "hours", "kWh", "items"
  emissionFactor (string): the key from carbonFactors to use, e.g. "CAR_PETROL"
  co2Kg (number): your best estimate of CO₂ in kg for this activity
  confidence (string): "high", "medium", or "low"

Rules:
- If the user mentions a distance driven, infer the vehicle type from context
  or their profile. Default to CAR_PETROL if unknown.
- For food, convert portions to approximate kg (a standard meal serving ≈ 0.15 kg
  of meat).
- Do not invent activities not mentioned. If no activities found, return [].
- All co2Kg values must be positive numbers.
- Use India-specific assumptions for portion sizes and typical usage.

User profile context: ${JSON.stringify(userProfile)}`;

  try {
    const result = await throttledCall(async () => {
      const chatSession = flashModel.startChat({
        history: [],
        generationConfig: {
          temperature: 0.3,
          topP: 0.8,
          maxOutputTokens: 2048,
        },
      });
      return chatSession.sendMessage(
        `${systemPrompt}\n\nUser's diary entry:\n"${rawText}"`
      );
    });

    const responseText = result.response.text();
    const cleaned = responseText
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();

    const activities = JSON.parse(cleaned);

    if (!Array.isArray(activities)) {
      return { data: [], error: 'Unexpected response format from AI.' };
    }

    const validated = activities.map((a) => ({
      description: a.description || 'Unknown activity',
      category: ['transport', 'food', 'energy', 'shopping', 'waste'].includes(
        a.category
      )
        ? a.category
        : 'energy',
      quantity: typeof a.quantity === 'number' ? a.quantity : 0,
      unit: a.unit || 'units',
      emissionFactor: a.emissionFactor || '',
      co2Kg:
        typeof a.co2Kg === 'number' && a.co2Kg > 0
          ? Math.round(a.co2Kg * 1000) / 1000
          : 0,
      confidence: ['high', 'medium', 'low'].includes(a.confidence)
        ? a.confidence
        : 'medium',
    }));

    return { data: validated, error: null };
  } catch (error) {
    return {
      data: [],
      error:
        error.message || 'Failed to analyse your diary entry. Please try again.',
    };
  }
}

/**
 * Chat with EcoCoach.
 * @param {string} userMessage
 * @param {Array} chatHistory
 * @param {object} userContext
 * @returns {Promise<{ data: string|null, error: string|null }>}
 */
export async function chatWithEcoCoach(
  userMessage,
  chatHistory,
  userContext
) {
  const systemPrompt = `You are EcoCoach, a friendly, expert personal carbon footprint advisor built
into EcoTrace. You know everything about carbon emissions, sustainability, and
practical green living — especially in the Indian context.

You have full access to this user's data:
${JSON.stringify(userContext)}

Your personality:
- Warm, encouraging, never preachy or guilt-inducing
- Specific: always give numbers, not vague advice
- Practical: suggest changes that are realistic for urban India
- Celebratory: acknowledge progress, no matter how small

You can help with:
- Explaining which activities have the biggest carbon impact
- "What if" scenario analysis ("if I go vegetarian for a month...")
- Personalized weekly plans
- Comparing the user's footprint to India/world averages
- Answering any sustainability question
- Motivating the user with their own progress data

Keep responses concise (3–5 sentences max) unless the user asks for a
detailed breakdown. Use simple language. Occasionally reference the user's
actual data from their profile above to make responses personal.

Important: Never make up emission numbers. Use the India-specific factors
provided in the user context.`;

  try {
    const result = await throttledCall(async () => {
      const history = [
        {
          role: 'user',
          parts: [{ text: systemPrompt }],
        },
        {
          role: 'model',
          parts: [
            {
              text: "I'm EcoCoach, ready to help you with your carbon footprint! How can I assist you today?",
            },
          ],
        },
        ...chatHistory.map((msg) => ({
          role: msg.role,
          parts: [{ text: msg.content }],
        })),
      ];

      const chat = flashModel.startChat({
        history,
        generationConfig: {
          temperature: 0.7,
          topP: 0.9,
          maxOutputTokens: 1024,
        },
      });

      return chat.sendMessage(userMessage);
    });

    return { data: result.response.text(), error: null };
  } catch (error) {
    return {
      data: null,
      error:
        error.message ||
        'EcoCoach is temporarily unavailable. Please try again.',
    };
  }
}

/**
 * Generate weekly report.
 * @param {object} weeklyData
 * @param {object} userProfile
 * @returns {Promise<{ data: object|null, error: string|null }>}
 */
export async function generateWeeklyReport(weeklyData, userProfile) {
  const prompt = `You are EcoTrace's weekly report generator. Analyse this user's carbon data
for the week and produce a structured assessment.

Weekly data: ${JSON.stringify(weeklyData)}
User profile: ${JSON.stringify(userProfile)}
India national daily average: 5.2 kg CO₂/person/day

Return ONLY a valid JSON object with these fields:
  grade: one of A+, A, B, C, D, F (based on comparison to India avg)
  aiSummary: a 2-3 sentence warm, encouraging narrative of the week
  topCategory: the category with highest CO₂ this week
  actions: array of exactly 3 objects, each with:
    title: short action title
    detail: one-sentence explanation
    estimatedSavingKg: estimated weekly CO₂ saving if adopted

Grade rubric (compare user's avg daily CO₂ to India avg of 5.2 kg/day):
  A+: ≤ 2.6 kg/day (50% below avg)
  A:  2.6–3.6 kg/day (30–50% below avg)
  B:  3.6–4.7 kg/day (10–30% below avg)
  C:  4.7–5.7 kg/day (within 10% of avg)
  D:  5.7–7.8 kg/day (10–50% above avg)
  F:  > 7.8 kg/day (50%+ above avg)`;

  try {
    const result = await throttledCall(async () => {
      const chatSession = flashModel.startChat({
        history: [],
        generationConfig: {
          temperature: 0.4,
          topP: 0.8,
          maxOutputTokens: 1024,
        },
      });
      return chatSession.sendMessage(prompt);
    });

    const responseText = result.response.text();
    const cleaned = responseText
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();

    const report = JSON.parse(cleaned);
    return { data: report, error: null };
  } catch (error) {
    return {
      data: null,
      error:
        error.message ||
        'Failed to generate weekly report. Please try again.',
    };
  }
}

/**
 * Estimate CO₂ saving for a custom habit.
 * @param {string} habitDescription
 * @returns {Promise<{ data: number, error: string|null }>}
 */
export async function estimateHabitSaving(habitDescription) {
  const prompt = `A user wants to track this green habit: "${habitDescription}"
Estimate the daily CO₂ saving in kg for an average urban Indian person
adopting this habit. Return ONLY a JSON object: { co2SavedPerDayKg: number }
Use conservative estimates. If the habit has no measurable carbon impact,
return 0.`;

  try {
    const result = await throttledCall(async () => {
      const chatSession = flashModel.startChat({
        history: [],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 256,
        },
      });
      return chatSession.sendMessage(prompt);
    });

    const responseText = result.response.text();
    const cleaned = responseText
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();

    const parsed = JSON.parse(cleaned);
    return {
      data:
        typeof parsed.co2SavedPerDayKg === 'number'
          ? parsed.co2SavedPerDayKg
          : 0,
      error: null,
    };
  } catch (error) {
    return { data: 0.1, error: error.message };
  }
}
