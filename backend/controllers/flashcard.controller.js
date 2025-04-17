import Flashcard from "../models/flashcard.model.js"; // Update the path if necessary
import mongoose from "mongoose";


// Get all flashcards
export const getFlashcards = async (req, res) => {
  try {
    const flashcards = await Flashcard.find({}); // Fetch all flashcards from the database
    res.status(200).json({ success: true, data: flashcards }); // Send back the flashcards
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch flashcards" });
  }
};

// Create a new flashcard
export const createFlashcard = async (req, res) => {
  const { question, answer } = req.body;

  // Validate request data
  if (!question || !answer) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Both question and answer are required",
      });
  }

  try {
    // Create and save the new flashcard
    const newFlashcard = new Flashcard({ question, answer });
    await newFlashcard.save();
    res.status(201).json({ success: true, data: newFlashcard }); // Send back the created flashcard
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Error creating flashcard" });
  }
};

// Update a flashcard by ID
export const updateFlashcard = async (req, res) => {
  const { id } = req.params; // Get the flashcard ID from the URL
  const { question, answer } = req.body; // Get updated data from the request body

  // Validate the ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid ID format",
    });
  }

  try {
    // Find the flashcard by ID and update it
    const updatedFlashcard = await Flashcard.findByIdAndUpdate(
      id,
      { question, answer },
      { new: true }
    );

    // Check if the flashcard was found and updated
    if (!updatedFlashcard) {
      return res
        .status(404)
        .json({ success: false, message: "Flashcard not found" });
    }

    // Return the updated flashcard
    res.status(200).json({ success: true, data: updatedFlashcard });

  } catch (err) {
    // Log error for debugging
    console.error("Update Error:", err.message);
    res
      .status(500)
      .json({ success: false, message: "Error updating flashcard" });
  }
};

// Delete a flashcard by ID
export const deleteFlashcard = async (req, res) => {
  const { id } = req.params; // Get the flashcard ID from the URL

  try {
    // Find the flashcard by ID and delete it
    const deletedFlashcard = await Flashcard.findByIdAndDelete(id);
    if (!deletedFlashcard) {
      return res
        .status(404)
        .json({ success: false, message: "Flashcard not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Flashcard deleted successfully" }); // Confirm deletion
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Error deleting flashcard" });
  }
};

  export const getID = async (req, res) => {
  try {
    const flashcard = await Flashcard.findById(req.params.id);
    if (!flashcard) {
      return res
        .status(404)
        .json({ success: false, message: "Flashcard not found" });
    }
    res.status(200).json({ success: true, data: flashcard });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
