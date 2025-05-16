import express from "express";
import {
  getFlashcards,
  createFlashcard,
  updateFlashcard,
  deleteFlashcard,
  getID
} from "../controllers/flashcard.controller.js";
import { getFlashcardsByDeck } from "../controllers/flashcard.controller.js";
import userAuth from "../middleware/userAuth.js";

const router = express.Router();

router.get("/deck/:deckId", userAuth, getFlashcardsByDeck);
router.get("/", userAuth, getFlashcards);
router.post("/", userAuth, createFlashcard);
router.put("/:id", userAuth, updateFlashcard);
router.delete("/:id", userAuth, deleteFlashcard);
router.get("/:id", userAuth, getID);

export default router;
