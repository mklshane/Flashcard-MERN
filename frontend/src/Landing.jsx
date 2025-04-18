import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Container style
const containerStyle = {
  fontFamily: "'Montserrat', sans-serif",
  padding: "0",
  textAlign: "center",
  backgroundColor: "#ffffff",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
};

// Navbar style
const navBarStyle = {
  width: "100%",
  padding: "20px 40px",
  backgroundColor: "#ffffff",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: 1000,
  boxSizing: "border-box",
};

const navLogoStyle = {
  fontSize: "1.8rem",
  color: "#000000",
  fontWeight: "bold",
  cursor: "pointer",
};

const navLinksStyle = {
  display: "flex",
  gap: "30px",
  alignItems: "center",
  color: "#333333",
  fontSize: "1rem",
  fontWeight: "500",
  cursor: "pointer",
  transition: "color 0.2s ease",
};

const navButtonStyle = {
  fontFamily: "'Montserrat', sans-serif",
  padding: "8px 16px",
  borderRadius: "6px",
  fontSize: "0.9rem",
  fontWeight: "500",
  cursor: "pointer",
  transition: "all 0.2s ease",
};

const signInButtonStyle = {
  ...navButtonStyle,
  backgroundColor: "transparent",
  color: "#333333",
  border: "none",
};

const signUpButtonStyle = {
  ...navButtonStyle,
  backgroundColor: "#6c63ff",
  color: "white",
  border: "none",
};

// Main content style
const mainContentStyle = {
  marginTop: "80px",
  padding: "60px 20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const formCardStyle = {
  backgroundColor: "white",
  borderRadius: "12px",
  padding: "40px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
  width: "400px",
  maxWidth: "90%",
  textAlign: "center",
};

const formTitleStyle = {
  fontFamily: "'Montserrat', sans-serif",
  fontSize: "1.5rem",
  fontWeight: "600",
  marginBottom: "30px",
  color: "#333333",
};

const inputStyle = {
  fontFamily: "'Montserrat', sans-serif",
  width: "100%",
  padding: "12px 16px",
  marginBottom: "20px",
  borderRadius: "8px",
  border: "1px solid #dddddd",
  fontSize: "0.95rem",
  transition: "border-color 0.2s ease",
};

const inputFocusStyle = {
  borderColor: "#6c63ff",
  outline: "none",
};

const submitButtonStyle = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#6c63ff",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontSize: "1rem",
  fontWeight: "500",
  cursor: "pointer",
  marginTop: "10px",
  transition: "background-color 0.2s ease",
};

const submitButtonHoverStyle = {
  backgroundColor: "#5a52d6",
};

const forgotPasswordStyle = {
  color: "#6c63ff",
  fontSize: "0.85rem",
  marginTop: "10px",
  cursor: "pointer",
  textAlign: "right",
};

const signUpPromptStyle = {
  marginTop: "30px",
  color: "#666666",
  fontSize: "0.9rem",
};

const signUpLinkStyle = {
  color: "#6c63ff",
  fontWeight: "500",
  cursor: "pointer",
  marginLeft: "5px",
};

function Landing() {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/decks");
  };

  return (
    <div style={containerStyle}>
      <div style={navBarStyle}>
        <div style={navLogoStyle}>WeFlash</div>
        <div style={navLinksStyle}>
          
          <button
            style={{
              ...signInButtonStyle,
              ...(isHovered.signIn ? { color: "#6c63ff" } : {}),
            }}
            onMouseEnter={() => handleMouseEnter("signIn")}
            onMouseLeave={() => handleMouseLeave("signIn")}
          >
            Sign in
          </button>
          <button
            style={{
              ...signUpButtonStyle,
              ...(isHovered.signUp ? { backgroundColor: "#5a52d6" } : {}),
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
          <h2 style={formTitleStyle}>Sign in</h2>
          <input
            type="email"
            name="email"
            placeholder="Username or email address"
            value={formData.email}
            onChange={handleChange}
            style={{
              ...inputStyle,
              ...(isHovered.emailFocused ? inputFocusStyle : {}),
            }}
            onFocus={() => handleInputFocus("email")}
            onBlur={() => handleInputBlur("email")}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            style={{
              ...inputStyle,
              ...(isHovered.passwordFocused ? inputFocusStyle : {}),
            }}
            onFocus={() => handleInputFocus("password")}
            onBlur={() => handleInputBlur("password")}
          />
          <div
            style={forgotPasswordStyle}
            onMouseEnter={() => handleMouseEnter("forgotPassword")}
            onMouseLeave={() => handleMouseLeave("forgotPassword")}
          >
            Forgot password?
          </div>
          <button
            type="submit"
            style={{
              ...submitButtonStyle,
              ...(isHovered.submit ? submitButtonHoverStyle : {}),
            }}
            onMouseEnter={() => handleMouseEnter("submit")}
            onMouseLeave={() => handleMouseLeave("submit")}
          >
            Sign in
          </button>
          <div style={signUpPromptStyle}>
            Don't have an account?
            <span
              style={signUpLinkStyle}
              onMouseEnter={() => handleMouseEnter("signUpLink")}
              onMouseLeave={() => handleMouseLeave("signUpLink")}
              onClick={() => navigate("/signup")}
            >
              Sign up
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Landing;
