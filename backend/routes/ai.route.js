import express from "express";
import { generateAndSaveFlashcards } from "../controllers/ai.controller.js";
import userAuth from "../middleware/userAuth.js";

const router = express.Router();

router.post("/generate-flashcards", userAuth, generateAndSaveFlashcards);

export default router;
