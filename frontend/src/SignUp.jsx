import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import backgroundImg from "./assets/furfle.png";

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
  paddingTop: "80px",
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
  color: "#4338CA", // Indigo-600 (from Sign In)
  fontWeight: 700,
  cursor: "pointer",
  letterSpacing: "-0.5px",
  "@media (maxWidth: 768px)": {
    fontSize: "1.3rem",
  },
  "@media (maxWidth: 480px)": {
    fontSize: "1.2rem",
  },
};
const navLinksStyle = {
  display: "flex",
  gap: "24px",
  alignItems: "center",
  "@media (maxWidth: 768px)": {
    gap: "16px",
  },
  "@media (maxWidth: 480px)": {
    gap: "12px",
  },
};

const navButtonStyle = {
  fontFamily: "inherit",
  padding: "8px 16px",
  borderRadius: "8px",
  fontSize: "0.875rem",
  fontWeight: 500,
  cursor: "pointer",
  transition: "all 0.2s ease",
  "@media (maxWidth: 480px)": {
    padding: "6px 12px",
    fontSize: "0.8rem",
  },
};

const signInButtonStyle = {
  ...navButtonStyle,
  backgroundColor: "transparent",
  color: "#4338CA", // Indigo-600 (from Sign In)
  border: "1px solid rgba(67, 56, 202, 0.3)",
};

const signUpButtonStyle = {
  ...navButtonStyle,
  backgroundColor: "#6366F1", // Indigo-500 (from Sign In)
  color: "white",
  border: "1px solid #6366F1",
};


// Main content
const mainContentStyle = {
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px 5%",
  width: "100%",
  boxSizing: "border-box",
  "@media (maxWidth: 768px)": {
    padding: "30px 4%",
  },
  "@media (maxWidth: 480px)": {
    padding: "20px 3%",
    alignItems: "flex-start",
  },
};

// Form card with warm accents
const formCardStyle = {
  background: "rgba(255, 255, 255, 0.25)",
  boxShadow: "0 8px 32px 0 rgba(173, 151, 199, 0.55)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  borderRadius: "20px",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  padding: "30px",
  width: "100%",
  maxWidth: "400px",
  textAlign: "left",
  "@media (maxWidth: 768px)": {
    padding: "25px",
    maxWidth: "380px",
  },
  "@media (maxWidth: 480px)": {
    padding: "20px",
    borderRadius: "16px",
    maxWidth: "100%",
    marginTop: "20px",
  },
};

const formTitleStyle = {
  fontFamily: "inherit",
  fontSize: "1.5rem",
  fontWeight: 700,
  marginBottom: "8px",
  color: "#1E293B", // Slate-800 (from Sign In)
  "@media (maxWidth: 480px)": {
    fontSize: "1.3rem",
  },
};

const formSubtitleStyle = {
  fontSize: "0.875rem",
  color: "#64748B", // Slate-500 (from Sign In)
  marginBottom: "32px",
  fontWeight: 400,
  "@media (maxWidth: 480px)": {
    fontSize: "0.8rem",
    marginBottom: "24px",
  },
};

const inputStyle = {
  fontFamily: "inherit",
  width: "100%",
  padding: "12px 16px",
  marginBottom: "20px",
  borderRadius: "8px",
  border: "1px solid #CBD5E1", // Slate-300 (from Sign In)
  fontSize: "0.9375rem",
  transition: "all 0.2s ease",
  boxSizing: "border-box",
  backgroundColor: "#F8FAFC", // Slate-50 (from Sign In)
  "@media (maxWidth: 480px)": {
    padding: "10px 14px",
    fontSize: "0.875rem",
    marginBottom: "16px",
  },
};

const inputFocusStyle = {
  borderColor: "#6366F1", // Indigo-500 (from Sign In)
  outline: "none",
  boxShadow: "0 0 0 3px rgba(99, 102, 241, 0.2)",
  backgroundColor: "white",
};

const submitButtonStyle = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#6366F1", // Indigo-500 (from Sign In)
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
  backgroundColor: "#4F46E5", 
};

const signInPromptStyle = {
  marginTop: "24px",
  color: "#475569", 
  fontSize: "0.875rem",
  textAlign: "center",
  paddingTop: "16px",
  borderTop: "1px solid #E2E8F0", 
};

const signInLinkStyle = {
  color: "#4F46E5", 
  fontWeight: 600,
  cursor: "pointer",
  marginLeft: "4px",
  textDecoration: "none",
};

const errorStyle = {
  color: "#DC2626", 
  fontSize: "0.875rem",
  marginBottom: "16px",
  padding: "8px 12px",
  backgroundColor: "#FEF2F2", 
  borderRadius: "6px",
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

function SignUp() {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    // Validate form
    if (!formData.name || !formData.email || !formData.password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        // Redirect to decks page after successful signup
        navigate("/decks");
      } else {
        throw new Error(response.data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setError(
        error.response?.data?.message ||
          error.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <div style={containerStyle}>
      <div style={navBarStyle}>
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
            Sign in
          </button>
          <button
            style={{
              ...signUpButtonStyle,
              ...(isHovered.signUp ? submitButtonHoverStyle : {}),
            }}
            onMouseEnter={() => handleMouseEnter("signUp")}
            onMouseLeave={() => handleMouseLeave("signUp")}
          >
            Sign up
          </button>
        </div>
      </div>

      <div style={mainContentStyle}>
        <form style={formCardStyle} onSubmit={handleSubmit}>
          <h2 style={formTitleStyle}>Create an account</h2>
          <p style={formSubtitleStyle}>
            Enter your details to start using WeFlash
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
              htmlFor="name"
              style={{
                display: "block",
                marginBottom: "8px",
                fontSize: "0.875rem",
                color: "#1E293B",
                fontWeight: 500,
              }}
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              style={{
                ...inputStyle,
                ...(isHovered.nameFocused ? inputFocusStyle : {}),
              }}
              onFocus={() => handleInputFocus("name")}
              onBlur={() => handleInputBlur("name")}
              required
            />
          </div>

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

          <div style={{ marginBottom: "16px" }}>
            <label
              htmlFor="password"
              style={{
                display: "block",
                marginBottom: "8px",
                fontSize: "0.875rem",
                color: "#1E293B",
                fontWeight: 500,
              }}
            >
              Password
            </label>
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

          <div style={{ marginBottom: "16px" }}>
            <label
              htmlFor="confirmPassword"
              style={{
                display: "block",
                marginBottom: "8px",
                fontSize: "0.875rem",
                color: "#1E293B",
                fontWeight: 500,
              }}
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              style={{
                ...inputStyle,
                ...(isHovered.confirmPasswordFocused ? inputFocusStyle : {}),
              }}
              onFocus={() => handleInputFocus("confirmPassword")}
              onBlur={() => handleInputBlur("confirmPassword")}
              required
            />
          </div>

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
                Creating account...
              </>
            ) : (
              "Sign up"
            )}
          </button>

          <div style={signInPromptStyle}>
            Already have an account?{" "}
            <a
              style={{
                ...signInLinkStyle,
                ...(isHovered.signInLink
                  ? { textDecoration: "underline" }
                  : {}),
              }}
              onMouseEnter={() => handleMouseEnter("signInLink")}
              onMouseLeave={() => handleMouseLeave("signInLink")}
              onClick={() => navigate("/signin")}
            >
              Sign in
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
