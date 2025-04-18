import express from "express";
import { createDeck, getDecks } from "../controllers/deck.controller.js";

const router = express.Router();

// POST /api/decks — Create a new deck
router.post("/", createDeck);

// GET /api/decks — Get all decks
router.get("/", getDecks);

export default router;
