// Load environment variables as early as possible. Use a dynamic import so dotenv
// runs before we import other modules that might read process.env during their
// top-level evaluation.
await import('dotenv/config');

const expressModule = await import('express');
const corsModule = await import('cors');
const chatbotRoutesModule = await import('./routes/chatbot.js'); // ✅ Gemini route import

const express = expressModule.default;
const cors = corsModule.default;
const chatbotRoutes = chatbotRoutesModule.default;

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
