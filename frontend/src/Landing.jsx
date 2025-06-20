import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImg from "./assets/furfle.png";
import icon from "./assets/illus.png";

const Landing = () => {
  const [isHovered, setIsHovered] = useState({});
  const navigate = useNavigate();

  const handleMouseEnter = (element) => {
    setIsHovered((prev) => ({ ...prev, [element]: true }));
  };

  const handleMouseLeave = (element) => {
    setIsHovered((prev) => ({ ...prev, [element]: false }));
  };

  const containerStyle = {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    minHeight: "100vh",
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    margin: 0,
    overflow: "auto",
    cursor: "default", // Prevent text cursor globally
  };

  const imageStyle = {
    marginTop: "2rem",
    maxWidth: "200px",
    height: "auto",
    margin: "0 auto 1.5rem auto",
    display: "block",
    cursor: "default", // Prevent text cursor on image
  };

  const navBar = {
    width: "100%",
    padding: "16px 5% 16px",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 1000,
    boxSizing: "border-box",
    borderBottom: "1px solid rgba(255, 165, 0, 0.1)",
    cursor: "default", // Prevent text cursor on navbar background
  };

  const navLogoStyle = {
    fontSize: "1.5rem",
    color: "#0E2148",
    fontWeight: 700,
    cursor: "pointer", // Pointer for clickable logo
    letterSpacing: "-0.5px",
  };

  const navLinksStyle = {
    display: "flex",
    gap: "24px",
    alignItems: "center",
  };

  const navButtonStyle = {
    fontFamily: "inherit",
    padding: "8px 16px",
    borderRadius: "8px",
    fontSize: "0.875rem",
    fontWeight: 500,
    cursor: "pointer", // Pointer for buttons
    transition: "all 0.2s ease",
  };

  const signInButtonStyle = {
    ...navButtonStyle,
    backgroundColor: "transparent",
    color: "#4338CA",
    border: "1px solid rgba(67, 56, 202, 0.3)",
  };

  const signUpButtonStyle = {
    ...navButtonStyle,
    backgroundColor: "#6366F1",
    color: "white",
    border: "1px solid #6366F1",
  };

  const submitButtonHoverStyle = {
    backgroundColor: "#4F46E5",
  };

  const heroSection = {
    backgroundImage: `url(${backgroundImg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
    width: "100%",
    color: "white",
    fontFamily: "'Inter', sans-serif",
    borderRadius: "0 0 24px 24px",
    overflow: "hidden",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderTop: "none",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    boxSizing: "border-box",
    cursor: "default", // Prevent text cursor on hero section
  };

  const heroContentStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: "4rem 2rem 2rem", // Three-value padding
    maxWidth: "800px",
    margin: "0 auto",
    marginBottom: "2rem", // Space below hero content
    cursor: "default", // Prevent text cursor on hero content
  };

  const contentSection = {
    backgroundColor: "white",
    color: "black",
    width: "100%",
    margin: 0,
    boxSizing: "border-box",
    cursor: "default", // Prevent text cursor on content section
  };

  const innerContentStyle = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "4rem 2rem 3rem", // Three-value padding
    marginBottom: "2rem", // Space below content section
    cursor: "default", // Prevent text cursor on inner content
  };

  const featureContainer = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "2rem",
    margin: "3rem 0",
  };

  const featureItem = {
    padding: "1.5rem",
    borderRadius: "12px",
    backgroundColor: "#F9FAFB",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
    transition: "transform 0.2s ease",
    cursor: "default", // Prevent text cursor on feature items
  };

  const ctaSection = {
    backgroundColor: "#6366F1",
    color: "white",
    width: "95%",
    margin: "0 auto",
    marginBottom: "2rem",
    boxSizing: "border-box",
    borderRadius: "20px",
    display: "flex", // Fixed invalid display: "center"
    justifyContent: "center",
    alignItems: "center",
    cursor: "default", // Prevent text cursor on CTA section
  };

  const ctaContentStyle = {
    maxWidth: "800px",
    padding: "4rem 2rem 3rem", // Three-value padding
    margin: "0 auto",
    textAlign: "center",
    cursor: "default", // Prevent text cursor on CTA content
  };

  return (
    <div style={containerStyle}>
      <div style={navBar}>
        <div style={navLogoStyle} onClick={() => navigate("/")}>
          WeFlash
        </div>
        <div style={navLinksStyle}>
          
          <button
            style={{
              ...signInButtonStyle,
              ...(isHovered.signIn ? { backgroundColor: "#E0E7FF" } : {}),
            }}
            onMouseEnter={() => handleMouseEnter("signIn")}
            onMouseLeave={() => handleMouseLeave("signIn")}
            onClick={() => navigate("/signin")}
          >
            Sign In
          </button>
          <button
            style={{
              ...signUpButtonStyle,
              ...(isHovered.signUp ? submitButtonHoverStyle : {}),
            }}
            onMouseEnter={() => handleMouseEnter("signUp")}
            onMouseLeave={() => handleMouseLeave("signUp")}
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div style={heroSection}>
        <div style={heroContentStyle}>
          <img
            style={imageStyle}
            src={icon}
            alt="WeFlash Illustration"
            onMouseEnter={() => handleMouseEnter("image")}
            onMouseLeave={() => handleMouseLeave("image")}
          />
          <h1
            style={{
              fontSize: "3rem",
              fontWeight: 800,
              margin: "0.5rem 0",
              color: "#3D365C",
              cursor: "default", // Prevent text cursor on heading
            }}
          >
            Master Anything with WeFlash
          </h1>
          <p
            style={{
              fontSize: "1.25rem",
              maxWidth: "600px",
              margin: "1rem 0",
              color: "#4338CA",
              cursor: "default", // Prevent text cursor on paragraph
            }}
          >
            Create, study, and share interactive flashcards to learn faster and
            smarter. Perfect for students, professionals, and lifelong learners.
          </p>
          <button
            style={{
              padding: "0.8rem 2rem",
              backgroundColor: "#6366F1",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer", // Pointer for button
              marginTop: "1.5rem",
              fontSize: "1rem",
              fontWeight: 600,
            }}
            onClick={() => navigate("/signup")}
          >
            Start Learning Now
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div style={contentSection}>
        <div style={innerContentStyle}>
          <h2
            style={{
              fontSize: "2.5rem",
              fontWeight: 700,
              textAlign: "center",
              cursor: "default", // Prevent text cursor on heading
            }}
          >
            Why Choose WeFlash?
          </h2>
          <p
            style={{
              textAlign: "center",
              color: "#4B5563",
              marginBottom: "2rem",
              cursor: "default", // Prevent text cursor on paragraph
            }}
          >
            Powerful features to make learning engaging and effective.
          </p>
          <div style={featureContainer}>
            <div style={featureItem}>
              <h3
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 600,
                  cursor: "default",
                }}
              >
                Smart Flashcards
              </h3>
              <p style={{ color: "#4B5563", cursor: "default" }}>
                Create custom flashcards with text, images, and quizzes for
                active recall.
              </p>
            </div>
            <div style={featureItem}>
              <h3
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 600,
                  cursor: "default",
                }}
              >
                Spaced Repetition
              </h3>
              <p style={{ color: "#4B5563", cursor: "default" }}>
                Optimize retention with our intelligent review algorithm.
              </p>
            </div>
            <div style={featureItem}>
              <h3
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 600,
                  cursor: "default",
                }}
              >
                Collaborate & Share
              </h3>
              <p style={{ color: "#4B5563", cursor: "default" }}>
                Share decks with friends or join community-created flashcards.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call-to-Action Section */}
      <div style={ctaSection}>
        <div style={ctaContentStyle}>
          <h2
            style={{ fontSize: "2.5rem", fontWeight: 700, cursor: "default" }}
          >
            Ready to Boost Your Learning?
          </h2>
          <p
            style={{
              fontSize: "1.25rem",
              margin: "1rem 0",
              cursor: "default",
            }}
          >
            Join thousands of learners using WeFlash to achieve their goals.
          </p>
          <button
            style={{
              padding: "0.8rem 2rem",
              backgroundColor: "white",
              color: "#6366F1",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer", // Pointer for button
              fontSize: "1rem",
              fontWeight: 600,
            }}
            onClick={() => navigate("/signup")}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
