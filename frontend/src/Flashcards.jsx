

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./styles/AllFlashcards.css";

const getAuthHeaders = () => {
  const firebaseToken = localStorage.getItem("firebaseToken");
  return firebaseToken ? { Authorization: `Bearer ${firebaseToken}` } : {};
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
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();
  const { deckId } = useParams();
  const baseURL =
    import.meta.env.VITE_API_URL || "http://localhost:5000/api/flashcards";

  useEffect(() => {
    // Check for dark mode
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

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
              headers: getAuthHeaders(),
            }
          );
          setDeckTitle(deckRes.data.data?.title || "Untitled Deck");

          // Fetch flashcards for the deck
          const flashcardRes = await axios.get(`${baseURL}/deck/${deckId}`, {
            withCredentials: true,
            headers: getAuthHeaders(),
          });
          setFlashcards(flashcardRes.data.data || []);
        } else {
          // Fetch all flashcards
          setDeckTitle("All Flashcards");
          const res = await axios.get(baseURL, {
            withCredentials: true,
            headers: getAuthHeaders(),
          });
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
        headers: getAuthHeaders(),
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
        await axios.delete(`${baseURL}/${id}`, {
          withCredentials: true,
          headers: getAuthHeaders(),
        });
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
      <div className="flashcards-container">
        <div className="flashcards-nav-bar">
          <h1 className="flashcards-nav-title">Loading...</h1>
          <button
            className="flashcards-back-button"
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
        <div className="flashcards-loading-container">
          <div
            className="flashcards-loading-spinner"
            role="status"
            aria-label="Loading flashcards"
          ></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flashcards-container">
      <div className="flashcards-nav-bar">
        <button
          className="flashcards-back-button"
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
        <h1 className="flashcards-nav-title">{deckTitle}</h1>
        <div>{" "}</div>
      </div>

      <div className="flashcards-content-container">
        {error && (
          <div className="flashcards-error-message" role="alert">
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
          <div className="flashcards-empty-state">
            <svg
              className="flashcards-empty-state-icon"
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
            <h3>No flashcards found</h3>
            <p>
              {deckId
                ? "This deck doesn't have any flashcards yet. Go to the deck to create your first flashcard."
                : "You haven't created any flashcards yet. Go to a deck to create your first flashcard."}
            </p>
            {deckId && (
              <button
                className="button"
                onClick={() => navigate(`/decks/${deckId}`)}
                aria-label="Go to deck"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M3 3h18v18H3z" />
                  <path d="M3 9h18" />
                  <path d="M9 9v12" />
                </svg>
                Go to Deck
              </button>
            )}
          </div>
        ) : (
          <div className="flashcards-grid">
            {flashcards.map((flashcard) => (
              <div key={flashcard._id} className="flashcard-item">
                <div className="flashcard-header">
                  <span className="flashcard-deck-title">
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
                  <div className="flashcard-button-group">
                    <button
                      className="flashcard-icon-button"
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
                      className="flashcard-delete-button"
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
                  <div className="flashcard-edit-form">
                    <textarea
                      className="flashcard-textarea"
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
                      className="flashcard-textarea"
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
                    <div className="flashcard-form-buttons">
                      <button
                        className="flashcard-save-button"
                        onClick={() => handleSaveEdit(flashcard._id)}
                        aria-label="Save changes"
                      >
                        Save Changes
                      </button>
                      <button
                        className="flashcard-cancel-button"
                        onClick={handleCancelEdit}
                        aria-label="Cancel edit"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flashcard-question">
                      {flashcard.question}
                    </div>
                    <div className="flashcard-answer">{flashcard.answer}</div>
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
