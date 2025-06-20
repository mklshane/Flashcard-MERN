import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./config/firebase";
import backgroundImg from "./assets/furfle.png";

// --- Styles ---
const containerStyle = {
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundImage: `url(${backgroundImg})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  padding: "20px",
};

const logoStyle = {
  fontSize: "2rem",
  fontWeight: 700,
  color: "#4338CA",
  marginBottom: "30px",
};

const cardStyle = {
  background: "rgba(255, 255, 255, 0.25)",
  boxShadow: "0 8px 32px rgba(173, 151, 199, 0.55)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  borderRadius: "20px",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  padding: "40px",
  maxWidth: "400px",
  width: "100%",
  textAlign: "center",
};

const titleStyle = {
  fontSize: "1.75rem",
  fontWeight: 700,
  color: "#1E293B",
  marginBottom: "10px",
};

const subtitleStyle = {
  fontSize: "0.95rem",
  color: "#64748B",
  marginBottom: "32px",
};

const buttonStyle = {
  padding: "12px",
  backgroundColor: "#6366F1",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontSize: "1rem",
  fontWeight: 600,
  cursor: "pointer",
  transition: "all 0.2s ease",
  width: "100%",
};

const buttonHoverStyle = {
  backgroundColor: "#4F46E5",
};

const errorStyle = {
  color: "#DC2626",
  backgroundColor: "#FEF2F2",
  borderRadius: "6px",
  padding: "10px",
  marginBottom: "20px",
  fontSize: "0.875rem",
};

// --- Component ---
function SignIn() {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const firebaseToken = await result.user.getIdToken();
      localStorage.setItem("firebaseToken", firebaseToken);
      navigate("/decks");
    } catch (err) {
      console.error(err);
      setError("Google Sign-in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={logoStyle}>WeFlash</div>
      <div style={cardStyle}>
        <h2 style={titleStyle}>Welcome</h2>
        <p style={subtitleStyle}>
          Sign in with your Google account to continue
        </p>

        {error && <div style={errorStyle}>{error}</div>}

        <button
          style={{
            ...buttonStyle,
            ...(isHovered ? buttonHoverStyle : {}),
            ...(loading ? { opacity: 0.7, pointerEvents: "none" } : {}),
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleGoogleLogin}
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign in with Google"}
        </button>
      </div>
    </div>
  );
}

export default SignIn;
