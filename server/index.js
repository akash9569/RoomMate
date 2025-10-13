import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// Load environment variables from multiple files (try .env.local then .env).
// Must run before importing modules that read process.env during their top-level evaluation.
dotenv.config({ path: [".env.local", ".env"] });

// Import routes after dotenv has populated process.env so route modules see the variables.
const chatbotRoutesModule = await import("./routes/chatbot.js"); // top-level await (ESM)
const chatbotRoutes = chatbotRoutesModule.default; // ✅ Gemini route import

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Use Gemini chatbot route
app.use("/api", chatbotRoutes);

app.get("/", (req, res) => {
  res.send("RoomMate Gemini backend is running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
