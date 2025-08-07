import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const leaderboardData = [
  { name: "Alice", score: 95 },
  { name: "Bob", score: 90 },
  { name: "Charlie", score: 85 },
];

const EndGame = () => {
  const navigate = useNavigate();

  const handleReplay = () => {
    // Reset quiz state logic here if needed
    navigate("/book"); // Assuming /book is the quiz start
  };

  const handleHome = () => {
    navigate("/");
  };

  useEffect(() => {
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

  return (
    <div className="endgame-container">
      <div className="endgame-card">
        <h1>Congratulations! 🎉</h1>
        <h2>Leaderboard</h2>
        <table className="endgame-leaderboard">
          <thead>
            <tr>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((entry, idx) => (
              <tr key={idx}>
                <td>{entry.name}</td>
                <td>{entry.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="endgame-buttons">
          <button onClick={handleReplay}>Replay</button>
          <button onClick={handleHome}>Home</button>
        </div>
      </div>
    </div>
  );
};

export default EndGame;
