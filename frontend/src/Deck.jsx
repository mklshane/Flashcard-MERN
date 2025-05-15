import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

/**
 * Modern color palette for consistent styling
 */
const colors = {
  primary: "#6366f1", // Indigo
  primaryHover: "#4f46e5", // Darker indigo
  background: "#f8fafc", // Light gray
  cardBg: "#ffffff", // White
  textDark: "#1e293b", // Slate-800
  textMedium: "#64748b", // Slate-500
  textLight: "#94a3b8", // Slate-400
  border: "#e2e8f0", // Slate-200
  shadow: "rgba(0, 0, 0, 0.1)",
  overlay: "rgba(0, 0, 0, 0.5)",
};

/**
 * Component Styles
 * Organized by component sections
 */
const styles = {
  // Main container styles
  container: {
    fontFamily: "'Inter', sans-serif",
    padding: "0 20px 40px",
    backgroundColor: colors.background,
    minHeight: "100vh",
  },

  // Navigation bar styles
  navBar: {
    width: "100%",
    padding: "16px 24px",
    backgroundColor: colors.cardBg,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: `0 1px 3px ${colors.shadow}`,
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 1000,
    height: "64px",
    borderBottom: `1px solid ${colors.border}`,
    boxSizing: "border-box",
  },

  navTitle: {
    fontSize: "1.25rem",
    color: colors.textDark,
    fontWeight: "700",
    margin: 0,
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },

  navButton: {
    padding: "8px 16px",
    fontSize: "0.875rem",
    fontFamily: "'Inter', sans-serif",
    borderRadius: "8px",
    backgroundColor: colors.primary,
    color: "white",
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },

  // Decks container styles
  decksContainer: {
    maxWidth: "1200px",
    margin: "0 auto",
    paddingTop: "80px",
  },

  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "32px",
  },

  header: {
    color: colors.textDark,
    fontSize: "2rem",
    fontWeight: "700",
    margin: 0,
  },

  // Deck grid and card styles
  decksGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "24px",
  },

  deckCard: {
    backgroundColor: colors.cardBg,
    padding: "24px",
    borderRadius: "12px",
    boxShadow: `0 4px 6px ${colors.shadow}`,
    cursor: "pointer",
    textAlign: "left",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    border: `1px solid ${colors.border}`,
    display: "flex",
    flexDirection: "column",
    minHeight: "140px",
    position: "relative",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: `0 6px 12px ${colors.shadow}`,
    },
  },

  deckTitle: {
    fontSize: "1.25rem",
    fontWeight: "600",
    marginBottom: "12px",
    color: colors.textDark,
  },

  deckDescription: {
    fontSize: "0.95rem",
    color: colors.textMedium,
    lineHeight: "1.5",
    flexGrow: 1,
  },

  // Button styles
  button: {
    fontFamily: "'Inter', sans-serif",
    padding: "12px 24px",
    borderRadius: "8px",
    backgroundColor: colors.primary,
    color: "white",
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "1rem",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },

  cancelButton: {
    backgroundColor: colors.border,
    color: colors.textDark,
  },

  // Empty state and loading styles
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 20px",
    textAlign: "center",
    color: colors.textMedium,
  },

  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "200px",
  },

  spinner: {
    width: "40px",
    height: "40px",
    border: `4px solid ${colors.border}`,
    borderTop: `4px solid ${colors.primary}`,
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },

  // Modal styles
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.overlay,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2000,
    backdropFilter: "blur(2px)",
  },

  modalContent: {
    backgroundColor: colors.cardBg,
    padding: "32px",
    borderRadius: "12px",
    width: "90%",
    maxWidth: "500px",
    boxShadow: `0 10px 25px ${colors.shadow}`,
    maxHeight: "90vh",
    overflowY: "auto",
  },

  modalHeader: {
    marginBottom: "24px",
    color: colors.textDark,
    fontSize: "1.5rem",
    fontWeight: "600",
  },

  // Form input styles
  input: {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "8px",
    border: `1px solid ${colors.border}`,
    fontSize: "1rem",
    marginBottom: "16px",
    boxSizing: "border-box",
  },

  textarea: {
    minHeight: "100px",
    resize: "vertical",
    fontFamily: "'Inter', sans-serif",
  },

  modalFooter: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
    marginTop: "24px",
  },

  // Delete button styles
  deleteButton: {
    position: "absolute",
    bottom: "13px",
    right: "12px",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: colors.textLight,
    transition: "color 0.2s ease",
    padding: "4px",
    borderRadius: "4px",
    "&:hover": {
      color: "#ef4444", // Red color on hover
    },
  },

  cardCount: {
    marginTop: "16px",
    color: colors.textLight,
    fontSize: "0.85rem",
    bottom: "22px",
    position: "absolute",
  },
};

/**
 * Utility function to delete a deck
 * @param {string} deckId - ID of the deck to delete
 * @param {Event} e - Click event
 */
const deleteDeck = async (deckId, e) => {
  e.stopPropagation(); // Prevent the deck click event from firing
  try {
    if (window.confirm("Are you sure you want to delete this deck?")) {
      await axios.delete(`http://localhost:5000/api/decks/${deckId}`);
      window.location.reload(); // Reload the page to reflect changes
    }
  } catch (err) {
    console.error("Error deleting deck:", err);
    alert("Failed to delete deck. Please try again.");
  }
};

/**
 * Main DeckPage component
 */
