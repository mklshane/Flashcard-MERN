import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles/Deck.css";
import { auth } from "./config/firebase";
import { signOut } from "firebase/auth";

const getAuthHeaders = () => {
  const firebaseToken = localStorage.getItem("firebaseToken");
  const userId = localStorage.getItem("userId");

  if (firebaseToken) {
    return {
      Authorization: `Bearer ${firebaseToken}`,
    };
  } else if (userId) {
    return {
      "x-user-id": userId,
    };
  } else {
    return {};
  }
};
const deleteDeck = async (deckId, e) => {
  e.stopPropagation();
  try {
    if (window.confirm("Are you sure you want to delete this deck?")) {
      await axios.delete(`http://localhost:5000/api/decks/${deckId}`, {
        withCredentials: true,
        headers: getAuthHeaders(),
      });
      window.location.reload();
    }
  } catch (err) {
    console.error("Error deleting deck:", err);
    alert("Failed to delete deck. Please try again.");
  }
};

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userInitial, setUserInitial] = useState("?");
  const [displayName, setDisplayName] = useState("User");
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const name = user.displayName || "User";
      setDisplayName(name);
      setUserInitial(name.charAt(0).toUpperCase());
    }
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("firebaseToken");
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
      alert("Logout failed. Please try again.");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest("[data-profile-dropdown]")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div style={{ position: "relative" }} data-profile-dropdown>
      <div
        className="profile-circle"
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        aria-label={`Toggle profile menu for ${displayName}`}
        aria-expanded={isOpen}
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          backgroundColor: "#6366F1", // Indigo
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
          fontSize: "1rem",
          cursor: "pointer",
        }}
      >
        {userInitial}
      </div>

      <div className={`profile-dropdown ${isOpen ? "show" : ""}`}>
        <div className="dropdown-item" role="menuitem">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          {displayName}
        </div>

        <div className="dropdown-divider" />

        <div
          className="dropdown-item"
          onClick={handleLogout}
          role="menuitem"
          aria-label="Logout"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Logout
        </div>
      </div>
    </div>
  );
};


