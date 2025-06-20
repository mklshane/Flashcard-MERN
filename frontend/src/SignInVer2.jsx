import React from "react";

const SignInVer2 = () => {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.logo}>sayings</h1>
        <nav style={styles.nav}>
          <a href="#topics" style={styles.navLink}>
            Topics
          </a>
          <a href="#authors" style={styles.navLink}>
            Authors
          </a>
          <a href="#guide" style={styles.navLink}>
            Guide of the Day
          </a>
          <a href="#discover" style={styles.navLink}>
            Discover
          </a>
          <a href="#gems" style={styles.navLink}>
            Hidden Gems
          </a>
        </nav>
      </header>

      <main style={styles.mainContent}>
        <div style={styles.heroText}>
          <h2 style={styles.heroTitle}>
            Unlock wisdom from the most famous
            <br />
            and forgotten quotes, curated and ranked
            <br />
            by our team of quote-loving editors
          </h2>
          <button style={styles.ctaButton}>Get a quote</button>
        </div>
      </main>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    color: "#2d3748",
    padding: "0 5%",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "2rem 0",
    borderBottom: "1px solid rgba(45, 55, 72, 0.1)",
  },
  logo: {
    fontSize: "2.5rem",
    fontWeight: "700",
    margin: 0,
    color: "#4a5568",
  },
  nav: {
    display: "flex",
    gap: "2rem",
  },
  navLink: {
    textDecoration: "none",
    color: "#4a5568",
    fontWeight: "500",
    fontSize: "1.1rem",
    transition: "color 0.3s ease",
    ":hover": {
      color: "#2d3748",
    },
  },
  mainContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    minHeight: "calc(100vh - 120px)",
    padding: "2rem 0",
  },
  heroText: {
    maxWidth: "800px",
  },
  heroTitle: {
    fontSize: "3rem",
    fontWeight: "700",
    lineHeight: "1.2",
    marginBottom: "2rem",
  },
  ctaButton: {
    background: "#4a5568",
    color: "white",
    border: "none",
    padding: "1rem 2rem",
    fontSize: "1.1rem",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    fontWeight: "600",
    ":hover": {
      background: "#2d3748",
      transform: "translateY(-2px)",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    },
  },
};

export default SignInVer2;
