import express from "express";
import {
  getFlashcards,
  createFlashcard,
  updateFlashcard,
  deleteFlashcard,
  getID
} from "../controllers/flashcard.controller.js";
import { getFlashcardsByDeck } from "../controllers/flashcard.controller.js";



const router = express.Router();

// Define routes without '/api/flashcards' prefix as it's already in server.js
router.get("/deck/:deckId", getFlashcardsByDeck);
router.get("/", getFlashcards);
router.post("/", createFlashcard);
router.put("/:id", updateFlashcard);
router.delete("/:id", deleteFlashcard);
router.get("/:id", getID);


export default router;
