import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

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
  disabled: "#D1D5DB",
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
    fontSize: "1.5rem",
    color: colors.textDark,
    fontWeight: 700,
    cursor: "default",
  },
  backButton: {
    fontFamily: "inherit",
    padding: "10px 20px",
    borderRadius: "8px",
    backgroundColor: "transparent",
    color: colors.primary,
    border: `1px solid ${colors.border}`,
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "0.9375rem",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    transition: "all 0.2s ease",
  },
  contentContainer: {
    maxWidth: "900px",
    margin: "0 auto",
    paddingTop: "40px",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    marginBottom: "2rem",
    backgroundColor: colors.cardBg,
    padding: "1.5rem",
    borderRadius: "12px",
    boxShadow: `0 2px 4px ${colors.shadow}`,
  },
  inputWrapper: {
    position: "relative",
    width: "100%",
  },
  input: {
    width: "100%",
    padding: "12px 16px 12px 40px",
    borderRadius: "8px",
    border: `1px solid ${colors.border}`,
    fontSize: "0.9375rem",
    minHeight: "50px",
    maxHeight: "150px",
    resize: "vertical",
    boxSizing: "border-box",
    fontFamily: "inherit",
    transition: "all 0.2s ease",
    cursor: "text",
  },
  inputIcon: {
    position: "absolute",
    left: "12px",
    top: "12px",
    color: colors.textLight,
  },
  questionCard: {
    backgroundColor: colors.cardBg,
    padding: "2rem",
    borderRadius: "16px",
    boxShadow: `0 4px 12px ${colors.shadow}`,
    border: `1px solid ${colors.border}`,
    minHeight: "350px",
    maxWidth: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    position: "relative",
    transition: "all 0.3s ease",
    boxSizing: "border-box",
  },
  questionCounter: {
    color: colors.primary,
    fontSize: "0.875rem",
    fontWeight: 600,
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    top: "1rem",
    padding: "6px 12px",
    backgroundColor: colors.highlight,
    borderRadius: "6px",
    cursor: "default",
  },
  cardContent: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem",
    cursor: "pointer",
    maxWidth: "100%",
    boxSizing: "border-box",
    maxHeight: "250px",
  },
  cardText: {
    fontSize: "1.25rem",
    color: colors.textDark,
    textAlign: "center",
    cursor: "default",
    margin: "1rem",
    wordBreak: "break-word",
    whiteSpace: "normal",
    maxWidth: "100%",
    marginTop: "60px",
  },
  answerText: {
    fontSize: "1.3rem",
    color: colors.textDark,
    margin: "20px 20px",
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "30px",
    color: colors.primaryHover,
    padding: "110px",
    backgroundColor: "#f8f9fa",
    borderRadius: "15px",
    marginTop: "70px",
    fontWeight: "bold",
    wordBreak: "break-word",
    whiteSpace: "normal",
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
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  ratingButton: {
    fontFamily: "inherit",
    padding: "10px 20px",
    borderRadius: "8px",
    border: `1px solid ${colors.border}`,
    cursor: "pointer",
    fontWeight: 500,
    fontSize: "0.9rem",
    transition: "all 0.2s ease",
    flex: 1,
    textAlign: "center",
  },
  arrowButton: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    backgroundColor: colors.cardBg,
    color: colors.primary,
    fontSize: "1.25rem",
    border: `1px solid ${"white"}`,
    cursor: "pointer",
    padding: "12px",
    borderRadius: "50%",
    transition: "all 0.3s ease",
  },
  leftArrow: {
    left: "1rem",
  },
  rightArrow: {
    right: "1rem",
  },
  iconButton: {
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    padding: "8px",
    borderRadius: "8px",
    transition: "all 0.2s ease",
    color: colors.textLight,
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
    boxShadow: `0 20px 25px ${colors.shadow}`,
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
    transition: "all 0.3s ease",
  },
  textLink: {
    color: colors.primary,
    fontWeight: 500,
    cursor: "pointer",
    textDecoration: "none",
    padding: "0.75rem 1.5rem",
    borderRadius: "8px",
    transition: "all 0.2s ease",
  },
  error: {
    color: colors.error,
    textAlign: "center",
    marginBottom: "1.5rem",
    fontSize: "0.9375rem",
    cursor: "default",
  },
  emptyState: {
    textAlign: "center",
    color: colors.textMedium,
    fontSize: "1rem",
    marginTop: "2rem",
    cursor: "default",
  },
  "@keyframes modalFadeIn": {
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  },
};

