import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
};

// Styles
const containerStyle = {
  fontFamily: "'Inter', sans-serif",
  padding: "0 20px 40px",
  backgroundColor: colors.background,
  minHeight: "100vh",
};

const decksContainerStyle = {
  maxWidth: "1200px",
  margin: "0 auto",
  paddingTop: "80px",
};

const headerContainerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "32px",
};

const headerStyle = {
  color: colors.textDark,
  fontSize: "2rem",
  fontWeight: "700",
  margin: 0,
};

const decksGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: "24px",
};

const deckCardStyle = {
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
};

const deckTitleStyle = {
  fontSize: "1.25rem",
  fontWeight: "600",
  marginBottom: "12px",
  color: colors.textDark,
};

const deckDescriptionStyle = {
  fontSize: "0.95rem",
  color: colors.textMedium,
  lineHeight: "1.5",
  flexGrow: 1,
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
  display: "flex",
  alignItems: "center",
  gap: "8px",
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
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

const navButtonStyle = {
  ...buttonStyle,
  padding: "8px 16px",
  fontSize: "0.875rem",
};

const emptyStateStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "40px 20px",
  textAlign: "center",
  color: colors.textMedium,
};

const loadingStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "200px",
};

const spinnerStyle = {
  width: "40px",
  height: "40px",
  border: `4px solid ${colors.border}`,
  borderTop: `4px solid ${colors.primary}`,
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
};

function DeckPage() {
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/decks");
        const decksWithFlashcards = await Promise.all(
          response.data.data.map(async (deck) => {
            try {
              const flashcardsRes = await axios.get(
                `http://localhost:5000/api/flashcards/deck/${deck._id}`
              );

              return {
                ...deck,
                flashcards: flashcardsRes.data.data || [],
              };
            } catch (err) {
              console.error(`Error fetching flashcards for deck ${deck._id}:`, err);
              return {
                ...deck,
                flashcards: [],
              };
            }
          })
        );
        setDecks(decksWithFlashcards);
      } catch (err) {
        console.error("Error fetching decks:", err);
        setError("Failed to load decks. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDecks();
  }, []);

  const handleDeckClick = (id) => {
    navigate(`/decks/${id}`);
  };

  const handleCreateDeck = () => {
    navigate("/create-deck");
  };

  return (
    <div style={containerStyle}>
      <div style={navBarStyle}>
        <div style={navTitleStyle}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
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
        <button onClick={handleCreateDeck} style={navButtonStyle}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
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

      <div style={decksContainerStyle}>
        <div style={headerContainerStyle}>
          <h1 style={headerStyle}>Your Decks</h1>
        </div>

        {loading ? (
          <div style={loadingStyle}>
            <div style={spinnerStyle}></div>
          </div>
        ) : error ? (
          <div style={emptyStateStyle}>
            <p>{error}</p>
          </div>
        ) : decks.length === 0 ? (
          <div style={emptyStateStyle}>
            <h3 style={{ color: colors.textDark, marginBottom: "8px" }}>
              No decks yet
            </h3>
            <p style={{ marginBottom: "24px" }}>
              Create your first deck to get started
            </p>
            <button onClick={handleCreateDeck} style={buttonStyle}>
              Create Deck
            </button>
          </div>
        ) : (
          <div style={decksGridStyle}>
            {decks.map((deck) => (
              <div
                key={deck._id}
                style={deckCardStyle}
                onClick={() => handleDeckClick(deck._id)}
              >
                <div style={deckTitleStyle}>{deck.title}</div>
                {deck.description && (
                  <div style={deckDescriptionStyle}>{deck.description}</div>
                )}
                <div
                  style={{
                    marginTop: "16px",
                    color: colors.textLight,
                    fontSize: "0.85rem",
                  }}
                >
                  {deck.flashcards.length}{" "}
                  {deck.flashcards.length === 1 || deck.flashcards.length === 0
                    ? "card"
                    : "cards"}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default DeckPage;
