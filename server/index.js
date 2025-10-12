import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import chatbotRoutes from "./routes/chatbot.js"; // ✅ Gemini route import

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

// ✅ Use Gemini chatbot route
app.use("/api", chatbotRoutes);

app.get("/", (req, res) => {
  res.send("RoomMate Gemini backend is running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
