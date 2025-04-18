// models/deck.model.js
import mongoose from "mongoose";

const deckSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
});

const Deck = mongoose.model("Deck", deckSchema);
export default Deck;
