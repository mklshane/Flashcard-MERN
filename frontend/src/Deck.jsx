import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const getAuthHeaders = () => {
  const userId = localStorage.getItem("userId");
  return userId ? { "x-user-id": userId } : {};
};


const colors = {
  primary: "#4F46E5",
  primaryHover: "#4338CA",
  primaryLight: "#E0E7FF",
  secondary: "#10B981",
  secondaryHover: "#0D9C6F",
  background: "#F9FAFB",
  cardBg: "#FFFFFF",
  textDark: "#111827",
  textMedium: "#6B7280",
  textLight: "#9CA3AF",
  border: "#E5E7EB",
  borderLight: "#F3F4F6",
  error: "#EF4444",
  errorHover: "#DC2626",
  success: "#10B981",
  accent: "#6366F1",
  highlight: "#E0E7FF",
  shadow: "rgba(0, 0, 0, 0.05)",
  overlay: "rgba(0, 0, 0, 0.4)",
  inputBg: "#F9FAFB",
  gradient: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)",
  gradientHover: "linear-gradient(135deg, #4338CA 0%, #6D28D9 100%)",
};

const styles = {
  container: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    padding: "4rem 1.5rem 3rem",
    backgroundColor: colors.background,
    minHeight: "100vh",
    cursor: "default",
  },
  navBar: {
    width: "100%",
    padding: "16px 5% 16px",
    backgroundColor: colors.cardBg,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: `0 2px 4px ${colors.shadow}`,
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 1000,
    borderBottom: `1px solid ${colors.borderLight}`,
    boxSizing: "border-box",
    cursor: "default",
  },
  navTitle: {
    fontSize: "1.75rem",
    color: colors.textDark,
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    cursor: "pointer",
  },
  navButton: {
    padding: "10px 20px",
    fontSize: "0.9375rem",
    fontFamily: "inherit",
    borderRadius: "8px",
    background: colors.gradient,
    color: "white",
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
    transition: "all 0.3s ease, transform 0.1s ease",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    outline: "none",
    ":hover": {
      background: colors.gradientHover,
      transform: "translateY(-1px)",
    },
    ":focus": {
      boxShadow: `0 0 0 3px ${colors.primaryLight}40`,
      outline: "none",
    },
  },
  
  decksContainer: {
    maxWidth: "1280px",
    margin: "0 auto",
    paddingTop: "50px",
  },
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2.5rem",
    flexWrap: "wrap",
    gap: "1rem",
  },
  header: {
    color: colors.textDark,
    fontSize: "2.25rem",
    fontWeight: 700,
    margin: 0,
    cursor: "default",
  },
  searchContainer: {
    position: "relative",
    minWidth: "300px",
    maxWidth: "400px",
    marginRight: "3rem",
  },
  searchBar: {
    width: "100%",
    padding: "12px 16px 12px 40px",
    borderRadius: "10px",
    border: `1px solid ${colors.border}`,
    fontSize: "0.9375rem",
    backgroundColor: colors.cardBg,
    transition: "all 0.2s ease",
    cursor: "text",
    outline: "none",
    ":focus": {
      borderColor: colors.primary,
      boxShadow: `0 0 0 3px ${colors.primaryLight}40`,
      outline: "none",
    },
  },
  searchIcon: {
    position: "absolute",
    left: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    color: colors.textLight,
  },
  decksGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "1.5rem",
  },
  deckCard: {
    backgroundColor: colors.cardBg,
    padding: "1.5rem",
    borderRadius: "12px",
    boxShadow: `0 4px 8px ${colors.shadow}`,
    cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    border: `1px solid ${colors.border}`,
    display: "flex",
    flexDirection: "column",
    minHeight: "200px",
    position: "relative",
    overflow: "hidden",
    outline: "none",
    ":focus": {
      boxShadow: `0 0 0 3px ${colors.primaryLight}40`,
      outline: "none",
    },
  },
  deckCardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "1rem",
  },
  deckTitle: {
    fontSize: "1.5rem",
    fontWeight: 600,
    margin: 0,
    color: colors.textDark,
    flex: 1,
    cursor: "default",
  },
  deckDescription: {
    fontSize: "0.9375rem",
    color: colors.textMedium,
    lineHeight: "1.6",
    flexGrow: 1,
    marginBottom: "1rem",
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    cursor: "default",
  },
  deckStats: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    fontSize: "0.875rem",
    color: colors.textMedium,
  },
  statBadge: {
    display: "flex",
    alignItems: "center",
    gap: "0.25rem",
    padding: "0.25rem 0.5rem",
    borderRadius: "6px",
    backgroundColor: colors.highlight,
    color: colors.textDark,
  },
  button: {
    fontFamily: "inherit",
    padding: "12px 24px",
    borderRadius: "10px",
    background: colors.gradient,
    color: "white",
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "1rem",
    transition: "all 0.3s ease, transform 0.1s ease",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    outline: "none",
    ":hover": {
      background: colors.gradientHover,
      transform: "translateY(-1px)",
    },
    ":focus": {
      boxShadow: `0 0 0 3px ${colors.primaryLight}40`,
      outline: "none",
    },
    ":disabled": {
      background: colors.disabled,
      cursor: "not-allowed",
      opacity: 0.7,
      boxShadow: "none",
    },
  },
  secondaryButton: {
    background: colors.secondary,
  },
  cancelButton: {
    fontFamily: "inherit",
    padding: "12px 24px",
    borderRadius: "10px",
    backgroundColor: colors.background,
    color: colors.primary,
    border: `1px solid ${colors.border}`,
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "1rem",
    transition: "all 0.3s ease, transform 0.1s ease",
    outline: "none",
    ":hover": {
      backgroundColor: colors.primaryLight,
      transform: "translateY(-1px)",
    },
    ":focus": {
      boxShadow: `0 0 0 3px ${colors.primaryLight}40`,
      outline: "none",
    },
  },
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "4rem 1.5rem",
    textAlign: "center",
    color: colors.textMedium,
    backgroundColor: colors.cardBg,
    borderRadius: "12px",
    border: `1px dashed ${colors.border}`,
    marginBottom: "2rem",
  },
  emptyStateIcon: {
    width: "80px",
    height: "80px",
    marginBottom: "1.5rem",
    color: colors.textLight,
  },
  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "300px",
  },
  spinner: {
    width: "48px",
    height: "48px",
    border: `4px solid ${colors.borderLight}`,
    borderTop: `4px solid ${colors.primary}`,
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
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
    backdropFilter: "blur(8px)",
  },
  modalContent: {
    backgroundColor: colors.cardBg,
    padding: "2rem",
    borderRadius: "16px",
    width: "90%",
    maxWidth: "600px",
    boxShadow: `0 20px 25px -5px ${colors.shadow}`,
    maxHeight: "90vh",
    overflowY: "auto",
    border: `1px solid ${colors.borderLight}`,
    animation: "modalFadeIn 0.3s ease-out",
  },
  modalHeader: {
    marginBottom: "1.5rem",
    color: colors.textDark,
    fontSize: "1.75rem",
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    cursor: "default",
  },
  input: {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "8px",
    border: `1px solid ${colors.border}`,
    fontSize: "0.9375rem",
    marginBottom: "1rem",
    boxSizing: "border-box",
    backgroundColor: colors.inputBg,
    fontFamily: "inherit",
    transition: "all 0.2s ease",
    cursor: "text",
    outline: "none",
    ":focus": {
      borderColor: colors.primary,
      boxShadow: `0 0 0 3px ${colors.primaryLight}40`,
      outline: "none",
    },
  },
  textarea: {
    minHeight: "120px",
    resize: "vertical",
    fontFamily: "inherit",
  },
  modalFooter: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "1rem",
    marginTop: "1.5rem",
  },
  deleteButton: {
    position: "absolute",
    bottom: "1rem",
    right: "1rem",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: colors.textLight,
    transition: "all 0.2s ease",
    padding: "0.5rem",
    borderRadius: "6px",
    outline: "none",
    ":focus": {
      boxShadow: `0 0 0 3px ${colors.primaryLight}40`,
      outline: "none",
    },
  },
  profileCircle: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: colors.gradient,
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontWeight: "600",
    transition: "all 0.2s ease",
    outline: "none",
    ":focus": {
      boxShadow: `0 0 0 3px ${colors.primaryLight}40`,
      outline: "none",
    },
  },
  profileDropdown: {
    position: "absolute",
    top: "60px",
    right: "0",
    backgroundColor: colors.cardBg,
    borderRadius: "10px",
    boxShadow: `0 4px 8px ${colors.shadow}`,
    width: "220px",
    zIndex: 1001,
    border: `1px solid ${colors.borderLight}`,
  },
  dropdownItem: {
    padding: "12px 16px",
    color: colors.textDark,
    cursor: "pointer",
    transition: "background-color 0.2s ease",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    outline: "none",
    ":focus": {
      boxShadow: `0 0 0 3px ${colors.primaryLight}40`,
      outline: "none",
    },
  },
  dropdownDivider: {
    height: "1px",
    backgroundColor: colors.borderLight,
    margin: "0.5rem 0",
  },
  "@keyframes spin": {
    from: { transform: "rotate(0deg)" },
    to: { transform: "rotate(360deg)" },
  },
  "@keyframes modalFadeIn": {
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  },
};

