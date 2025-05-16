import express from "express";
import {
  createDeck,
  getDecks,
  deleteDeck,
  getDeckDetails,
} from "../controllers/deck.controller.js";
import userAuth from "../middleware/userAuth.js";

const router = express.Router();

// Require authentication for all deck actions
router.post("/", userAuth, createDeck);
router.get("/", userAuth, getDecks);
router.delete("/:deckID", userAuth, deleteDeck);
router.get("/:deckId", userAuth, getDeckDetails);

export default router;
