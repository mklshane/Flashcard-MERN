import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

// Updated styles to match DeckPage
const containerStyle = {
  fontFamily: "'Inter', sans-serif",
  padding: "0 20px 80px",
  backgroundColor: "#f8fafc",
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
  backgroundColor: "#ffffff",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: 1000,
  height: "30px",
  borderBottom: "1px solid #e2e8f0",
};

const navTitleStyle = {
  fontSize: "1.25rem",
  color: "#1e293b",
  fontWeight: "700",
  margin: 0,
};

const backButtonStyle = {
  fontFamily: "'Inter', sans-serif",
  padding: "8px 16px",
  borderRadius: "8px",
  backgroundColor: "transparent",
  color: "#6366f1",
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
  gap: "16px",
  marginBottom: "32px",
};

const inputStyle = {
  fontFamily: "'Inter', sans-serif",
  padding: "12px 16px",
  borderRadius: "8px",
  border: "1px solid #e2e8f0",
  fontSize: "1rem",
  width: "100%",
  boxSizing: "border-box",
};

const questionCardStyle = {
  backgroundColor: "#ffffff",
  padding: "32px",
  borderRadius: "12px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
  border: "1px solid #e2e8f0",
  minHeight: "300px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  position: "relative",
};

const questionCounterStyle = {
  color: "#6366f1",
  fontSize: "0.9rem",
  marginBottom: "20px",
  fontWeight: "600",
};

const cardTextStyle = {
  fontSize: "1.25rem",
  color: "#1e293b",
  margin: "20px 0",
  flexGrow: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0 20px",
};

const answerTextStyle = {
  ...cardTextStyle,
  color: "#64748b",
  padding: "20px",
  backgroundColor: "#f8f9fa",
  borderRadius: "8px",
};

const buttonContainerStyle = {
  display: "flex",
  justifyContent: "center",
  gap: "16px",
  marginTop: "24px",
};

const buttonStyle = {
  fontFamily: "'Inter', sans-serif",
  padding: "12px 24px",
  borderRadius: "8px",
  backgroundColor: "#6366f1",
  color: "white",
  border: "none",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "1rem",
  transition: "all 0.3s ease",
  minWidth: "120px",
  "&:hover": {
    backgroundColor: "#4f46e5",
    transform: "translateY(-2px)",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
};

const secondaryButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#ef4444",
  "&:hover": {
    backgroundColor: "#dc2626",
  },
};

const arrowButtonStyle = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  color: "#6366f1",
  fontSize: "1.5rem",
  border: "none",
  cursor: "pointer",
  zIndex: 2,
  padding: "8px 12px",
  borderRadius: "50%",
  transition: "all 0.3s ease",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  "&:hover": {
    backgroundColor: "#6366f1",
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

function App() {
  // All the existing state and function logic remains exactly the same
  const { deckId } = useParams();
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [formData, setFormData] = useState({ question: "", answer: "" });
  const [error, setError] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isHovered, setIsHovered] = useState({});
  const baseURL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    if (!deckId) {
      setError("Deck not found.");
      return;
    }
    fetchFlashcards();

    const handleKeyDown = (e) => {
      if (flashcards.length === 0) return;

      const isInputField =
        e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA";

      if (e.key === "Enter" && isInputField) {
        e.preventDefault(); // Prevent form submission or any unwanted behavior
        return;
      }

      if (e.key === " " && !isInputField) {
        // Spacebar toggles answer visibility
        setShowAnswer((prev) => !prev);
      } else if (e.key === "ArrowLeft") {
        // ArrowLeft navigates to the previous card
        prevCard();
      } else if (e.key === "ArrowRight") {
        // ArrowRight navigates to the next card
        nextCard();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [deckId, flashcards]); // Added `flashcards` to ensure effect runs when flashcards are fetched

  const fetchFlashcards = async () => {
    try {
      const res = await axios.get(`${baseURL}/deck/${deckId}`);

      if (res.data.data) {
        setFlashcards(res.data.data);
      } else {
        setError("No flashcards available.");
      }
    } catch (err) {
      setError("Error fetching flashcards.");
    }
  };

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

  const handleCreate = async () => {
    if (!formData.question || !formData.answer) return;
    await axios.post(`${baseURL}`, {
      ...formData,
      deck: deckId,
    });
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

  const currentCard = flashcards[currentIndex];

  const handleMouseEnter = (buttonName) => {
    setIsHovered((prev) => ({ ...prev, [buttonName]: true }));
  };

  const handleMouseLeave = (buttonName) => {
    setIsHovered((prev) => ({ ...prev, [buttonName]: false }));
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
        <span style={navTitleStyle}>WeFlash</span>
        <div style={{ width: "100px" }}></div> {/* Spacer for balance */}
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
            <div style={questionCardStyle}>
              <div style={questionCounterStyle}>
                Card {currentIndex + 1} of {flashcards.length}
              </div>

              {showAnswer ? (
                <div style={answerTextStyle}>{currentCard.answer}</div>
              ) : (
                <div style={cardTextStyle}>{currentCard.question}</div>
              )}

              <div style={buttonContainerStyle}>
                <button
                  style={{
                    ...buttonStyle,
                    ...(isHovered.showAnswer
                      ? {
                          backgroundColor: "#4f46e5",
                          transform: "translateY(-2px)",
                          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        }
                      : {}),
                  }}
                  onClick={() => setShowAnswer(!showAnswer)}
                  onMouseEnter={() => handleMouseEnter("showAnswer")}
                  onMouseLeave={() => handleMouseLeave("showAnswer")}
                >
                  {showAnswer ? "Show Question" : "Show Answer"}
                </button>
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
            </div>

            <div style={buttonContainerStyle}>
              <button
                style={{
                  ...buttonStyle,
                  ...(isHovered.update
                    ? {
                        backgroundColor: "#4f46e5",
                        transform: "translateY(-2px)",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      }
                    : {}),
                }}
                onClick={() =>
                  navigate(`/decks/${deckId}/update/${currentCard._id}`)
                }
                onMouseEnter={() => handleMouseEnter("update")}
                onMouseLeave={() => handleMouseLeave("update")}
              >
                Update
              </button>
              <button
                style={{
                  ...secondaryButtonStyle,
                  ...(isHovered.delete
                    ? {
                        backgroundColor: "#dc2626",
                        transform: "translateY(-2px)",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      }
                    : {}),
                }}
                onClick={handleDelete}
                onMouseEnter={() => handleMouseEnter("delete")}
                onMouseLeave={() => handleMouseLeave("delete")}
              >
                Delete
              </button>
            </div>
          </>
        ) : (
          <p style={{ textAlign: "center", color: "#64748b" }}>
            No flashcards available
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
