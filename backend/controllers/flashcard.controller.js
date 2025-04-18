import Flashcard from "../models/flashcard.model.js";
import mongoose from "mongoose";

// Get all flashcards
export const getFlashcards = async (req, res) => {
  try {
    const flashcards = await Flashcard.find({}).populate("deck", "title");
    res.status(200).json({ success: true, data: flashcards });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch flashcards",
    });
  }
};

// Get flashcards by deck ID
export const getFlashcardsByDeck = async (req, res) => {
  const { deckId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(deckId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid deck ID format",
    });
  }

  try {
    const flashcards = await Flashcard.find({ deck: deckId });
    res.status(200).json({ success: true, data: flashcards });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch flashcards for this deck",
    });
  }
};

// Create a new flashcard
export const createFlashcard = async (req, res) => {
  const { question, answer, deck } = req.body;

  if (!question || !answer || !deck) {
    return res.status(400).json({
      success: false,
      message: "Question, answer, and deck ID are required",
    });
  }

  try {
    const newFlashcard = new Flashcard({ question, answer, deck });
    await newFlashcard.save();
    res.status(201).json({ success: true, data: newFlashcard });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Error creating flashcard",
    });
  }
};

// Update a flashcard by ID
export const updateFlashcard = async (req, res) => {
  const { id } = req.params;
  const { question, answer } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid flashcard ID format",
    });
  }

  try {
    const updatedFlashcard = await Flashcard.findByIdAndUpdate(
      id,
      { question, answer },
      { new: true }
    );

    if (!updatedFlashcard) {
      return res.status(404).json({
        success: false,
        message: "Flashcard not found",
      });
    }

    res.status(200).json({ success: true, data: updatedFlashcard });
  } catch (err) {
    console.error("Update Error:", err.message);
    res.status(500).json({
      success: false,
      message: "Error updating flashcard",
    });
  }
};

// Delete a flashcard by ID
export const deleteFlashcard = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid flashcard ID format",
    });
  }

  try {
    const deletedFlashcard = await Flashcard.findByIdAndDelete(id);

    if (!deletedFlashcard) {
      return res.status(404).json({
        success: false,
        message: "Flashcard not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Flashcard deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Error deleting flashcard",
    });
  }
};

// Get flashcard by its own ID
export const getID = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid flashcard ID format",
    });
  }

  try {
    const flashcard = await Flashcard.findById(id).populate("deck", "title");
    if (!flashcard) {
      return res.status(404).json({
        success: false,
        message: "Flashcard not found",
      });
    }
    res.status(200).json({ success: true, data: flashcard });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
