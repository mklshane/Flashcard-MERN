import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImg from "./assets/furfle.png";
import axios from "axios";

// Updated container with orange/pink background
const containerStyle = {
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  minHeight: "100vh",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundImage: `url(${backgroundImg})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  boxSizing: "border-box",
  overflowX: "hidden",
  paddingTop: "20px",
  paddingBottom: "40px",
  "@media (maxWidth: 768px)": {
    paddingTop: "70px",
    paddingBottom: "20px",
  },
  "@media (maxWidth: 480px)": {
    paddingTop: "60px",
  },
};

// Navbar with warm glass effect
const navBarStyle = {
  width: "100%",
  padding: "16px 5%",
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
};

const navLogoStyle = {
  fontSize: "1.5rem",
  color: "#4338CA", // Indigo-600
  fontWeight: 700,
  cursor: "pointer",
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
  cursor: "pointer",
  transition: "all 0.2s ease",
};

const signInButtonStyle = {
  ...navButtonStyle,
  backgroundColor: "transparent",
  color: "#4338CA", // Indigo-600
  border: "1px solid rgba(67, 56, 202, 0.3)",
};

const signUpButtonStyle = {
  ...navButtonStyle,
  backgroundColor: "#6366F1", // Indigo-500
  color: "white",
  border: "1px solid #6366F1",
};

// Main content
const mainContentStyle = {
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "100px 0 40px",
  width: "100vw", // Take full width of viewport
  boxSizing: "border-box",
};

// Form card with warm accents
const formCardStyle = {
  background: "rgba(255, 255, 255, 0.25)", // More transparent for better glass effect
  boxShadow: "0 8px 32px 0 rgba(173, 151, 199, 0.55)", // Stronger shadow
  backdropFilter: "blur(16px)", // Increased blur
  WebkitBackdropFilter: "blur(16px)",
  borderRadius: "20px", // More rounded corners
  border: "1px solid rgba(255, 255, 255, 0.3)", // More visible border
  padding: "30px",
  width: "100%",
  maxWidth: "400px",
  height: "500px",
  textAlign: "left",
};

const formTitleStyle = {
  fontFamily: "inherit",
  fontSize: "1.5rem",
  fontWeight: 700,
  marginBottom: "8px",
  color: "#1E293B", // Slate-800
};

const formSubtitleStyle = {
  fontSize: "0.875rem",
  color: "#64748B", // Slate-500
  marginBottom: "32px",
  fontWeight: 400,
};

const inputStyle = {
  fontFamily: "inherit",
  width: "100%",
  padding: "12px 16px",
  marginBottom: "20px",
  borderRadius: "8px",
  border: "1px solid #CBD5E1", // Slate-300
  fontSize: "0.9375rem",
  transition: "all 0.2s ease",
  boxSizing: "border-box",
  backgroundColor: "#F8FAFC", // Slate-50
};

const inputFocusStyle = {
  borderColor: "#6366F1", // Indigo-500
  outline: "none",
  boxShadow: "0 0 0 3px rgba(99, 102, 241, 0.2)",
  backgroundColor: "white",
};

const submitButtonStyle = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#6366F1", // Indigo-500
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontSize: "0.9375rem",
  fontWeight: 600,
  cursor: "pointer",
  marginTop: "8px",
  transition: "all 0.2s ease",
};

const submitButtonHoverStyle = {
  backgroundColor: "#4F46E5", // Indigo-600
};

const forgotPasswordStyle = {
  color: "#6366F1", // Indigo-500
  fontSize: "0.8125rem",
  marginTop: "4px",
  cursor: "pointer",
  textAlign: "right",
  fontWeight: 500,
  textDecoration: "none",
};

const signUpPromptStyle = {
  marginTop: "24px",
  color: "#475569", // Slate-600
  fontSize: "0.875rem",
  textAlign: "center",
  paddingTop: "16px",
  borderTop: "1px solid #E2E8F0", // Slate-200
};

const signUpLinkStyle = {
  color: "#4F46E5", // Indigo-600
  fontWeight: 600,
  cursor: "pointer",
  marginLeft: "4px",
  textDecoration: "none",
};

const errorStyle = {
  color: "#DC2626", // Red-600
  fontSize: "0.875rem",
  marginBottom: "16px",
  padding: "8px 12px",
  backgroundColor: "#FEF2F2", // Red-50
  borderRadius: "6px",
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

function SignIn() {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleMouseEnter = (element) => {
    setIsHovered((prev) => ({ ...prev, [element]: true }));
  };

  const handleMouseLeave = (element) => {
    setIsHovered((prev) => ({ ...prev, [element]: false }));
  };

  const handleInputFocus = (field) => {
    setIsHovered((prev) => ({ ...prev, [`${field}Focused`]: true }));
  };

  const handleInputBlur = (field) => {
    setIsHovered((prev) => ({ ...prev, [`${field}Focused`]: false }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const responseData = await response.json();

      // Store both tokens for different auth methods
      if (responseData.token) {
        localStorage.setItem("authToken", responseData.token);
      }
      if (responseData.userId) {
        localStorage.setItem("userId", responseData.userId);
      }

      navigate("/decks");
    } catch (error) {
      setError(error.message);
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={navBarStyle}>
        <div style={navLogoStyle}>WeFlash</div>
        <div style={navLinksStyle}>
          <button
            style={{
              ...signInButtonStyle,
              ...(isHovered.signIn ? { backgroundColor: "#E0E7FF" } : {}),
            }}
            onMouseEnter={() => handleMouseEnter("signIn")}
            onMouseLeave={() => handleMouseLeave("signIn")}
          >
            Sign in
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
            Sign up
          </button>
        </div>
      </div>

      <div style={mainContentStyle}>
        <form style={formCardStyle} onSubmit={handleSubmit}>
          <h2 style={formTitleStyle}>Welcome back</h2>
          <p style={formSubtitleStyle}>
            Enter your credentials to access your account
          </p>

          {error && (
            <div style={errorStyle}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                  stroke="#9B2C2C"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {error}
            </div>
          )}

          <div style={{ marginBottom: "16px" }}>
            <label
              htmlFor="email"
              style={{
                display: "block",
                marginBottom: "8px",
                fontSize: "0.875rem",
                color: "#1E293B",
                fontWeight: 500,
              }}
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              style={{
                ...inputStyle,
                ...(isHovered.emailFocused ? inputFocusStyle : {}),
              }}
              onFocus={() => handleInputFocus("email")}
              onBlur={() => handleInputBlur("email")}
              required
            />
          </div>

          <div style={{ marginBottom: "8px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <label
                htmlFor="password"
                style={{
                  fontSize: "0.875rem",
                  color: "#1E293B",
                  fontWeight: 500,
                }}
              >
                Password
              </label>
            </div>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              style={{
                ...inputStyle,
                ...(isHovered.passwordFocused ? inputFocusStyle : {}),
              }}
              onFocus={() => handleInputFocus("password")}
              onBlur={() => handleInputBlur("password")}
              required
            />
          </div>

          <a
            href="#forgot-password"
            style={{
              ...forgotPasswordStyle,
              ...(isHovered.forgotPassword
                ? { textDecoration: "underline" }
                : {}),
            }}
            onMouseEnter={() => handleMouseEnter("forgotPassword")}
            onMouseLeave={() => handleMouseLeave("forgotPassword")}
          >
            Forgot password?
          </a>

          <button
            type="submit"
            style={{
              ...submitButtonStyle,
              ...(isHovered.submit ? submitButtonHoverStyle : {}),
              ...(loading ? { opacity: 0.8, pointerEvents: "none" } : {}),
            }}
            onMouseEnter={() => handleMouseEnter("submit")}
            onMouseLeave={() => handleMouseLeave("submit")}
            disabled={loading}
          >
            {loading ? (
              <>
                <svg
                  style={{
                    marginRight: "8px",
                    animation: "spin 1s linear infinite",
                  }}
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2V6M12 18V22M6 12H2M22 12H18M19.0784 19.0784L16.25 16.25M19.0784 4.99994L16.25 7.82837M4.92157 19.0784L7.75 16.25M4.92157 4.99994L7.75 7.82837"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </button>


          <div style={signUpPromptStyle}>
            Don't have an account?{" "}
            <a
              style={{
                ...signUpLinkStyle,
                ...(isHovered.signUpLink
                  ? { textDecoration: "underline" }
                  : {}),
              }}
              onMouseEnter={() => handleMouseEnter("signUpLink")}
              onMouseLeave={() => handleMouseLeave("signUpLink")}
              onClick={() => navigate("/signup")}
            >
              Sign up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
