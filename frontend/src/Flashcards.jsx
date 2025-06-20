import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

// Modern color palette
const colors = {
  primary: "#4F46E5", // Indigo
  primaryHover: "#4338CA", // Darker indigo
  primaryLight: "#E0E7FF", // Light indigo
  secondary: "#10B981", // Emerald
  secondaryHover: "#0D9C6F",
  background: "#F9FAFB", // Light gray
  cardBg: "#FFFFFF", // White
  textDark: "#111827", // Gray-900
  textMedium: "#6B7280", // Gray-500
  textLight: "#9CA3AF", // Gray-400
  border: "#E5E7EB", // Gray-200
  borderLight: "#F3F4F6", // Gray-100
  error: "#EF4444", // Red-500
  errorHover: "#DC2626",
  success: "#10B981", // Emerald-500
  accent: "#6366F1", // Indigo-400
  highlight: "#E0E7FF", // Indigo-100
  shadow: "rgba(0, 0, 0, 0.05)",
  overlay: "rgba(0, 0, 0, 0.4)",
};

// Styles
const styles = {
  container: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    padding: "1.5rem",
    backgroundColor: colors.background,
    minHeight: "100vh",
    maxWidth: "1200px",
    margin: "0 auto",
    "@media (max-width: 768px)": {
      padding: "1rem",
    },
  },
  navBar: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.cardBg,
    padding: "16px 5%",
    boxShadow: `0 2px 4px ${colors.shadow}`,
    zIndex: 1000,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: `1px solid ${colors.borderLight}`,
  },
  navTitle: {
    fontSize: "1.5rem",
    fontWeight: 700,
    color: colors.textDark,
    margin: 0,
  },
  backButton: {
    padding: "0.75rem 1rem",
    borderRadius: "8px",
    backgroundColor: "transparent",
    color: colors.primary,
    border: `1px solid ${colors.border}`,
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "0.875rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    transition: "all 0.2s ease",
    ":hover": {
      backgroundColor: colors.highlight,
      borderColor: colors.primary,
    },
  },
  contentContainer: {
    marginTop: "5rem",
  },
  flashcardsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "1.5rem",
    "@media (max-width: 768px)": {
      gridTemplateColumns: "1fr",
    },
  },
  card: {
    backgroundColor: colors.cardBg,
    padding: "1.5rem",
    borderRadius: "12px",
    boxShadow: `0 2px 8px ${colors.shadow}`,
    border: `1px solid ${colors.border}`,
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    ":hover": {
      transform: "translateY(-4px)",
      boxShadow: `0 4px 12px ${colors.shadow}`,
    },
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1rem",
    paddingBottom: "1rem",
    borderBottom: `1px solid ${colors.borderLight}`,
  },
  deckTitle: {
    fontSize: "0.75rem",
    fontWeight: 600,
    color: colors.primary,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    display: "flex",
    alignItems: "center",
    gap: "0.375rem",
  },
  buttonGroup: {
    display: "flex",
    gap: "0.5rem",
    alignItems: "center",
  },
  iconButton: {
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    padding: "0.5rem",
    borderRadius: "6px",
    color: colors.textLight,
    transition: "all 0.2s ease",
    ":hover": {
      backgroundColor: colors.highlight,
      color: colors.primary,
    },
  },
  deleteButton: {
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    padding: "0.5rem",
    borderRadius: "6px",
    color: colors.textLight,
    transition: "all 0.2s ease",
    ":hover": {
      backgroundColor: "rgba(239, 68, 68, 0.1)",
      color: colors.error,
    },
  },
  question: {
    fontSize: "1.125rem",
    fontWeight: 500,
    color: colors.textDark,
    marginBottom: "1rem",
    lineHeight: "1.5",
    wordBreak: "break-word",
    whiteSpace: "normal",
  },
  answer: {
    fontSize: "1rem",
    color: colors.textMedium,
    backgroundColor: colors.borderLight,
    padding: "1rem",
    borderRadius: "8px",
    lineHeight: "1.5",
    borderLeft: `4px solid ${colors.primary}`,
    wordBreak: "break-word",
    whiteSpace: "normal",
  },
  editForm: {
    marginTop: "1rem",
  },
  textarea: {
    width: "100%",
    padding: "0.75rem",
    borderRadius: "8px",
    border: `1px solid ${colors.border}`,
    fontFamily: "'Inter', sans-serif",
    fontSize: "1rem",
    resize: "vertical",
    minHeight: "80px",
    maxHeight: "150px",
    transition: "all 0.2s ease",
    boxSizing: "border-box",
    ":focus": {
      outline: "none",
      borderColor: colors.primary,
      boxShadow: `0 0 0 3px ${colors.highlight}`,
    },
  },
  saveButton: {
    padding: "0.75rem 1.5rem",
    borderRadius: "8px",
    backgroundColor: colors.primary,
    color: "white",
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "0.875rem",
    marginRight: "0.75rem",
    transition: "all 0.2s ease",
    ":hover": {
      backgroundColor: colors.primaryHover,
    },
  },
  cancelButton: {
    padding: "0.75rem 1.5rem",
    borderRadius: "8px",
    backgroundColor: "transparent",
    color: colors.textDark,
    border: `1px solid ${colors.border}`,
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "0.875rem",
    transition: "all 0.2s ease",
    ":hover": {
      backgroundColor: colors.borderLight,
    },
  },
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "3rem 1.5rem",
    backgroundColor: colors.cardBg,
    borderRadius: "12px",
    border: `1px dashed ${colors.border}`,
    marginTop: "1.5rem",
    textAlign: "center",
  },
  emptyStateIcon: {
    width: "48px",
    height: "48px",
    marginBottom: "1rem",
    color: colors.textLight,
  },
  errorMessage: {
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    padding: "0.75rem 1rem",
    borderRadius: "8px",
    border: `1px solid ${colors.error}`,
    color: colors.error,
    marginBottom: "1.5rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  loadingSpinner: {
    width: "2.5rem",
    height: "2.5rem",
    border: `4px solid ${colors.borderLight}`,
    borderTop: `4px solid ${colors.primary}`,
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  "@keyframes spin": {
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" },
  },
};

