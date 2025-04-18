import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Container style
const containerStyle = {
  fontFamily: "'Montserrat', sans-serif",
  padding: "20px",
  textAlign: "center",
  backgroundColor: "#f0f4f8",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
};

// Question card style
const questionCardStyle = {
  backgroundColor: "white",
  borderRadius: "10px",
  padding: "40px",
  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
  width: "500px",
  maxWidth: "90%",
  textAlign: "center",
  margin: "20px 0",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  minHeight: "300px",
};

const navBarStyle = {
  width: "100%",
  padding: "15px 20px",
  backgroundColor: "#ffffff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: 1000,
  height: "30px", // Added fixed height for consistency
};

const navTitleStyle = {
  fontSize: "1.8rem",
  color: "#000000",
  fontWeight: "bold",
  cursor: "pointer",
};

const backArrowStyle = {
  backgroundColor: "transparent",
  color: "#6c63ff",
  fontSize: "1.5rem",
  border: "none",
  cursor: "pointer",
  padding: "5px 10px",
  borderRadius: "50%",
  transition: "all 0.3s ease",
  position: "absolute",
  left: "20px",
};

const inputContainerStyle = {
  marginTop: "70px", // Increased space between navbar and inputs
  marginBottom: "20px",
};

const questionCounterStyle = {
  color: "#6c63ff",
  fontSize: "1rem",
  marginBottom: "20px",
  fontWeight: "bold",
};

const questionTextStyle = {
  fontSize: "1.5rem",
  color: "#333",
  margin: "20px 0",
  flexGrow: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0 20px",
};

const answerTextStyle = {
  fontSize: "1.2rem",
  color: "#555",
  margin: "20px 0",
  padding: "20px",
  backgroundColor: "#f8f9fa",
  borderRadius: "10px",
  flexGrow: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

// Button styles
const buttonStyle = {
  fontFamily: "'Montserrat', sans-serif",
  padding: "12px 25px",
  margin: "10px",
  borderRadius: "8px",
  backgroundColor: "#6c63ff",
  color: "white",
  border: "none",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "1rem",
  minWidth: "120px",
  transition: "all 0.3s ease",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};

const buttonHoverStyle = {
  backgroundColor: "#5a52d6",
  transform: "translateY(-2px)",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
};

const secondaryButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#ed4672",
};

const secondaryButtonHoverStyle = {
  ...buttonHoverStyle,
  backgroundColor: "#d13a62",
};

// Arrow button styles
const arrowButtonStyle = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  backgroundColor: "rgba(0, 0, 0, 0)",
  color: "#6c63ff",
  fontSize: "1.5rem",
  border: "none",
  cursor: "pointer",
  zIndex: 2,
  padding: "10px 15px",
  borderRadius: "50%",
  transition: "all 0.3s ease",
};

const leftArrowStyle = {
  ...arrowButtonStyle,
  left: "10px",
};

const rightArrowStyle = {
  ...arrowButtonStyle,
  right: "10px",
};

// Form input style
const inputStyle = {
  fontFamily: "'Montserrat', sans-serif",
  padding: "12px 15px",
  margin: "10px 5px",
  width: "250px",
  backgroundColor: "#f7f7f7",
  borderRadius: "8px",
  border: "1px solid #ddd",
  fontSize: "1rem",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};

function App() {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [formData, setFormData] = useState({ question: "", answer: "" });
  const [error, setError] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isHovered, setIsHovered] = useState({});
  const baseURL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    fetchFlashcards();

    const handleKeyDown = (e) => {
      if (flashcards.length === 0) return;

      const isInputField =
        e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA";

      if (e.key === "Enter" && isInputField) {
        e.preventDefault();
        return;
      }

      if (e.key === " " && !isInputField) {
        setShowAnswer(!showAnswer);
      }
      if (e.key === "ArrowLeft") prevCard();
      if (e.key === "ArrowRight") nextCard();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [flashcards, showAnswer]);

  const fetchFlashcards = async () => {
    try {
      const res = await axios.get(baseURL);
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
    await axios.post(baseURL, formData);
    setFormData({ question: "", answer: "" });
    fetchFlashcards();
  };

  const handleDelete = async () => {
    const id = flashcards[currentIndex]._id;
    await axios.delete(`${baseURL}/${id}`);
    fetchFlashcards();
    setShowAnswer(false);
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
            ...backArrowStyle,
            ...(isHovered.back ? { backgroundColor: "#f0f0f0" } : {}),
          }}
          onClick={() => navigate("/")}
          onMouseEnter={() => handleMouseEnter("back")}
          onMouseLeave={() => handleMouseLeave("back")}
        >
          ⟨
        </button>
        <span style={navTitleStyle}>WeFlash</span>
      </div>

      {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}

      <div style={inputContainerStyle}>
        <input
          placeholder="Question"
          value={formData.question}
          onChange={(e) =>
            setFormData({ ...formData, question: e.target.value })
          }
          style={inputStyle}
        />
        <input
          placeholder="Answer"
          value={formData.answer}
          onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
          style={inputStyle}
        />
        <button
          style={{
            ...buttonStyle,
            ...(isHovered.add ? buttonHoverStyle : {}),
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
          Add
        </button>
      </div>

      {currentCard ? (
        <div style={questionCardStyle}>
          <div style={questionCounterStyle}>
            Question {currentIndex + 1} of {flashcards.length}
          </div>

          {showAnswer ? (
            <div style={answerTextStyle}>{currentCard.answer}</div>
          ) : (
            <div style={questionTextStyle}>{currentCard.question}</div>
          )}

          <div
            style={{
              marginTop: "auto",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button
              style={{
                ...buttonStyle,
                ...(isHovered.showAnswer ? buttonHoverStyle : {}),
                margin: "10px",
              }}
              onClick={() => setShowAnswer(!showAnswer)}
              onMouseEnter={() => handleMouseEnter("showAnswer")}
              onMouseLeave={() => handleMouseLeave("showAnswer")}
            >
              {showAnswer ? "Hide Answer" : "Show Answer"}
            </button>
          </div>

          <button
            style={{
              ...leftArrowStyle,
              ...(isHovered.prev ? { backgroundColor: "#f0f0f0" } : {}),
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
              ...(isHovered.next ? { backgroundColor: "#f0f0f0" } : {}),
            }}
            onClick={nextCard}
            onMouseEnter={() => handleMouseEnter("next")}
            onMouseLeave={() => handleMouseLeave("next")}
          >
            ⟩
          </button>
        </div>
      ) : (
        <p>No flashcards available.</p>
      )}

      {currentCard && (
        <div style={{ display: "flex", gap: "20px", marginTop: "5px" }}>
          <button
            style={{
              ...secondaryButtonStyle,
              ...(isHovered.update ? secondaryButtonHoverStyle : {}),
            }}
            onClick={() => navigate(`/update/${currentCard._id}`)}
            onMouseEnter={() => handleMouseEnter("update")}
            onMouseLeave={() => handleMouseLeave("update")}
          >
            Update
          </button>
          <button
            style={{
              ...secondaryButtonStyle,
              ...(isHovered.delete ? secondaryButtonHoverStyle : {}),
            }}
            onClick={handleDelete}
            onMouseEnter={() => handleMouseEnter("delete")}
            onMouseLeave={() => handleMouseLeave("delete")}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
