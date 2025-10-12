import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();

// ⚠️ Static API key — use only for testing
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/ask", async (req, res) => {
  try {
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
