import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImg from "./assets/furfle.png";
import icon from "./assets/illus.png";
import "./styles/Landing.css";

const Landing = () => {
  const [isHovered, setIsHovered] = useState({});
  const navigate = useNavigate();

  const handleMouseEnter = (element) => {
    setIsHovered((prev) => ({ ...prev, [element]: true }));
  };

  const handleMouseLeave = (element) => {
    setIsHovered((prev) => ({ ...prev, [element]: false }));
  };

  return (
    <div className="landing-container">
      <div className="navbar">
        <div className="nav-logo" onClick={() => navigate("/")}>
          WeFlash
        </div>
        <div className="nav-links">
          <button
            className={`nav-button sign-in-button${
              isHovered.signIn ? " hovered" : ""
            }`}
            onMouseEnter={() => handleMouseEnter("signIn")}
            onMouseLeave={() => handleMouseLeave("signIn")}
            onClick={() => navigate("/signin")}
          >
            Sign In
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div
        className="hero-section"
        style={{ backgroundImage: `url(${backgroundImg})` }}
      >
        <div className="hero-content">
          <img
            className="hero-image"
            src={icon}
            alt="WeFlash Illustration"
            onMouseEnter={() => handleMouseEnter("image")}
            onMouseLeave={() => handleMouseLeave("image")}
          />
          <h1 className="hero-heading">Master Anything with WeFlash</h1>
          <p className="hero-subtext">
            Create, study, and share interactive flashcards to learn faster and
            smarter. Perfect for students, professionals, and lifelong learners.
          </p>
          <button
            className="nav-button sign-up-button"
            onClick={() => navigate("/signin")}
          >
            Start Learning Now
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="content-section">
        <div className="inner-content">
          <h2 className="section-heading">Why Choose WeFlash?</h2>
          <p className="section-subtext">
            Powerful features to make learning engaging and effective.
          </p>
          <div className="feature-grid">
            <div className="feature-item">
              <h3 className="feature-title">Smart Flashcards</h3>
              <p className="feature-description">
                Create custom flashcards with text, images, and quizzes for
                active recall.
              </p>
            </div>
            <div className="feature-item">
              <h3 className="feature-title">Spaced Repetition</h3>
              <p className="feature-description">
                Optimize retention with our intelligent review algorithm.
              </p>
            </div>
            <div className="feature-item">
              <h3 className="feature-title">Collaborate & Share</h3>
              <p className="feature-description">
                Share decks with friends or join community-created flashcards.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call-to-Action Section */}
      <div className="cta-section">
        <div className="cta-content">
          <h2 className="section-heading">Ready to Boost Your Learning?</h2>
          <p className="section-subtext">
            Join thousands of learners using WeFlash to achieve their goals.
          </p>
          <button
            className="nav button get-started-button"
            onClick={() => navigate("/signin")}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
