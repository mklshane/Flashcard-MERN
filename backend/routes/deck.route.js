import express from "express";
import { createDeck, getDecks, deleteDeck, getDeckDetails } from "../controllers/deck.controller.js";

const router = express.Router();

// POST /api/decks — Create a new deck
router.post("/", createDeck);

// GET /api/decks — Get all decks
router.get("/", getDecks);

// Delete /api/decks/:deckID
router.delete("/:deckID", deleteDeck);

// GET /api/deck/:deckID - Get deck details
router.get("/:deckId", getDeckDetails);

export default router;
