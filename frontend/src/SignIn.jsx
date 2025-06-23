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
  fontSize: "2.25rem",
  fontWeight: 600,
  color: "#4338CA",
  marginBottom: "30px",
};

const cardStyle = {
  background: "rgba(255, 255, 255, 0.3)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25)",
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

const googleButtonStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "12px",
  padding: "12px",
  backgroundColor: "#fff",
  color: "#000",
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  fontSize: "1rem",
  fontWeight: 500,
  cursor: "pointer",
  transition: "all 0.2s ease",
  width: "100%",
};

const googleButtonHoverStyle = {
  backgroundColor: "#f1f5f9",
};

const googleLogo = (
  <svg width="20" height="20" viewBox="0 0 533.5 544.3">
    <path
      fill="#4285F4"
      d="M533.5 278.4c0-17.4-1.6-34.1-4.6-50.4H272v95.3h147.4c-6.4 34.8-25.6 64.3-54.5 84.2v69.8h87.9c51.4-47.3 80.7-117 80.7-198.9z"
    />
    <path
      fill="#34A853"
      d="M272 544.3c73.8 0 135.7-24.5 180.9-66.6l-87.9-69.8c-24.4 16.3-55.5 25.9-92.9 25.9-71.5 0-132-48.2-153.7-112.9H27.6v70.9c45.2 89.2 137.5 152.5 244.4 152.5z"
    />
    <path
      fill="#FBBC04"
      d="M118.3 320.9c-10.2-30.2-10.2-62.6 0-92.8V157.2H27.6c-40.6 80.4-40.6 176.3 0 256.7l90.7-70.9z"
    />
    <path
      fill="#EA4335"
      d="M272 107.6c39.9 0 75.8 13.8 104.1 40.8l78-78C404.3 25.3 343.5 0 272 0 165.1 0 72.8 63.3 27.6 152.5l90.7 70.9C140 155.8 200.5 107.6 272 107.6z"
    />
  </svg>
);

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
      <div style={logoStyle} onClick={() => {navigate('/')}}>WeFlash</div>
      <div style={cardStyle}>
        <h2 style={titleStyle}>Welcome</h2>
        <p style={subtitleStyle}>
          Sign in with your Google account to continue
        </p>

        {error && <div style={errorStyle}>{error}</div>}

        <button
          style={{
            ...googleButtonStyle,
            ...(isHovered ? googleButtonHoverStyle : {}),
            ...(loading ? { opacity: 0.7, pointerEvents: "none" } : {}),
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleGoogleLogin}
          disabled={loading}
        >
          {googleLogo}
          {loading ? "Signing in..." : "Sign in with Google"}
        </button>
      </div>
    </div>
  );
}

export default SignIn;
