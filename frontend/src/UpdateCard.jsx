import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function UpdateCard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ question: "", answer: "" });
  const [error, setError] = useState(null);

  const baseURL =
    import.meta.env.VITE_API_URL || "http://localhost:5000/api/flashcards"; // fallback URL in case env variable is not set

  useEffect(() => {
    console.log("Fetching flashcard with ID:", id);
    console.log("Base URL:", baseURL);
    axios
      .get(`${baseURL}/${id}`)
      .then((res) => {
        if (res.data.success) {
          setFormData({
            question: res.data.data.question,
            answer: res.data.data.answer,
          });
        } else {
          setError("Flashcard not found.");
        }
      })
      .catch((err) => {
        console.error("Error fetching flashcard:", err);
        setError("Failed to fetch flashcard");
      });
  }, [id]);

  const handleSubmit = async () => {
    try {
      await axios.put(`${baseURL}/${id}`, formData);
      navigate("/"); // Redirect to the homepage after successful update
    } catch {
      setError("Failed to update flashcard");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Update Flashcard</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        style={{
          display: "block",
          margin: "10px 0",
          padding: "10px",
          width: "300px",
        }}
        value={formData.question}
        onChange={(e) => setFormData({ ...formData, question: e.target.value })}
        placeholder="Question"
      />
      <input
        style={{
          display: "block",
          margin: "10px 0",
          padding: "10px",
          width: "300px",
        }}
        value={formData.answer}
        onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
        placeholder="Answer"
      />
      <button
        onClick={handleSubmit}
        style={{
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Save
      </button>
      <button
        onClick={() => navigate("/")}
        style={{
          padding: "10px 20px",
          marginLeft: "10px",
          backgroundColor: "#999",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Cancel
      </button>
    </div>
  );
}

export default UpdateCard;