function DeckPage() {
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newDeck, setNewDeck] = useState({ title: "", description: "" });
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchDecks();
  }, []);

  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/auth-check", {
          headers: {
            ...getAuthHeaders(),
          },
          credentials: "include",
        });

        if (!res.ok) throw new Error("Not authorized");
      } catch (error) {
        localStorage.removeItem("userId");
        navigate("/");
      }
    };

    checkAuth();
  }, [navigate]);

  const fetchDecks = async () => {
    try {
      setLoading(true);
      setError(null);
      const decksRes = await fetch("http://localhost:5000/api/decks", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          ...getAuthHeaders(),
        },
      });

      if (!decksRes.ok) {
        const errorData = await decksRes.json().catch(() => ({}));
        if (decksRes.status === 401) {
          localStorage.removeItem("userId");
          navigate("/");
          throw new Error("Session expired. Please login again.");
        }
        throw new Error(errorData.message || "Failed to fetch decks");
      }

      const decksData = await decksRes.json();
      const decksArray = decksData.data || [];

      const decksWithCounts = await Promise.all(
        decksArray.map(async (deck) => {
          try {
            const flashcardsRes = await fetch(
              `http://localhost:5000/api/flashcards/deck/${deck._id}`,
              {
                credentials: "include",
                headers: getAuthHeaders(),
              }
            );
            if (flashcardsRes.ok) {
              const flashcardsData = await flashcardsRes.json();
              return { ...deck, cardCount: flashcardsData.data?.length || 0 };
            }
            return { ...deck, cardCount: 0 };
          } catch (err) {
            console.error(
              `Error fetching flashcards for deck ${deck._id}:`,
              err
            );
            return { ...deck, cardCount: 0 };
          }
        })
      );
      setDecks(decksWithCounts);
    } catch (err) {
      console.error("Error fetching decks:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredDecks = decks.filter((deck) =>
    deck.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsCreating(true);
      await axios.post("http://localhost:5000/api/decks", newDeck, {
        withCredentials: true,
        headers: getAuthHeaders(),
      });
      handleCloseModal();
      fetchDecks();
    } catch (err) {
      console.error("Error creating deck:", err);
      setError("Failed to create deck. Please try again.");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="deck-container">
      <div className="nav-bar">
        <div
          className="nav-title"
          onClick={() => navigate("/decks")}
          role="button"
          aria-label="Navigate to Decks"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <line x1="3" y1="9" x2="21" y2="9" />
            <line x1="9" y1="21" x2="9" y2="9" />
          </svg>
          WeFlash
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <button
            onClick={handleCreateDeck}
            className="nav-button"
            role="button"
            aria-label="Create New Deck"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            New Deck
          </button>
          <ProfileDropdown />
        </div>
      </div>

      <div className="decks-container">
        <div className="header-container">
          <h1 className="header">Your Decks</h1>
          <div className="search-container">
            <svg
              className="search-icon"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search decks..."
              className="search-bar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search decks"
            />
          </div>
        </div>

        {loading ? (
          <div className="loading">
            <div className="spinner" role="status" aria-label="Loading decks" />
          </div>
        ) : error ? (
          <div className="empty-state" role="alert">
            <svg
              className="empty-state-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <h3 style={{ color: "var(--text-dark)", marginBottom: "0.5rem" }}>
              Error Loading Decks
            </h3>
            <p style={{ marginBottom: "1.5rem" }}>{error}</p>
            <button
              onClick={fetchDecks}
              className="button"
              style={{ backgroundColor: "var(--error)" }}
              role="button"
              aria-label="Retry loading decks"
            >
              Retry
            </button>
          </div>
        ) : filteredDecks.length === 0 ? (
          <div className="empty-state">
            <svg
              className="empty-state-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path d="M3 3h18v18H3z" />
              <path d="M3 9h18" />
              <path d="M9 9v12" />
            </svg>
            <h3 style={{ color: "var(--text-dark)", marginBottom: "0.5rem" }}>
              {searchTerm ? "No matching decks" : "No decks yet"}
            </h3>
            <p style={{ marginBottom: "1.5rem" }}>
              {searchTerm
                ? "Try a different search term"
                : "Create your first deck to get started"}
            </p>
            <button
              onClick={handleCreateDeck}
              className="button"
              role="button"
              aria-label="Create new deck"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                style={{ marginRight: "0.5rem" }}
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Create Deck
            </button>
          </div>
        ) : (
          <div className="decks-grid">
            {filteredDecks.map((deck) => (
              <div
                key={deck._id}
                className="deck-card"
                onClick={() => handleDeckClick(deck._id)}
                role="button"
                tabIndex={0}
                aria-label={`View deck: ${deck.title}`}
                onKeyDown={(e) =>
                  e.key === "Enter" && handleDeckClick(deck._id)
                }
              >
                <div className="deck-card-header">
                  <h3 className="deck-title">{deck.title}</h3>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    style={{ flexShrink: 0 }}
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <line x1="3" y1="9" x2="21" y2="9" />
                    <line x1="9" y1="21" x2="9" y2="9" />
                  </svg>
                </div>
                <p className="deck-description">
                  {deck.description || "No description provided"}
                </p>
                <div className="deck-stats">
                  <span className="stat-badge">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <line x1="3" y1="9" x2="21" y2="9" />
                      <line x1="9" y1="21" x2="9" y2="9" />
                    </svg>
                    {deck.cardCount || 0} cards
                  </span>
                </div>
                <button
                  className="delete-button"
                  onClick={(e) => deleteDeck(deck._id, e)}
                  title={`Delete deck: ${deck.title}`}
                  aria-label={`Delete deck: ${deck.title}`}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal-content">
            <h2 className="modal-header">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Create New Deck
            </h2>
            <form onSubmit={handleSubmit}>
              <label
                htmlFor="title"
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontSize: "0.875rem",
                  color: "var(--text-dark)",
                  fontWeight: 500,
                  cursor: "default",
                }}
              >
                Deck Title
              </label>
              <input
                id="title"
                name="title"
                placeholder="Enter deck title"
                value={newDeck.title}
                onChange={handleInputChange}
                required
                className="input"
                autoFocus
                aria-required="true"
              />
              <label
                htmlFor="description"
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontSize: "0.875rem",
                  color: "var(--text-dark)",
                  fontWeight: 500,
                  cursor: "default",
                }}
              >
                Description (optional)
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="Enter deck description"
                value={newDeck.description}
                onChange={handleInputChange}
                className="input textarea"
              />
              <div className="modal-footer">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="cancel-button"
                  aria-label="Cancel deck creation"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="button"
                  style={{
                    opacity: isCreating ? 0.8 : 1,
                    pointerEvents: isCreating ? "none" : "auto",
                  }}
                  disabled={isCreating}
                  aria-label={isCreating ? "Creating deck" : "Create deck"}
                >
                  {isCreating ? (
                    <>
                      <svg
                        style={{
                          marginRight: "0.5rem",
                          animation: "spin 1s linear infinite",
                        }}
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M12 2V6M12 18V22M6 12H2M22 12H18M19.0784 19.0784L16.25 16.25M19.0784 4.99994L16.25 7.82837M4.92157 19.0784L7.75 16.25M4.92157 4.99994L7.75 7.82837"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
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
    </div>
  );
}

export default DeckPage;
