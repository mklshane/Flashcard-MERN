import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

/**
 * Modern color palette for consistent styling
 */
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
};

/**
 * Component Styles
 * Organized by component sections
 */
const styles = {
  // Main container styles
  container: {
    fontFamily: "'Inter', sans-serif",
    padding: "0 20px 40px",
    backgroundColor: colors.background,
    minHeight: "100vh",
  },

  // Navigation bar styles
  navBar: {
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
  },

  navTitle: {
    fontSize: "1.25rem",
    color: colors.textDark,
    fontWeight: "700",
    margin: 0,
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },

  navButton: {
    padding: "8px 16px",
    fontSize: "0.875rem",
    fontFamily: "'Inter', sans-serif",
    borderRadius: "8px",
    backgroundColor: colors.primary,
    color: "white",
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },

  // Decks container styles
  decksContainer: {
    maxWidth: "1200px",
    margin: "0 auto",
    paddingTop: "80px",
  },

  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "32px",
  },

  header: {
    color: colors.textDark,
    fontSize: "2rem",
    fontWeight: "700",
    margin: 0,
  },

  // Deck grid and card styles
  decksGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "24px",
  },

  deckCard: {
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
    position: "relative",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: `0 6px 12px ${colors.shadow}`,
    },
  },

  deckTitle: {
    fontSize: "1.25rem",
    fontWeight: "600",
    marginBottom: "12px",
    color: colors.textDark,
  },

  deckDescription: {
    fontSize: "0.95rem",
    color: colors.textMedium,
    lineHeight: "1.5",
    flexGrow: 1,
  },

  // Button styles
  button: {
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
  },

  cancelButton: {
    backgroundColor: colors.border,
    color: colors.textDark,
  },

  // Empty state and loading styles
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 20px",
    textAlign: "center",
    color: colors.textMedium,
  },

  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "200px",
  },

  spinner: {
    width: "40px",
    height: "40px",
    border: `4px solid ${colors.border}`,
    borderTop: `4px solid ${colors.primary}`,
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },

  // Modal styles
  modalOverlay: {
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
    backdropFilter: "blur(2px)",
  },

  modalContent: {
    backgroundColor: colors.cardBg,
    padding: "32px",
    borderRadius: "12px",
    width: "90%",
    maxWidth: "500px",
    boxShadow: `0 10px 25px ${colors.shadow}`,
    maxHeight: "90vh",
    overflowY: "auto",
  },

  modalHeader: {
    marginBottom: "24px",
    color: colors.textDark,
    fontSize: "1.5rem",
    fontWeight: "600",
  },

  // Form input styles
  input: {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "8px",
    border: `1px solid ${colors.border}`,
    fontSize: "1rem",
    marginBottom: "16px",
    boxSizing: "border-box",
  },

  textarea: {
    minHeight: "100px",
    resize: "vertical",
    fontFamily: "'Inter', sans-serif",
  },

  modalFooter: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
    marginTop: "24px",
  },

  // Delete button styles
  deleteButton: {
    position: "absolute",
    bottom: "13px",
    right: "12px",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: colors.textLight,
    transition: "color 0.2s ease",
    padding: "4px",
    borderRadius: "4px",
    "&:hover": {
      color: "#ef4444", // Red color on hover
    },
  },

  cardCount: {
    marginTop: "16px",
    color: colors.textLight,
    fontSize: "0.85rem",
    bottom: "22px",
    position: "absolute",
  },

  // Add these to your styles object
  profileCircle: {
    width: "35px",
    height: "35px",
    borderRadius: "50%",
    backgroundColor: colors.primary,
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    position: "relative",
  },

  profileDropdown: {
    position: "absolute",
    top: "50px",
    right: "0",
    backgroundColor: colors.cardBg,
    borderRadius: "8px",
    boxShadow: `0 4px 6px ${colors.shadow}`,
    width: "200px",
    overflow: "hidden",
    zIndex: 1001,
  },

  dropdownItem: {
    padding: "12px 16px",
    color: colors.textDark,
    cursor: "pointer",
    transition: "background-color 0.2s",
    "&:hover": {
      backgroundColor: colors.background,
    },
  },

  dropdownDivider: {
    height: "1px",
    backgroundColor: colors.border,
    margin: "4px 0",
  },
};

/**
 * Utility function to delete a deck
 * @param {string} deckId - ID of the deck to delete
 * @param {Event} e - Click event
 */