const deleteDeck = async (deckId, e) => {
  e.stopPropagation();
  try {
    if (window.confirm("Are you sure you want to delete this deck?")) {
      await axios.delete(`http://localhost:5000/api/decks/${deckId}`, {
        withCredentials: true,
        headers: getAuthHeaders(), // ← add this
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
            headers: getAuthHeaders(),
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
      localStorage.removeItem("userId");
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
        style={styles.profileCircle}
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        aria-label={`Toggle profile menu for ${userData?.name || "User"}`}
        aria-expanded={isOpen}
      >
        <span style={{ fontWeight: "bold" }}>{userInitial}</span>
      </div>
      <div
        style={{
          ...styles.profileDropdown,
          transform: isOpen ? "translateY(0)" : "translateY(5px)",
          opacity: isOpen ? 1 : 0,
          visibility: isOpen ? "visible" : "hidden",
        }}
      >
        <div
          style={styles.dropdownItem}
          role="menuitem"
          aria-label={`Profile: ${userData?.name || "User"}`}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke={colors.textDark}
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          {userData?.name || "User"}
          {userData?.isVerified && (
            <span style={{ marginLeft: "auto", color: colors.primary }}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke={colors.primary}
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </span>
          )}
        </div>
        <div style={styles.dropdownDivider} />
        <div
          style={styles.dropdownItem}
          onClick={handleLogout}
          role="menuitem"
          aria-label="Logout"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke={colors.textDark}
          >
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
    document.body.style.overflow =
      showModal ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/check", {
          headers: {
            ...getAuthHeaders(),
          },
          credentials: "include", // Needed for manual login
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
      
                  headers: getAuthHeaders(), // ← add this
                
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
        headers: getAuthHeaders(), // ← add this
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
    <div style={styles.container}>
      <div style={styles.navBar}>
        <div
          style={styles.navTitle}
          onClick={() => navigate("/decks")}
          role="button"
          aria-label="Navigate to Decks"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke={colors.primary}
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
            style={styles.navButton}
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

      <div style={styles.decksContainer}>
        <div style={styles.headerContainer}>
          <h1 style={styles.header}>Your Decks</h1>
          <div style={styles.searchContainer}>
            <svg
              style={styles.searchIcon}
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
              style={styles.searchBar}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search decks"
            />
          </div>
        </div>

        {loading ? (
          <div style={styles.loading}>
            <div
              style={styles.spinner}
              role="status"
              aria-label="Loading decks"
            />
          </div>
        ) : error ? (
          <div style={styles.emptyState} role="alert">
            <svg
              style={styles.emptyStateIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke={colors.textLight}
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <h3 style={{ color: colors.textDark, marginBottom: "0.5rem" }}>
              Error Loading Decks
            </h3>
            <p style={{ marginBottom: "1.5rem" }}>{error}</p>
            <button
              onClick={fetchDecks}
              style={{
                ...styles.button,
                backgroundColor: colors.error,
              }}
              role="button"
              aria-label="Retry loading decks"
            >
              Retry
            </button>
          </div>
        ) : filteredDecks.length === 0 ? (
          <div style={styles.emptyState}>
            <svg
              style={styles.emptyStateIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke={colors.textLight}
            >
              <path d="M3 3h18v18H3z" />
              <path d="M3 9h18" />
              <path d="M9 9v12" />
            </svg>
            <h3 style={{ color: colors.textDark, marginBottom: "0.5rem" }}>
              {searchTerm ? "No matching decks" : "No decks yet"}
            </h3>
            <p style={{ marginBottom: "1.5rem" }}>
              {searchTerm
                ? "Try a different search term"
                : "Create your first deck to get started"}
            </p>
            <button
              onClick={handleCreateDeck}
              style={styles.button}
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
          <div style={styles.decksGrid}>
            {filteredDecks.map((deck) => (
              <div
                key={deck._id}
                style={styles.deckCard}
                onClick={() => handleDeckClick(deck._id)}
                role="button"
                tabIndex={0}
                aria-label={`View deck: ${deck.title}`}
                onKeyDown={(e) =>
                  e.key === "Enter" && handleDeckClick(deck._id)
                }
              >
                <div style={styles.deckCardHeader}>
                  <h3 style={styles.deckTitle}>{deck.title}</h3>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={colors.textLight}
                    style={{ flexShrink: 0 }}
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <line x1="3" y1="9" x2="21" y2="9" />
                    <line x1="9" y1="21" x2="9" y2="9" />
                  </svg>
                </div>
                <p style={styles.deckDescription}>
                  {deck.description || "No description provided"}
                </p>
                <div style={styles.deckStats}>
                  <span style={styles.statBadge}>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={colors.textDark}
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <line x1="3" y1="9" x2="21" y2="9" />
                      <line x1="9" y1="21" x2="9" y2="9" />
                    </svg>
                    {deck.cardCount || 0} cards
                  </span>
                </div>
                <button
                  style={styles.deleteButton}
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
        <div style={styles.modalOverlay} role="dialog" aria-modal="true">
          <div style={styles.modalContent}>
            <h2 style={styles.modalHeader}>
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke={colors.primary}
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
                  color: colors.textDark,
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
                style={styles.input}
                autoFocus
                aria-required="true"
              />
              <label
                htmlFor="description"
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontSize: "0.875rem",
                  color: colors.textDark,
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
                style={{ ...styles.input, ...styles.textarea }}
              />
              <div style={styles.modalFooter}>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  style={styles.cancelButton}
                  aria-label="Cancel deck creation"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    ...styles.button,
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
