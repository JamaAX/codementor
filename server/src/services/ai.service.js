const axios = require("axios");
require("dotenv").config();

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_MODEL = process.env.GROQ_MODEL || "llama-3.1-70b-versatile";
console.log(
  GROQ_API_KEY ? "✅ GROQ API key loaded" : "⚠️ GROQ API key missing",
);

async function askModel({ question, code }) {
  if (!GROQ_API_KEY) {
    const fallback = `No GROQ_API_KEY set. Example guidance: ${question.slice(0, 120)}...`; // minimal placeholder when key missing
    return { answer: fallback, provider: "fallback" };
  }

  const prompt = `User question: ${question}\n\nCode snippet:\n${code || "(none provided)"}\n\nProvide a concise, actionable answer.`;

  const response = await axios.post(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      model: GROQ_MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are a concise code mentor that answers with clear steps.",
        },
        { role: "user", content: prompt },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      timeout: 15000,
    },
  );

  const answer =
    response.data?.choices?.[0]?.message?.content ||
    "No answer returned from provider.";
  return { answer, provider: "groq" };
}

module.exports = { askModel };