const deleteDeck = async (deckId, e) => {
  e.stopPropagation();
  try {
    if (window.confirm("Are you sure you want to delete this deck?")) {
      await axios.delete(`http://localhost:5000/api/decks/${deckId}`, {
        withCredentials: true, // This is crucial for session auth
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
  const [userInitial, setUserInitial] = useState("");
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const userId = localStorage.getItem("userId");
        const response = await axios.get(
          "http://localhost:5000/api/user/data",
          {
            withCredentials: true,
            headers: {
              "x-user-id": userId,
            },
          }
        );

        if (response.data.success) {
          const { name } = response.data.userData;
          setUserData(response.data.userData);
          setUserInitial(name ? name.charAt(0).toUpperCase() : "?");
        } else {
          throw new Error(response.data.message || "Failed to fetch user data");
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setUserData(null);
        setUserInitial("!");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true }
      );
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
      alert("Logout failed. Please try again.");
    }
  };

  // Click outside handler to close dropdown
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
        style={styles.profileCircle}
        onClick={() => setIsOpen(!isOpen)}
        title={userData?.name || "Profile"}
      >
        {isLoading ? (
          <div style={styles.spinner} />
        ) : (
          <span style={{ fontWeight: "bold" }}>{userInitial}</span>
        )}
      </div>

      {isOpen && (
        <div style={styles.profileDropdown}>
          <div style={styles.dropdownItem}>
            {userData?.name || "User"}
            {userData?.isVerified && (
              <span style={{ marginLeft: "8px", color: colors.primary }}>
                ✓
              </span>
            )}
          </div>
          <div style={styles.dropdownDivider}></div>
          <div style={styles.dropdownItem} onClick={handleLogout}>
            Logout
          </div>
        </div>
      )}
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
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  

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
        const res = await fetch("http://localhost:5000/api/auth/check", {
          credentials: "include",
        });
        if (!res.ok) navigate("/");
      } catch (error) {
        navigate("/");
      }
    };
    checkAuth();
  }, [navigate]);


  const fetchDecks = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log("Fetching decks..."); // Debug log
      const res = await fetch("http://localhost:5000/api/decks", {
        method: "GET",
        credentials: "include",
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "Cache-Control": "no-cache", // Prevent caching issues
        },
      });

      console.log("Response status:", res.status); // Debug log

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error("Error response:", errorData); // Debug log

        if (res.status === 401) {
          localStorage.removeItem("token"); // Clear any stale tokens
          navigate("/");
          throw new Error("Session expired. Please login again.");
        }
        throw new Error(errorData.message || "Failed to fetch decks");
      }

      const data = await res.json();
      setDecks(data.data || []); // Handle both response formats
    } catch (err) {
      console.error("Error fetching decks:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  

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
      });
      handleCloseModal();
      fetchDecks(); // Refresh decks instead of reloading
    } catch (err) {
      console.error("Error creating deck:", err);
      setError("Failed to create deck. Please try again.");
    } finally {
      setIsCreating(false);
    }
  };

  

  return (
    <div style={styles.container}>
      <div style={styles.navBar}>
        <div style={styles.navTitle}>WeFlash</div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <button onClick={handleCreateDeck} style={styles.navButton}>
            New Deck
          </button>
         <ProfileDropdown /> 
        </div>
      </div>

      <div style={styles.decksContainer}>
        <div style={styles.headerContainer}>
          <h1 style={styles.header}>Your Decks</h1>
        </div>

        {loading ? (
          <div style={styles.loading}>
            <div style={styles.spinner}></div>
          </div>
        ) : error ? (
          <div style={styles.emptyState}>
            <p>{error}</p>
          </div>
        ) : decks.length === 0 ? (
          <div style={styles.emptyState}>
            <h3 style={{ color: colors.textDark, marginBottom: "8px" }}>
              No decks yet
            </h3>
            <p style={{ marginBottom: "24px" }}>
              Create your first deck to get started
            </p>
            <button onClick={handleCreateDeck} style={styles.button}>
              Create Deck
            </button>
          </div>
        ) : (
          <div style={styles.decksGrid}>
            {decks.map((deck) => (
              <div
                key={deck._id}
                style={styles.deckCard}
                onClick={() => handleDeckClick(deck._id)}
              >
                <div style={styles.deckTitle}>{deck.title}</div>
                <div style={styles.deckDescription}>{deck.description}</div>
                <div style={styles.cardCount}>
                  0 cards
                  {/* {deck.flashcards.length} cards */}
                </div>
                <button
                  style={styles.deleteButton}
                  onClick={(e) => deleteDeck(deck._id, e)}
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
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h2 style={styles.modalHeader}>Create New Deck</h2>
            <form onSubmit={handleSubmit}>
              <input
                name="title"
                placeholder="Deck Title"
                value={newDeck.title}
                onChange={handleInputChange}
                required
                style={styles.input}
              />
              <textarea
                name="description"
                placeholder="Description (optional)"
                value={newDeck.description}
                onChange={handleInputChange}
                style={{ ...styles.input, ...styles.textarea }}
              />
              <div style={styles.modalFooter}>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  style={{ ...styles.button, ...styles.cancelButton }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={styles.button}
                  disabled={isCreating}
                >
                  {isCreating ? "Creating..." : "Create Deck"}
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