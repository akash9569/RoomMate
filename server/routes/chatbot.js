import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();


const API_KEY_Gemini = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || process.env.OPENAI_API_KEY || "";
if (!API_KEY_Gemini) {
  console.warn("⚠️  GEMINI_API_KEY (or GOOGLE_API_KEY / OPENAI_API_KEY) is not set. Chatbot requests will fail until you set the key in server/.env.");
}


let genAI = null;
if (API_KEY_Gemini) {
  const mask = (k) => (k.length > 8 ? `${k.slice(0,3)}...${k.slice(-3)}` : '***masked***');
  genAI = new GoogleGenerativeAI(API_KEY_Gemini);
}

router.post("/ask", async (req, res) => {
  try {
    if (!API_KEY_Gemini || !genAI) {
      // Fail fast for chat requests when the API key isn't configured or client not initialized
      return res.status(500).json({
        error: 'GEMINI_API_KEY not configured on the server.',
        hint: 'Set GEMINI_API_KEY (or GOOGLE_API_KEY) in server/.env and restart the server. Do not commit secrets to git.',
      });
    }
    const { prompt } = req.body;
    const userPrompt = prompt || "Explain what is Artificial Intelligence in simple words.";

    console.log("🟢 Received prompt:", userPrompt);

    // ✅ Correct model name (no ":generateContent")
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const result = await model.generateContent(userPrompt);
    const reply = result?.response?.text?.() || "⚠️ No response text generated.";
    res.json({ reply });
  } catch (error) {
    // Try to extract useful structured details from common error shapes.
    const message = error?.message || error?.toString() || 'Unknown error from Gemini client';
    console.error("❌ Gemini API Error:", message);

    // Provide a hint when the error seems authentication-related.
    const lower = message.toLowerCase();
    const authHint = (lower.includes('api key') || lower.includes('invalid') || lower.includes('unauth'))
      ? 'Check GEMINI_API_KEY / GOOGLE_API_KEY is set and valid; ensure the key has not been restricted to different APIs or IPs.'
      : undefined;

    res.status(500).json({
      error: 'Gemini API request failed',
      details: message,
      hint: authHint,
    });
  }
});

export default router;
