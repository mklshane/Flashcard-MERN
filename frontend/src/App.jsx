import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const containerStyle = {
  fontFamily: "Arial, sans-serif",
  padding: "20px",
  textAlign: "center",
};

const formStyle = {
  marginBottom: "30px",
};

const inputStyle = {
  padding: "10px",
  margin: "5px",
  width: "200px",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

const buttonStyle = (bg) => ({
  padding: "10px 20px",
  margin: "5px",
  borderRadius: "5px",
  backgroundColor: bg,
  color: "white",
  border: "none",
  cursor: "pointer",
});

const cardWrapper = {
  perspective: "1000px",
  margin: "0 auto",
  width: "300px",
  height: "150px",
  marginBottom: "50px",
};

const card = {
  width: "100%",
  height: "100%",
  position: "relative",
  transition: "transform 0.6s",
  transformStyle: "preserve-3d",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
};

const side = {
  position: "absolute",
  width: "100%",
  height: "100%",
  borderRadius: "10px",
  backfaceVisibility: "hidden",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
  fontSize: "1.2rem",
};

const back = {
  transform: "rotateY(180deg)",
};

const controls = {
  display: "flex",
  justifyContent: "center",
  gap: "10px",
  flexWrap: "wrap",
};


function App() {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [formData, setFormData] = useState({ question: "", answer: "" });
  const [error, setError] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const baseURL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();


  useEffect(() => {
    fetchFlashcards();
  }, []);

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

  const handleCreate = async () => {
    try {
      if (!formData.question || !formData.answer) return;
      await axios.post(baseURL, formData);
      setFormData({ question: "", answer: "" });
      fetchFlashcards();
    } catch (err) {
      setError("Error creating flashcard.");
    }
  };

  const handleUpdate = async () => {
    try {
      const id = flashcards[currentIndex]._id;
      if (!formData.question || !formData.answer) return;
      await axios.put(`${baseURL}/${id}`, formData);
      setFormData({ question: "", answer: "" });
      fetchFlashcards();
      setIsFlipped(false);
    } catch (err) {
      setError("Error updating flashcard.");
    }
  };

  const handleDelete = async () => {
    try {
      const id = flashcards[currentIndex]._id;
      await axios.delete(`${baseURL}/${id}`);
      fetchFlashcards();
      setIsFlipped(false);
    } catch (err) {
      setError("Error deleting flashcard.");
    }
  };

  const nextCard = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  const currentCard = flashcards[currentIndex];

  return (
    <div style={containerStyle}>
      <h1>Flashcard App</h1>

      {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}

      <div style={formStyle}>
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
          onClick={handleCreate}
          disabled={!formData.question || !formData.answer}
          style={buttonStyle("#4CAF50")}
        >
          Create
        </button>
      </div>

      {currentCard ? (
        <>
          <div style={cardWrapper} onClick={() => setIsFlipped(!isFlipped)}>
            <div
              style={{
                ...card,
                transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
            >
              {/* Front */}
              <div style={{ ...side, backgroundColor: "#2a9d8f" }}>
                <h3>{currentCard.question}</h3>
              </div>
              {/* Back */}
              <div
                style={{
                  ...side,
                  ...back,
                  backgroundColor: "#2a9d8f",
                  color: "white",
                }}
              >
                <p>{currentCard.answer}</p>
              </div>
            </div>
          </div>

          <div style={controls}>
            <button onClick={nextCard} style={buttonStyle("#2196F3")}>
              Next
            </button>
            <button
              onClick={() => navigate(`/update/${currentCard._id}`)}
              style={buttonStyle("#FFA500")}
            >
              Update
            </button>

            <button onClick={handleDelete} style={buttonStyle("#f44336")}>
              Delete
            </button>
          </div>
        </>
      ) : (
        <p>No flashcards available.</p>
      )}
    </div>
  );
}

export default App;