function Flashcards() {
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    question: "",
    answer: "",
  });
  const [deckTitle, setDeckTitle] = useState("All Flashcards");
  const navigate = useNavigate();
  const { deckId } = useParams();
  const baseURL =
    import.meta.env.VITE_API_URL || "http://localhost:5000/api/flashcards";

  useEffect(() => {
    const fetchDeckDetailsAndFlashcards = async () => {
      try {
        setLoading(true);
        if (deckId) {
          // Fetch deck details
          const deckRes = await axios.get(
            `${baseURL.replace("flashcards", "decks")}/${deckId}`,
            {
              withCredentials: true,
            }
          );
          setDeckTitle(deckRes.data.data?.title || "Untitled Deck");

          // Fetch flashcards for the deck
          const flashcardRes = await axios.get(`${baseURL}/deck/${deckId}`, {
            withCredentials: true,
          });
          setFlashcards(flashcardRes.data.data || []);
        } else {
          // Fetch all flashcards
          setDeckTitle("All Flashcards");
          const res = await axios.get(baseURL, { withCredentials: true });
          setFlashcards(res.data.data || []);
        }
      } catch (err) {
        setError("Failed to load flashcards");
        console.error(err);
        if (err.response?.status === 401) {
          navigate("/");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchDeckDetailsAndFlashcards();
  }, [baseURL, navigate, deckId]);

  const handleEdit = (flashcard) => {
    setEditingId(flashcard._id);
    setEditFormData({ question: flashcard.question, answer: flashcard.answer });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditFormData({ question: "", answer: "" });
  };

  const handleSaveEdit = async (id) => {
    if (!editFormData.question.trim() || !editFormData.answer.trim()) {
      setError("Question and answer cannot be empty");
      return;
    }
    try {
      const response = await axios.put(`${baseURL}/${id}`, editFormData, {
        withCredentials: true,
      });
      setFlashcards(
        flashcards.map((flashcard) =>
          flashcard._id === id ? response.data.data : flashcard
        )
      );
      setEditingId(null);
      setError(null);
    } catch (err) {
      setError("Failed to update flashcard");
      console.error(err);
      if (err.response?.status === 401) {
        navigate("/");
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this flashcard?")) {
      try {
        await axios.delete(`${baseURL}/${id}`, { withCredentials: true });
        setFlashcards(flashcards.filter((flashcard) => flashcard._id !== id));
      } catch (err) {
        setError("Failed to delete flashcard");
        console.error(err);
        if (err.response?.status === 401) {
          navigate("/");
        }
      }
    }
  };

  const handleBack = () => {
    navigate(deckId ? `/decks/${deckId}` : "/decks");
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.navBar}>
          <h1 style={styles.navTitle}>Loading...</h1>
          <button
            style={styles.backButton}
            onClick={handleBack}
            aria-label="Back"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
        >
          <div style={styles.loadingSpinner}></div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.navBar}>
        <h1 style={styles.navTitle}>{deckTitle}</h1>
        <div style={styles.buttonGroup}>
          
          <button
            style={styles.backButton}
            onClick={handleBack}
            aria-label="Back"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        </div>
      </div>

      <div style={styles.contentContainer}>
        {error && (
          <div style={styles.errorMessage}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {error}
          </div>
        )}

        {flashcards.length === 0 ? (
          <div style={styles.emptyState}>
            <svg
              style={styles.emptyStateIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 3h18v18H3z" />
              <path d="M3 9h18" />
              <path d="M9 9v12" />
            </svg>
            <h3
              style={{
                color: colors.textDark,
                marginBottom: "0.5rem",
                fontSize: "1.25rem",
                fontWeight: 600,
              }}
            >
              No flashcards found
            </h3>
            <p
              style={{
                color: colors.textMedium,
                marginBottom: "1.5rem",
                maxWidth: "400px",
              }}
            >
              {deckId
                ? "This deck doesn't have any flashcards yet. Go to the deck to create your first flashcard."
                : "You haven't created any flashcards yet. Go to a deck to create your first flashcard."}
            </p>
            {deckId && (
              <button
                style={{
                  ...styles.backButton,
                  backgroundColor: colors.primary,
                  color: "white",
                  ":hover": {
                    backgroundColor: colors.primaryHover,
                  },
                }}
                onClick={() => navigate(`/decks/${deckId}`)}
                aria-label="Go to deck"
              >
                Go to Deck
              </button>
            )}
          </div>
        ) : (
          <div style={styles.flashcardsGrid}>
            {flashcards.map((flashcard) => (
              <div key={flashcard._id} style={styles.card}>
                <div style={styles.cardHeader}>
                  <span style={styles.deckTitle}>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <line x1="3" y1="9" x2="21" y2="9" />
                      <line x1="9" y1="21" x2="9" y2="9" />
                    </svg>
                    {deckTitle || "Untitled Deck"}
                  </span>
                  <div style={styles.buttonGroup}>
                    
                    <button
                      style={styles.iconButton}
                      onClick={() => handleEdit(flashcard)}
                      disabled={editingId === flashcard._id}
                      aria-label="Edit flashcard"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </button>
                    <button
                      style={styles.deleteButton}
                      onClick={() => handleDelete(flashcard._id)}
                      aria-label="Delete flashcard"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 6h18" />
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                      </svg>
                    </button>
                  </div>
                </div>
                {editingId === flashcard._id ? (
                  <div style={styles.editForm}>
                    <textarea
                      style={styles.textarea}
                      value={editFormData.question}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          question: e.target.value,
                        })
                      }
                      placeholder="Question"
                      autoFocus
                      aria-label="Edit question"
                    />
                    <textarea
                      style={styles.textarea}
                      value={editFormData.answer}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          answer: e.target.value,
                        })
                      }
                      placeholder="Answer"
                      aria-label="Edit answer"
                    />
                    <div>
                      <button
                        style={styles.saveButton}
                        onClick={() => handleSaveEdit(flashcard._id)}
                        aria-label="Save changes"
                      >
                        Save Changes
                      </button>
                      <button
                        style={styles.cancelButton}
                        onClick={handleCancelEdit}
                        aria-label="Cancel edit"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div style={styles.question}>{flashcard.question}</div>
                    <div style={styles.answer}>{flashcard.answer}</div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Flashcards;
