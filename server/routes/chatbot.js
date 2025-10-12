import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();

// Use Node's process.env for server-side environment variables
const API_KEY_Gemini = process.env.GEMINI_API_KEY || "";
if (!API_KEY_Gemini) {
  console.warn("⚠️  GEMINI_API_KEY is not set. Chatbot requests will fail until you set the key in server/.env.");
}

// Pass the API key value to the GoogleGenerativeAI client using the expected config shape.
// The library expects an options object (for example: { apiKey: 'YOUR_KEY' }) instead of a raw string.
const genAI = new GoogleGenerativeAI({ apiKey: API_KEY_Gemini });

router.post("/ask", async (req, res) => {
  try {
    if (!API_KEY_Gemini) {
      // Fail fast for chat requests when the API key isn't configured
      return res.status(500).json({ error: 'GEMINI_API_KEY not configured on the server.' });
    }
    const { prompt } = req.body;
    const userPrompt = prompt || "Explain what is Artificial Intelligence in simple words.";

    console.log("🟢 Received prompt:", userPrompt);

    // ✅ Correct model name (no ":generateContent")
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    console.log("✅ Model initialized successfully (gemini-2.0-flash)");

    const result = await model.generateContent(userPrompt);

    const reply = result?.response?.text?.() || "⚠️ No response text generated.";
    console.log("🤖 Gemini response:", reply);

    res.json({ reply });
  } catch (error) {
    console.error("❌ Gemini API Error:", error);
    res.status(500).json({
      error: "Gemini API request failed",
      details: error.message || error.toString(),
    });
  }
});

export default router;
