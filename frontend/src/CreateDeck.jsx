import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const baseURL = "http://localhost:5000/api";

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

// Form card style
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

// Input style
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

// Navbar style
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
  height: "50px",
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

function CreateDeck() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [error, setError] = useState(null);
  const [isHovered, setIsHovered] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Attempting to post to:", `${baseURL}/decks`); // Add this
    console.log("With data:", formData); // And this
    try {
      await axios.post(`${baseURL}/decks`, formData);
      navigate("/decks");
    } catch (err) {
      setError("Failed to create deck");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleMouseEnter = (element) => {
    setIsHovered((prev) => ({ ...prev, [element]: true }));
  };

  const handleMouseLeave = (element) => {
    setIsHovered((prev) => ({ ...prev, [element]: false }));
  };

  return (
    <div style={containerStyle}>
      <div style={navBarStyle}>
        <button
          style={{
            ...backArrowStyle,
            ...(isHovered.back ? { backgroundColor: "#f0f0f0" } : {}),
          }}
          onClick={() => navigate("/decks")}
          onMouseEnter={() => handleMouseEnter("back")}
          onMouseLeave={() => handleMouseLeave("back")}
        >
          ⟨
        </button>
        <h2 style={{ color: "#41549a", fontSize: "1.8rem", margin: 0 }}>
          Create New Deck
        </h2>
      </div>

      <div style={formCardStyle}>
        {error && (
          <p style={{ color: "red", fontWeight: "bold", marginBottom: "20px" }}>
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Deck title"
            style={{ ...inputStyle, marginBottom: "15px" }}
            required
            autoFocus
          />
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description (optional)"
            style={{ ...inputStyle, marginBottom: "25px" }}
          />
          <button
            type="submit"
            style={{
              ...buttonStyle,
              ...(isHovered.submit ? buttonHoverStyle : {}),
              opacity: !formData.title ? 0.6 : 1,
              cursor: !formData.title ? "not-allowed" : "pointer",
            }}
            disabled={!formData.title}
            onMouseEnter={() => handleMouseEnter("submit")}
            onMouseLeave={() => handleMouseLeave("submit")}
          >
            Create Deck
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateDeck;
