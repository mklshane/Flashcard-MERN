import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

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

const formCardStyle = {
  backgroundColor: "white",
  borderRadius: "10px",
  padding: "40px",
  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
  width: "500px",
  maxWidth: "90%",
  textAlign: "center",
  margin: "20px 0",
};

const inputStyle = {
  fontFamily: "'Montserrat', sans-serif",
  padding: "12px 15px",
  margin: "10px 5px",
  width: "250px",
  backgroundColor: "#f7f7f7",
  borderRadius: "8px",
  border: "1px solid #ddd",
  fontSize: "1rem",
};

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

function UpdateCard() {
  const { deckId, id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ question: "", answer: "" });
  const [error, setError] = useState(null);
  const [isHovered, setIsHovered] = useState({});
  const baseURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios
      .get(`${baseURL}/${id}`)
      .then((res) => {
        if (res.data.success) {
          setFormData({
            question: res.data.data.question,
            answer: res.data.data.answer,
          });
        } else {
          setError("Flashcard not found.");
        }
      })
      .catch(() => {
        setError("Failed to fetch flashcard");
      });
  }, [id]);

  const handleSubmit = async () => {
    try {
      await axios.put(`${baseURL}/${id}`, formData);
      navigate(`/decks/${deckId}`);
    } catch {
      setError("Failed to update flashcard");
    }
  };

  const handleCancel = () => {
    navigate(`/decks/${deckId}`);
  };

  const handleMouseEnter = (buttonName) => {
    setIsHovered((prev) => ({ ...prev, [buttonName]: true }));
  };

  const handleMouseLeave = (buttonName) => {
    setIsHovered((prev) => ({ ...prev, [buttonName]: false }));
  };

  return (
    <div style={containerStyle}>
      <div style={formCardStyle}>
        <h2
          style={{ color: "#41549a", fontSize: "2rem", marginBottom: "30px" }}
        >
          Update Flashcard
        </h2>

        {error && (
          <p style={{ color: "red", fontWeight: "bold", marginBottom: "20px" }}>
            {error}
          </p>
        )}

        <input
          style={{ ...inputStyle, marginBottom: "15px" }}
          value={formData.question}
          onChange={(e) =>
            setFormData({ ...formData, question: e.target.value })
          }
          placeholder="Question"
        />
        <br />
        <input
          style={{ ...inputStyle, marginBottom: "30px" }}
          value={formData.answer}
          onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
          placeholder="Answer"
        />

        <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
          <button
            style={{
              ...buttonStyle,
              ...(isHovered.save ? buttonHoverStyle : {}),
            }}
            onClick={handleSubmit}
            onMouseEnter={() => handleMouseEnter("save")}
            onMouseLeave={() => handleMouseLeave("save")}
          >
            Save
          </button>
          <button
            style={{
              ...secondaryButtonStyle,
              ...(isHovered.cancel ? secondaryButtonHoverStyle : {}),
            }}
            onClick={handleCancel}
            onMouseEnter={() => handleMouseEnter("cancel")}
            onMouseLeave={() => handleMouseLeave("cancel")}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateCard;
