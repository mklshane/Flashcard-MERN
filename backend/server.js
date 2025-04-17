import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import flashcardRoutes from "./routes/flashcard.route.js";
import cors from 'cors';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Add this before routes

app.use(express.json()); // Accept JSON in the request body

// Route for flashcards
app.use("/api/flashcards", flashcardRoutes);

// Start server after DB connection
app.listen(PORT, () => {
  connectDB();
  console.log(`Server started at http://localhost:${PORT}`);
});
