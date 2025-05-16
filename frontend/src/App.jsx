import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

// Modern color palette
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
  disabled: "#cccccc",
}; 

const containerStyle = {
  fontFamily: "'Inter', sans-serif",
  padding: "0 20px 80px",
  backgroundColor: colors.background,
  minHeight: "100vh",
};

const contentContainerStyle = {
  maxWidth: "800px",
  margin: "0 auto",
  paddingTop: "80px",
};

const navBarStyle = {
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
};

const navTitleStyle = {
  fontSize: "1.25rem",
  color: colors.textDark,
  fontWeight: "700",
  margin: 0,
};

const backButtonStyle = {
  fontFamily: "'Inter', sans-serif",
  padding: "8px 16px",
  borderRadius: "8px",
  backgroundColor: "transparent",
  color: colors.primary,
  border: "none",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "0.875rem",
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

const inputContainerStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "1px",
  marginBottom: "36px",
};

const inputStyle = {
  fontFamily: "'Inter', sans-serif",
  padding: "12px 16px",
  borderRadius: "8px",
  border: `1px solid ${colors.border}`,
  fontSize: "1rem",
  width: "100%",
  boxSizing: "border-box",
  marginBottom: "10px",
};

const questionCardStyle = {
  backgroundColor: colors.cardBg,
  padding: "32px",
  borderRadius: "12px",
  boxShadow: `0 4px 6px ${colors.shadow}`,
  textAlign: "center",
  border: `1px solid ${colors.border}`,
  minHeight: "300px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  position: "relative",
};

const questionCounterStyle = {
  color: colors.primary,
  fontSize: "0.9rem",
  marginBottom: "20px",
  fontWeight: "600",
  position: "absolute",
  left: "50%",
  transform: "translateX(-50%)",
  top: "24px",
  padding: "8px 16px",
};

const cardTextStyle = {
  fontSize: "1.25rem",
  color: colors.textDark,
  margin: "20px 20px",
  flexGrow: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0 20px",
  borderRadius: "20px"
};

const answerTextStyle = {
  ...cardTextStyle,
  color: colors.primaryHover,
  padding: "20px",
  backgroundColor: "#f8f9fa",
  borderRadius: "8px",
  marginTop: "40px",
  fontWeight: "bold"
};

const buttonStyle = {
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
  minWidth: "120px",
  "&:hover": {
    backgroundColor: colors.primaryHover,
    transform: "translateY(-2px)",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
};

const arrowButtonStyle = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  color: colors.primary,
  fontSize: "1.5rem",
  border: "none",
  cursor: "pointer",
  zIndex: 2,
  padding: "8px 12px",
  borderRadius: "50%",
  transition: "all 0.3s ease",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0)",
  "&:hover": {
    backgroundColor: colors.primary,
    color: "white",
  },
};

const leftArrowStyle = {
  ...arrowButtonStyle,
  left: "16px",
};

const rightArrowStyle = {
  ...arrowButtonStyle,
  right: "16px",
};

const iconButtonStyle = {
  backgroundColor: "transparent",
  border: "none",
  cursor: "pointer",
  padding: "6px",
  borderRadius: "8px",
  transition: "background-color 0.2s ease",
  color: "#A9A9A9",
};

// Modal styles
const updateModalOverlayStyle = {
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
  backdropFilter: "blur(5px)",
};

const updateModalContentStyle = {
  backgroundColor: colors.cardBg,
  padding: "32px",
  borderRadius: "12px",
  width: "90%",
  maxWidth: "500px",
  boxShadow: `0 10px 25px ${colors.shadow}`,
  maxHeight: "90vh",
  overflowY: "auto",
};

const updateModalHeaderStyle = {
  marginBottom: "24px",
  color: colors.textDark,
  fontSize: "1.5rem",
  fontWeight: "600",
};

const cancelButtonStyle = {
  ...buttonStyle,
  backgroundColor: colors.border,
  color: colors.textDark,
};


