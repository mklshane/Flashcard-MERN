import Deck from "../models/deck.model.js";

export const createDeck = async (req, res) => {
  const { title, description } = req.body;
  if (!title) {
    return res
      .status(400)
      .json({ success: false, message: "Title is required" });
  }

  try {
    const newDeck = new Deck({ title, description });
    await newDeck.save();
    res.status(201).json({ success: true, data: newDeck });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to create deck" });
  }
};

export const getDecks = async (req, res) => {
  try {
    const decks = await Deck.find({});
    res.status(200).json({ success: true, data: decks });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch decks" });
  }
};


