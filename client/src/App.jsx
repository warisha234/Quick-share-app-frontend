import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

// Backend URL
const API_URL = "http://localhost:5000";

function App() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  // Fetch Data
  const fetchData = async () => {
    try {
      const res = await axios.get(API_URL);
      setText(res.data.text);
    } catch (err) {
      console.log("Fetch Error:", err);
    }
  };

  // Save Data
  const handleSave = async () => {
    setLoading(true);

    try {
      await axios.post(`${API_URL}/save`, {
        text,
      });

      setMessage("✅ Saved Successfully");

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (err) {
      setMessage("❌ Error Saving Data");
    }

    setLoading(false);
  };

  return (
  <div className="container">

    <div className="card">

      

      {/* LEFT SIDE */}
      <div className="left-panel">

        <div>
          <h1 className="logo">QuickShare</h1>

          <div className="hero-content">
            <h2 className="hero-title">
              Share Instantly.
              <br />
              <span>Anywhere.</span>
            </h2>

            <p className="hero-subtitle">
              QuickShare lets you share text between
              devices on the same network in seconds.
            </p>
          </div>
        </div>

        <div className="secure-badge">
          🔒 Secure. Private. Only on your network.
        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="right-panel">

        <div className="network-status">
          <span>Same Network</span>
          <div className="dot"></div>
        </div>

        <h1 className="title">
          Enter Text to Share
        </h1>

        <p className="subtitle">
          Your text will instantly appear on connected devices.
        </p>

        <textarea
          className="textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your message here..."
        />

        <button
          className="button"
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save / Sync"}
        </button>

        {message && (
          <p className="message">
            {message}
          </p>
        )}

        <p className="footer">
          Expires in 30 minutes of inactivity
        </p>

      </div>

    </div>

  </div>
);
}

export default App;