function App() {
  const { deckId } = useParams();
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_API_URL;

  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [formData, setFormData] = useState({ question: "", answer: "" });
  const [error, setError] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isHovered, setIsHovered] = useState({});
  const [deckTitle, setDeckTitle] = useState("");
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateData, setUpdateData] = useState({ question: "", answer: "" });

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (showUpdateModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showUpdateModal]);

  

  // Fetch deck details once on deckId change
  useEffect(() => {
    if (!deckId) {
      setError("Deck not found.");
      return;
    }
    fetchDeckDetails();
  }, [deckId]);

  const nextCard = () => {
    if (flashcards.length === 0) return;
    setShowAnswer(false);
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  const prevCard = () => {
    if (flashcards.length === 0) return;
    setShowAnswer(false);
    setCurrentIndex(
      (prev) => (prev - 1 + flashcards.length) % flashcards.length
    );
  };

  // Fetch flashcards and handle key listeners
  useEffect(() => {
    if (!deckId) return;

    fetchFlashcards();
    

    const handleKeyDown = (e) => {
      if (showUpdateModal) return;

      const isInputField =
        e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA";

      if (e.key === "Enter" && isInputField) {
        e.preventDefault();
        return;
      }

      if (e.key === " " && !isInputField) {
        e.preventDefault(); // stops page scroll
        setShowAnswer((prev) => !prev);
      } else if (e.key === "ArrowLeft" && !isInputField) {
        prevCard();
      } else if (e.key === "ArrowRight" && !isInputField) {
        nextCard();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [deckId, showUpdateModal, prevCard, nextCard]);

  const fetchDeckDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/decks/${deckId}`, {
          withCredentials: true,
        });
      console.log("Deck details response:", response.data);

      // Check if data is an array and find the deck with the given deckId
      const deck = response.data.data;

      if (deck && deck.title) {
        setDeckTitle(deck.title);
      } else {
        setDeckTitle("Untitled Deck");
      }
    } catch (err) {
      console.error("Error fetching deck details:", err);
    }
  };

  

  const fetchFlashcards = async () => {
    try {
      const res = await axios.get(`${baseURL}/deck/${deckId}`, {
        withCredentials: true,
      });

      if (res.data.data) {
        setFlashcards(res.data.data);
      } else {
        setError("No flashcards available.");
      }
    } catch (err) {
      setError("Error fetching flashcards.");
      console.error(err);
    }
  };
  

  const handleCreate = async () => {
    if (!formData.question || !formData.answer) return;
    await axios.post(`${baseURL}`, {
      ...formData,
      deck: deckId,
    },
    {
      withCredentials: true,
    }
  );
    setFormData({ question: "", answer: "" });
    fetchFlashcards();
  };

  const handleDelete = async () => {
    const id = flashcards[currentIndex]._id;
    await axios.delete(`${baseURL}/${id}`);
    const updatedFlashcards = flashcards.filter(
      (card, i) => i !== currentIndex
    );
    setFlashcards(updatedFlashcards);
    setShowAnswer(false);
    setCurrentIndex((prev) =>
      prev >= updatedFlashcards.length ? updatedFlashcards.length - 1 : prev
    );
  };

  const handleBack = () => {
    navigate("/decks");
  };

  const currentCard = useMemo(() => {
    return flashcards[currentIndex] || null;
  }, [flashcards, currentIndex]);

  const handleMouseEnter = (buttonName) => {
    setIsHovered((prev) => ({ ...prev, [buttonName]: true }));
  };

  const handleMouseLeave = (buttonName) => {
    setIsHovered((prev) => ({ ...prev, [buttonName]: false }));
  };

  const handleShuffle = () => {
    // Create a copy of the flashcards array
    const shuffledCards = [...flashcards];

    // Fisher-Yates shuffle algorithm
    for (let i = shuffledCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledCards[i], shuffledCards[j]] = [
        shuffledCards[j],
        shuffledCards[i],
      ];
    }

    // Update state with shuffled cards and reset position
    setFlashcards(shuffledCards);
    setCurrentIndex(0);
    setShowAnswer(false);
  };

  return (
    <div style={containerStyle}>
      <div style={navBarStyle}>
        <button
          style={{
            ...backButtonStyle,
            ...(isHovered.back ? { backgroundColor: "#f0f0f0" } : {}),
          }}
          onClick={handleBack}
          onMouseEnter={() => handleMouseEnter("back")}
          onMouseLeave={() => handleMouseLeave("back")}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 12H5M12 19l-7-7 7-7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back
        </button>

        <span style={navTitleStyle}>{deckTitle} </span>
        <div style={{ width: "100px" }}></div>
      </div>

      <div style={contentContainerStyle}>
        {error && (
          <p
            style={{
              color: "#ef4444",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            {error}
          </p>
        )}

        <div style={inputContainerStyle}>
          <input
            placeholder="Question"
            value={formData.question}
            onChange={(e) =>
              setFormData({ ...formData, question: e.target.value })
            }
            style={inputStyle}
            autoFocus
          />
          <input
            placeholder="Answer"
            value={formData.answer}
            onChange={(e) =>
              setFormData({ ...formData, answer: e.target.value })
            }
            style={inputStyle}
          />
          <button
            style={{
              ...buttonStyle,
              opacity: !formData.question || !formData.answer ? 0.6 : 1,
              cursor:
                !formData.question || !formData.answer
                  ? "not-allowed"
                  : "pointer",
            }}
            onClick={handleCreate}
            disabled={!formData.question || !formData.answer}
            onMouseEnter={() => handleMouseEnter("add")}
            onMouseLeave={() => handleMouseLeave("add")}
          >
            Add Flashcard
          </button>
        </div>

        {currentCard ? (
          <>
            <div
              style={questionCardStyle}
              onClick={(e) => {
                // Only toggle answer if clicking directly on the card (not buttons)
                if (e.target === e.currentTarget) {
                  setShowAnswer(!showAnswer);
                }
              }}
            >
              <div style={questionCounterStyle}>
                Card {currentIndex + 1} of {flashcards.length}
              </div>

              <div
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  display: "flex",
                  gap: "1px",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  style={{
                    ...iconButtonStyle,
                    ...(isHovered.update ? { backgroundColor: "#f0f0f0" } : {}),
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setUpdateData({
                      question: currentCard.question,
                      answer: currentCard.answer,
                    });
                    setShowUpdateModal(true);
                  }}
                  onMouseEnter={() => handleMouseEnter("update")}
                  onMouseLeave={() => handleMouseLeave("update")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17.5"
                    height="17.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                    <path d="m15 5 4 4" />
                  </svg>
                </button>

                <button
                  style={{
                    ...iconButtonStyle,
                    ...(isHovered.delete ? { backgroundColor: "#f0f0f0" } : {}),
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete();
                  }}
                  onMouseEnter={() => handleMouseEnter("delete")}
                  onMouseLeave={() => handleMouseLeave("delete")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17.5"
                    height="17.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-trash2-icon lucide-trash-2"
                  >
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    <line x1="10" x2="10" y1="11" y2="17" />
                    <line x1="14" x2="14" y1="11" y2="17" />
                  </svg>
                </button>
              </div>

              <div
                style={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => setShowAnswer(!showAnswer)}
              >
                {showAnswer ? (
                  <div style={{ ...answerTextStyle, width: "90%" }}>
                    {currentCard.answer}
                  </div>
                ) : (
                  <div style={{ ...cardTextStyle, marginTop: "40px" }}>
                    {currentCard.question}
                  </div>
                )}
              </div>

              <button
                style={{
                  ...leftArrowStyle,
                  ...(isHovered.prev
                    ? { backgroundColor: "#6366f1", color: "white" }
                    : {}),
                }}
                onClick={prevCard}
                onMouseEnter={() => handleMouseEnter("prev")}
                onMouseLeave={() => handleMouseLeave("prev")}
              >
                ⟨
              </button>
              <button
                style={{
                  ...rightArrowStyle,
                  ...(isHovered.next
                    ? { backgroundColor: "#6366f1", color: "white" }
                    : {}),
                }}
                onClick={nextCard}
                onMouseEnter={() => handleMouseEnter("next")}
                onMouseLeave={() => handleMouseLeave("next")}
              >
                ⟩
              </button>

              <button
                style={{
                  ...iconButtonStyle,
                  ...(isHovered.shuffle ? { backgroundColor: "#f0f0f0" } : {}),
                  position: "absolute",
                  bottom: "32px", // Push to bottom
                  right: "40px", // Push to right
                  color: colors.primaryHover,
                }}
                onClick={handleShuffle}
                onMouseEnter={() => handleMouseEnter("shuffle")}
                onMouseLeave={() => handleMouseLeave("shuffle")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-shuffle-icon lucide-shuffle"
                >
                  <path d="m18 14 4 4-4 4" />
                  <path d="m18 2 4 4-4 4" />
                  <path d="M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22" />
                  <path d="M2 6h1.972a4 4 0 0 1 3.6 2.2" />
                  <path d="M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45" />
                </svg>
              </button>
            </div>
          </>
        ) : (
          <p style={{ textAlign: "center", color: "#64748b" }}>
            No flashcards available
          </p>
        )}
      </div>

      {/* Update Flashcard Modal */}
      {showUpdateModal && (
        <div style={updateModalOverlayStyle}>
          <div
            style={{
              ...updateModalContentStyle,
              maxWidth: "600px",
              width: "90%",
              padding: "2rem",
              borderRadius: "12px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
            }}
          >
            <div
              style={{
                ...updateModalHeaderStyle,
                fontSize: "1.5rem",
                fontWeight: "600",
                marginBottom: "1.5rem",
                color: colors.primary,
                paddingBottom: "0.5rem",
                borderBottom: `1px solid ${colors.border}`,
              }}
            >
              Update Flashcard
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  color: colors.textDark,
                  fontSize: "1rem",
                  fontWeight: "500",
                }}
              >
                Question
              </label>
              <textarea
                placeholder="Enter your question..."
                value={updateData.question}
                onChange={(e) =>
                  setUpdateData({ ...updateData, question: e.target.value })
                }
                style={{
                  ...inputStyle,
                  minHeight: "100px",
                  resize: "vertical",
                  padding: "0.75rem",
                  borderRadius: "8px",
                  border: `1px solid ${colors.border}`,
                  width: "100%",
                  boxSizing: "border-box",
                  fontSize: "0.95rem",
                  transition: "border 0.2s ease",
                  ":focus": {
                    outline: "none",
                    borderColor: colors.primary,
                    boxShadow: `0 0 0 2px ${colors.primary}20`,
                  },
                }}
              />
            </div>

            <div style={{ marginBottom: "2rem" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  color: colors.textDark,
                  fontSize: "1rem",
                  fontWeight: "500",
                }}
              >
                Answer
              </label>
              <textarea
                placeholder="Enter the answer..."
                value={updateData.answer}
                onChange={(e) =>
                  setUpdateData({ ...updateData, answer: e.target.value })
                }
                style={{
                  ...inputStyle,
                  minHeight: "100px",
                  resize: "vertical",
                  padding: "0.75rem",
                  borderRadius: "8px",
                  border: `1px solid ${colors.border}`,
                  width: "100%",
                  boxSizing: "border-box",
                  fontSize: "0.95rem",
                  transition: "border 0.2s ease",
                  ":focus": {
                    outline: "none",
                    borderColor: colors.primary,
                    boxShadow: `0 0 0 2px ${colors.primary}20`,
                  },
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "1rem",
                marginTop: "1rem",
              }}
            >
              <button
                style={{
                  ...cancelButtonStyle,
                  padding: "0.75rem 1.5rem",
                  borderRadius: "8px",
                  border: `1px solid ${colors.border}`,
                  background: "transparent",
                  color: colors.textDark,
                  fontWeight: "500",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  ":hover": {
                    background: colors.backgroundLight,
                  },
                }}
                onClick={() => setShowUpdateModal(false)}
              >
                Cancel
              </button>
              <button
                style={{
                  minWidth: "120px",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "8px",
                  border: "none",
                  background:
                    !updateData.question.trim() || !updateData.answer.trim()
                      ? colors.disabled
                      : colors.primary,
                  color: "white",
                  fontWeight: "500",
                  cursor:
                    !updateData.question.trim() || !updateData.answer.trim()
                      ? "not-allowed"
                      : "pointer",
                  transition: "all 0.2s ease",
                  opacity:
                    !updateData.question.trim() || !updateData.answer.trim()
                      ? 0.7
                      : 1,
                  ":hover": {
                    background:
                      !updateData.question.trim() || !updateData.answer.trim()
                        ? colors.disabled
                        : colors.primaryDark,
                    transform:
                      !updateData.question.trim() || !updateData.answer.trim()
                        ? "none"
                        : "translateY(-1px)",
                  },
                  ":active": {
                    transform: "translateY(0)",
                  },
                }}
                onClick={async () => {
                  if (!updateData.question.trim() || !updateData.answer.trim())
                    return;
                  const updatedCard = {
                    question: updateData.question,
                    answer: updateData.answer,
                  };
                  const id = flashcards[currentIndex]._id;
                  await axios.put(`${baseURL}/${id}`, updatedCard);
                  setShowUpdateModal(false);
                  fetchFlashcards();
                }}
                disabled={
                  !updateData.question.trim() || !updateData.answer.trim()
                }
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
