import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Leaderboard = ({ items }) => {
  return (
    <table className="endgame-leaderboard">
      <thead>
        <tr>
          <th>Name</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        {items.map((entry, idx) => (
          <tr key={entry.id ?? idx}>
            <td>{entry.name}</td>
            <td>{entry.score}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const EndGame = () => {
  const navigate = useNavigate();
  const [leaderboard, setLeaderboard] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const handleReplay = () => {
    // Clear cached quiz so a new one will be generated on next open
    try {
      localStorage.removeItem('quiz_questions');
    } catch (e) {
      console.error('Failed to clear cached quiz questions', e);
    }
    navigate("/main");
  };

  const handleHome = () => {
    navigate("/");
  };

  useEffect(() => {
    // Post latest score to backend if available
    (async () => {
      try {
        const rawScore = localStorage.getItem('latest_quiz_score');
        const token = localStorage.getItem('auth_token');
        if (!rawScore || !token) return;
        const score = Number(rawScore);
        if (!Number.isFinite(score)) return;

        await fetch('http://localhost:3000/api/score', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ score })
        });
        setSubmitted(true);
      } catch (e) {
        console.error('Failed to submit score', e);
      }
    })();

    // Reset body height when this component mounts
    document.body.style.height = "100vh";
    // Optionally, also reset overflow
    document.body.style.overflow = "hidden";
    // Clean up on unmount (optional, but good practice)
    return () => {
      document.body.style.height = "";
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    // Fetch leaderboard (public)
    (async () => {
      try {
        const res = await fetch('http://localhost:3000/api/leaderboard');
        const data = await res.json();
        if (Array.isArray(data)) setLeaderboard(data);
      } catch (e) {
        console.error('Failed to load leaderboard', e);
      }
    })();
  }, [submitted]);

  return (
    <div className="endgame-container">
      <div className="endgame-card">
        <h1>Congratulations! 🎉</h1>
        <h2>Leaderboard</h2>
        <Leaderboard items={leaderboard} />
        <div className="endgame-buttons">
          <button onClick={handleReplay}>Replay</button>
          <button onClick={handleHome}>Home</button>
        </div>
      </div>
    </div>
  );
};

export default EndGame;
