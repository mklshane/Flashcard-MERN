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

export const deleteDeck = async (req, res) => {
  const { deckID } = req.params;

  try {
    // Find the deck by ID and delete it
    const deletedDeck = await Deck.findByIdAndDelete(deckID);

    // If no deck was found with that ID
    if (!deletedDeck) {
      return res.status(404).json({
        success: false,
        message: "Deck not found",
      });
    }

    // Success response
    return res.status(200).json({
      success: true,
      message: "Deck deleted successfully",
      data: deletedDeck,
    });
  } catch (error) {
    // Handle different types of errors
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid deck ID format",
      });
    }

    // Generic server error
    return res.status(500).json({
      success: false,
      message: "Failed to delete deck",
      error: error.message,
    });
  }
};

export const getDeckDetails = async (req, res) => {
  const { deckId } = req.params; // Extract deckId from request params

  try {
    // Fetch deck by ID and select only the title, description, and _id fields
    const deck = await Deck.findById(deckId).select("title description _id");

    // If deck not found, return a 404 error
    if (!deck) {
      return res.status(404).json({
        success: false,
        message: "Deck not found",
      });
    }

    // Return the deck data
    res.status(200).json({
      success: true,
      data: deck,
    });
  } catch (err) {
    // Handle errors (e.g., invalid ID format)
    if (err.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid deck ID format",
      });
    }

    // Generic error handling
    res.status(500).json({
      success: false,
      message: "Failed to fetch deck details",
    });
  }
};