function DeckPage() {
  // State management
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newDeck, setNewDeck] = useState({ title: "", description: "" });
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();

  // Fetch decks on component mount
  useEffect(() => {
    fetchDecks();
  }, []);

  // Handle body overflow when modal is open
  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  /**
   * Fetches decks and their associated flashcards from the API
   */
  const fetchDecks = async () => {
    try {
      // Send a GET request to the server to fetch all decks
      const response = await axios.get("http://localhost:5000/api/decks");

      // Fetch flashcards for each deck in parallel using Promise.all
      const decksWithFlashcards = await Promise.all(
        response.data.data.map(async (deck) => {
          try {
            // For each deck, fetch its associated flashcards
            const flashcardsRes = await axios.get(
              `http://localhost:5000/api/flashcards/deck/${deck._id}`
            );

            // Return the deck with its flashcards added, or an empty array if no flashcards are found
            return {
              ...deck,
              flashcards: flashcardsRes.data.data || [], // Default to an empty array if no flashcards
            };
          } catch (err) {
            // If there's an error fetching flashcards for a deck, log the error
            console.error(
              `Error fetching flashcards for deck ${deck._id}:`,
              err
            );
            // Return the deck with an empty flashcards array in case of an error
            return { ...deck, flashcards: [] };
          }
        })
      );

      // Update the state with the decks and their associated flashcards
      setDecks(decksWithFlashcards);
    } catch (err) {
      // If there's an error fetching the decks, log it and update the error state
      console.error("Error fetching decks:", err);
      setError("Failed to load decks. Please try again.");
    } finally {
      // Regardless of success or failure, stop the loading state
      setLoading(false);
    }
  };

  // Event handlers
  const handleDeckClick = (id) => navigate(`/decks/${id}`);
  const handleCreateDeck = (e) => {
    if (e) e.preventDefault();
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNewDeck({ title: "", description: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDeck((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Handles form submission for creating a new deck
   * @param {Event} e - Form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsCreating(true);
      await axios.post("http://localhost:5000/api/decks", newDeck);
      handleCloseModal();
      window.location.reload(); // Force page reload after successful creation
    } catch (err) {
      console.error("Error creating deck:", err);
      setError("Failed to create deck. Please try again.");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* Navigation Bar */}
      <div style={styles.navBar}>
        <div style={styles.navTitle}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17"
              stroke={colors.primary}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          WeFlash
        </div>
        <button onClick={handleCreateDeck} style={styles.navButton}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 4V20M4 12H20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          New Deck
        </button>
      </div>

      {/* Main Content */}
      <div style={styles.decksContainer}>
        <div style={styles.headerContainer}>
          <h1 style={styles.header}>Your Decks</h1>
        </div>

        {/* Conditional Rendering - Fixed Syntax */}
        {loading ? (
          <div style={styles.loading}>
            <div style={styles.spinner}></div>
          </div>
        ) : error ? (
          <div style={styles.emptyState}>
            <p>{error}</p>
          </div>
        ) : decks.length === 0 ? (
          <div style={styles.emptyState}>
            <h3 style={{ color: colors.textDark, marginBottom: "8px" }}>
              No decks yet
            </h3>
            <p style={{ marginBottom: "24px" }}>
              Create your first deck to get started
            </p>
            <button onClick={handleCreateDeck} style={styles.button}>
              Create Deck
            </button>
          </div>
        ) : (
          <div style={styles.decksGrid}>
            {decks.map((deck) => (
              <div
                key={deck._id}
                style={styles.deckCard}
                onClick={() => handleDeckClick(deck._id)}
              >
                {/* Delete Button */}
                <button
                  style={styles.deleteButton}
                  onClick={(e) => deleteDeck(deck._id, e)}
                  title="Delete deck"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7M4 7H20"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {/* Deck Content */}
                <div style={styles.deckTitle}>{deck.title}</div>
                {deck.description && (
                  <div style={styles.deckDescription}>{deck.description}</div>
                )}
                <div style={styles.cardCount}>
                  {deck.flashcards.length}{" "}
                  {deck.flashcards.length === 1 ? "card" : "cards"}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Deck Modal */}
      {showModal && (
        <div
          style={styles.modalOverlay}
          onClick={(e) => {
            if (e.target === e.currentTarget) handleCloseModal();
          }}
        >
          <div style={styles.modalContent}>
            <h2 style={styles.modalHeader}>Create New Deck</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                placeholder="Deck title"
                value={newDeck.title}
                onChange={handleInputChange}
                style={styles.input}
                required
              />
              <textarea
                name="description"
                placeholder="Description (optional)"
                value={newDeck.description}
                onChange={handleInputChange}
                style={{ ...styles.input, ...styles.textarea }}
              />
              <div style={styles.modalFooter}>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  style={{ ...styles.button, ...styles.cancelButton }}
                  disabled={isCreating}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={styles.button}
                  disabled={isCreating || !newDeck.title.trim()}
                >
                  {isCreating ? (
                    <>
                      <div
                        style={{
                          ...styles.spinner,
                          width: "16px",
                          height: "16px",
                          marginRight: "8px",
                        }}
                      />
                      Creating...
                    </>
                  ) : (
                    "Create Deck"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Global Styles */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        button:hover:not(:disabled) {
          background-color: ${colors.primaryHover};
          transform: translateY(-1px);
        }
        button[disabled] {
          opacity: 0.7;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}

export default DeckPage;