function SpacedRepetitionPage() {
  const { deckId } = useParams();
  const navigate = useNavigate();
  const baseURL =
    import.meta.env.VITE_API_URL || "http://localhost:5000/api/flashcards";

  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [formData, setFormData] = useState({ question: "", answer: "" });
  const [error, setError] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isHovered, setIsHovered] = useState({});
  const [deckTitle, setDeckTitle] = useState("");
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateData, setUpdateData] = useState({ question: "", answer: "" });

  useEffect(() => {
    document.body.style.overflow = showUpdateModal ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showUpdateModal]);

  useEffect(() => {
    if (!deckId) {
      setError("Deck not found.");
      return;
    }
    fetchDeckDetails();
    fetchFlashcards();
  }, [deckId]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (showUpdateModal) return;
      const isInputField =
        e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA";
      if (e.key === "Enter" && isInputField) {
        e.preventDefault();
        return;
      }
      if (e.key === " " && !isInputField && !showAnswer) {
        e.preventDefault();
        setShowAnswer(true);
      } else if (e.key === "ArrowLeft" && !isInputField && !showAnswer) {
        prevCard();
      } else if (e.key === "ArrowRight" && !isInputField && !showAnswer) {
        nextCard();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showUpdateModal, currentIndex, flashcards, showAnswer]);

  const fetchDeckDetails = async () => {
    try {
      const response = await axios.get(
        `${baseURL.replace("flashcards", "decks")}/${deckId}`,
        { withCredentials: true }
      );
      const deck = response.data.data;
      setDeckTitle(deck?.title || "Untitled Deck");
    } catch (err) {
      console.error("Error fetching deck details:", err);
      setError("Error fetching deck details.");
    }
  };

  const fetchFlashcards = async () => {
    try {
      const res = await axios.get(`${baseURL}/deck/${deckId}`, {
        withCredentials: true,
      });
      if (res.data.data && res.data.data.length > 0) {
        setFlashcards(res.data.data);
        setCurrentIndex(0);
        setShowAnswer(false);
      } else {
        setError("No flashcards due for review.");
        setFlashcards([]);
      }
    } catch (err) {
      setError("Error fetching flashcards.");
      console.error(err);
      setFlashcards([]);
    }
  };

  const nextCard = () => {
    if (flashcards.length === 0) return;
    setShowAnswer(false);
    let nextIndex = (currentIndex + 1) % flashcards.length;
    let attempts = 0;
    while (
      attempts < flashcards.length &&
      new Date(flashcards[nextIndex].nextReviewDate) > new Date()
    ) {
      nextIndex = (nextIndex + 1) % flashcards.length;
      attempts++;
    }
    setCurrentIndex(nextIndex);
  };

  const prevCard = () => {
    if (flashcards.length === 0) return;
    setShowAnswer(false);
    let prevIndex = (currentIndex - 1 + flashcards.length) % flashcards.length;
    let attempts = 0;
    while (
      attempts < flashcards.length &&
      new Date(flashcards[prevIndex].nextReviewDate) > new Date()
    ) {
      prevIndex = (prevIndex - 1 + flashcards.length) % flashcards.length;
      attempts++;
    }
    setCurrentIndex(prevIndex);
  };

  const handleCreate = async () => {
    if (!formData.question.trim() || !formData.answer.trim()) {
      setError("Question and answer are required.");
      return;
    }
    try {
      await axios.post(
        baseURL,
        { ...formData, deck: deckId },
        { withCredentials: true }
      );
      setFormData({ question: "", answer: "" });
      setError(null);
      fetchFlashcards();
    } catch (err) {
      setError("Error creating flashcard.");
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (!flashcards[currentIndex]) return;
    try {
      const id = flashcards[currentIndex]._id;
      await axios.delete(`${baseURL}/${id}`, { withCredentials: true });
      const updatedFlashcards = flashcards.filter((_, i) => i !== currentIndex);
      setFlashcards(updatedFlashcards);
      setShowAnswer(false);
      setCurrentIndex((prev) =>
        prev >= updatedFlashcards.length
          ? Math.max(0, updatedFlashcards.length - 1)
          : prev
      );
    } catch (err) {
      setError("Error deleting flashcard.");
      console.error(err);
    }
  };

  const handleShuffle = () => {
    if (flashcards.length <= 1) return;
    const dueCards = flashcards.filter(
      (card) => new Date(card.nextReviewDate) <= new Date()
    );
    if (dueCards.length <= 1) return;
    const shuffledCards = [...dueCards];
    for (let i = shuffledCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledCards[i], shuffledCards[j]] = [
        shuffledCards[j],
        shuffledCards[i],
      ];
    }
    const nonDueCards = flashcards.filter(
      (card) => new Date(card.nextReviewDate) > new Date()
    );
    setFlashcards([...shuffledCards, ...nonDueCards]);
    setCurrentIndex(0);
    setShowAnswer(false);
  };

  const handleQualityRating = async (quality) => {
    if (!flashcards[currentIndex]) return;
    try {
      const id = flashcards[currentIndex]._id;
      await axios.post(
        `${baseURL}/${id}/rating`,
        { quality },
        { withCredentials: true }
      );
      setShowAnswer(false);
      fetchFlashcards();
    } catch (err) {
      setError("Error submitting rating.");
      console.error(err);
    }
  };

  const handleBack = () => navigate(`/decks/${deckId}`);

  const currentCard = useMemo(
    () => flashcards[currentIndex] || null,
    [flashcards, currentIndex]
  );

  const handleMouseEnter = (buttonName) => {
    setIsHovered((prev) => ({ ...prev, [buttonName]: true }));
  };

  const handleMouseLeave = (buttonName) => {
    setIsHovered((prev) => ({ ...prev, [buttonName]: false }));
  };

  const isCardDue = currentCard
    ? new Date(currentCard.nextReviewDate) <= new Date()
    : false;

  return (
    <div style={styles.container}>
      <div style={styles.navBar}>
        <button
          style={{
            ...styles.backButton,
            backgroundColor: isHovered.back
              ? colors.borderLight
              : "transparent",
          }}
          onClick={handleBack}
          onMouseEnter={() => handleMouseEnter("back")}
          onMouseLeave={() => handleMouseLeave("back")}
          role="button"
          aria-label="Back to flashcards"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke={colors.primary}
          >
            <path
              d="M19 12H5M12 19l-7-7 7-7"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back
        </button>
        <span style={styles.navTitle}>{deckTitle} - Spaced Repetition</span>
        <div style={{ width: "100px" }} />
      </div>

      <div style={styles.contentContainer}>
        {error && (
          <div style={styles.error} role="alert">
            {error}
            {error.includes("fetching") && (
              <button
                style={{
                  ...styles.button,
                  backgroundColor: colors.error,
                  marginLeft: "1rem",
                  padding: "0.5rem 1rem",
                }}
                onClick={fetchFlashcards}
                role="button"
                aria-label="Retry fetching flashcards"
              >
                Retry
              </button>
            )}
          </div>
        )}

        <div style={styles.inputContainer}>
          <div style={styles.inputWrapper}>
            <svg
              style={styles.inputIcon}
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v.01" />
              <path d="M12 8v4" />
            </svg>
            <textarea
              placeholder="Enter question..."
              value={formData.question}
              onChange={(e) =>
                setFormData({ ...formData, question: e.target.value })
              }
              style={styles.input}
              autoFocus
              aria-label="Question"
              aria-required="true"
            />
          </div>
          <div style={styles.inputWrapper}>
            <svg
              style={styles.inputIcon}
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <textarea
              placeholder="Enter answer..."
              value={formData.answer}
              onChange={(e) =>
                setFormData({ ...formData, answer: e.target.value })
              }
              style={styles.input}
              aria-label="Answer"
              aria-required="true"
            />
          </div>
          <button
            style={{
              ...styles.button,
              opacity:
                !formData.question.trim() || !formData.answer.trim() ? 0.7 : 1,
              cursor:
                !formData.question.trim() || !formData.answer.trim()
                  ? "not-allowed"
                  : "pointer",
              background:
                !formData.question.trim() || !formData.answer.trim()
                  ? colors.disabled
                  : colors.gradient,
            }}
            onClick={handleCreate}
            disabled={!formData.question.trim() || !formData.answer.trim()}
            onMouseEnter={() => handleMouseEnter("add")}
            onMouseLeave={() => handleMouseLeave("add")}
            role="button"
            aria-label="Add flashcard"
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
            Add Flashcard
          </button>
        </div>

        {currentCard && isCardDue ? (
          <>
            <div
              style={styles.questionCard}
              onClick={() => !showAnswer && setShowAnswer(true)}
              role="button"
              tabIndex={0}
              aria-label={`Toggle flashcard: ${
                showAnswer ? "Show question" : "Show answer"
              }`}
              onKeyDown={(e) =>
                e.key === "Enter" && !showAnswer && setShowAnswer(true)
              }
            >
              <div style={styles.questionCounter}>
                Card {currentIndex + 1} of {flashcards.length}
              </div>
              <div style={styles.cardContent}>
                {showAnswer ? (
                  <div style={styles.answerText}>{currentCard.answer}</div>
                ) : (
                  <div style={styles.cardText}>{currentCard.question}</div>
                )}
              </div>
              <button
                style={{
                  ...styles.arrowButton,
                  ...styles.leftArrow,
                  backgroundColor: isHovered.prev
                    ? colors.highlight
                    : colors.cardBg,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  prevCard();
                }}
                onMouseEnter={() => handleMouseEnter("prev")}
                onMouseLeave={() => handleMouseLeave("prev")}
                aria-label="Previous flashcard"
                disabled={showAnswer}
              >
                ⟨
              </button>
              <button
                style={{
                  ...styles.arrowButton,
                  ...styles.rightArrow,
                  backgroundColor: isHovered.next
                    ? colors.highlight
                    : colors.cardBg,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  nextCard();
                }}
                onMouseEnter={() => handleMouseEnter("next")}
                onMouseLeave={() => handleMouseLeave("next")}
                aria-label="Next flashcard"
                disabled={showAnswer}
              >
                ⟩
              </button>
            </div>
            {showAnswer && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "0.5rem",
                  padding: "1rem",
                }}
              >
                <button
                  style={{
                    ...styles.ratingButton,
                    backgroundColor: isHovered.again
                      ? colors.error
                      : colors.background,
                    color: isHovered.again ? "white" : colors.textDark,
                  }}
                  onClick={() => handleQualityRating(0)}
                  onMouseEnter={() => handleMouseEnter("again")}
                  onMouseLeave={() => handleMouseLeave("again")}
                  aria-label="Rate as Again (0)"
                >
                  Again
                </button>
                <button
                  style={{
                    ...styles.ratingButton,
                    backgroundColor: isHovered.hard
                      ? colors.errorHover
                      : colors.background,
                    color: isHovered.hard ? "white" : colors.textDark,
                  }}
                  onClick={() => handleQualityRating(2)}
                  onMouseEnter={() => handleMouseEnter("hard")}
                  onMouseLeave={() => handleMouseLeave("hard")}
                  aria-label="Rate as Hard (2)"
                >
                  Hard
                </button>
                <button
                  style={{
                    ...styles.ratingButton,
                    backgroundColor: isHovered.good
                      ? colors.success
                      : colors.background,
                    color: isHovered.good ? "white" : colors.textDark,
                  }}
                  onClick={() => handleQualityRating(3)}
                  onMouseEnter={() => handleMouseEnter("good")}
                  onMouseLeave={() => handleMouseLeave("good")}
                  aria-label="Rate as Good (3)"
                >
                  Good
                </button>
                <button
                  style={{
                    ...styles.ratingButton,
                    backgroundColor: isHovered.easy
                      ? colors.secondary
                      : colors.background,
                    color: isHovered.easy ? "white" : colors.textDark,
                  }}
                  onClick={() => handleQualityRating(5)}
                  onMouseEnter={() => handleMouseEnter("easy")}
                  onMouseLeave={() => handleMouseLeave("easy")}
                  aria-label="Rate as Easy (5)"
                >
                  Easy
                </button>
              </div>
            )}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "0.5rem",
                padding: "1rem",
              }}
            >
              <a
                style={{
                  ...styles.textLink,
                  backgroundColor: isHovered.showFlashcardsLink
                    ? colors.borderLight
                    : "transparent",
                }}
                onMouseEnter={() => handleMouseEnter("showFlashcardsLink")}
                onMouseLeave={() => handleMouseLeave("showFlashcardsLink")}
                onClick={() => navigate(`/flashcards/${deckId}`)}
                role="link"
                aria-label="View all flashcards"
              >
                Show all flashcards
              </a>
              <div
                style={{
                  display: "flex",
                  gap: "0.5rem",
                }}
              >
                <button
                  style={{
                    ...styles.iconButton,
                    backgroundColor: isHovered.update
                      ? colors.borderLight
                      : "transparent",
                  }}
                  onClick={() => {
                    setUpdateData({
                      question: currentCard.question,
                      answer: currentCard.answer,
                    });
                    setShowUpdateModal(true);
                  }}
                  onMouseEnter={() => handleMouseEnter("update")}
                  onMouseLeave={() => handleMouseLeave("update")}
                  aria-label="Edit flashcard"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                    <path d="m15 5 4 4" />
                  </svg>
                </button>
                <button
                  style={{
                    ...styles.iconButton,
                    backgroundColor: isHovered.delete
                      ? colors.borderLight
                      : "transparent",
                  }}
                  onClick={handleDelete}
                  onMouseEnter={() => handleMouseEnter("delete")}
                  onMouseLeave={() => handleMouseLeave("delete")}
                  aria-label="Delete flashcard"
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
                    <line x1="10" x2="10" y1="11" y2="17" />
                    <line x1="14" x2="14" y1="11" y2="17" />
                  </svg>
                </button>
                <button
                  style={{
                    ...styles.iconButton,
                    backgroundColor: isHovered.shuffle
                      ? colors.borderLight
                      : "transparent",
                  }}
                  onClick={handleShuffle}
                  onMouseEnter={() => handleMouseEnter("shuffle")}
                  onMouseLeave={() => handleMouseLeave("shuffle")}
                  aria-label="Shuffle flashcards"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={colors.primary}
                  >
                    <path d="m18 14 4 4-4 4" />
                    <path d="m18 2 4 4-4 4" />
                    <path d="M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22" />
                    <path d="M2 6h1.972a4 4 0 0 1 3.6 2.2" />
                    <path d="M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45" />
                  </svg>
                </button>
              </div>
            </div>
          </>
        ) : (
          <p style={styles.emptyState}>
            {flashcards.length > 0
              ? "No flashcards are due for review. Check back later!"
              : "No flashcards available. Add some to get started!"}
          </p>
        )}

        {showUpdateModal && (
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
                  <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                  <path d="m15 5 4 4" />
                </svg>
                Update Flashcard
              </h2>
              <div style={{ marginBottom: "1.5rem" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    color: colors.textDark,
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    cursor: "default",
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
                  style={styles.input}
                  aria-label="Update question"
                  aria-required="true"
                />
              </div>
              <div style={{ marginBottom: "1.5rem" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    color: colors.textDark,
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    cursor: "default",
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
                  style={styles.input}
                  aria-label="Update answer"
                  aria-required="true"
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "1rem",
                }}
              >
                <button
                  style={styles.cancelButton}
                  onClick={() => setShowUpdateModal(false)}
                  aria-label="Cancel update"
                >
                  Cancel
                </button>
                <button
                  style={{
                    ...styles.button,
                    opacity:
                      !updateData.question.trim() || !updateData.answer.trim()
                        ? 0.7
                        : 1,
                    cursor:
                      !updateData.question.trim() || !updateData.answer.trim()
                        ? "not-allowed"
                        : "pointer",
                    background:
                      !updateData.question.trim() || !updateData.answer.trim()
                        ? colors.disabled
                        : colors.gradient,
                  }}
                  onClick={async () => {
                    if (
                      !updateData.question.trim() ||
                      !updateData.answer.trim()
                    )
                      return;
                    try {
                      const id = flashcards[currentIndex]._id;
                      await axios.put(
                        `${baseURL}/${id}`,
                        {
                          question: updateData.question,
                          answer: updateData.answer,
                        },
                        { withCredentials: true }
                      );
                      setShowUpdateModal(false);
                      fetchFlashcards();
                    } catch (err) {
                      setError("Error updating flashcard.");
                      console.error(err);
                    }
                  }}
                  disabled={
                    !updateData.question.trim() || !updateData.answer.trim()
                  }
                  aria-label="Save updated flashcard"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SpacedRepetitionPage;
