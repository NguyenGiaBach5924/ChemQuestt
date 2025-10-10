import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { IMAGES } from "../constants/Constants.js";

const Homepage = () => {
  const navigate = useNavigate();
  const [hoverChapter1, setHoverChapter1] = useState(false);
  
  // Check if user is authenticated
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    navigate('/');
  };

  const handleChapter1Click = () => {
    navigate('/main');
  };

  return (
    <div className="homepage-container">
      {/* Top Bar */}
      <div className="topbar">
        <div className="logo">
          <img src={IMAGES.logo} alt="ChemQuest Logo" />
          <h1>ChemQuest</h1>
        </div>
        <div className="user-controls">
          <div className="user-avatar">
            <img src={IMAGES.userAvatar} alt="User Avatar" />
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Chapter Selection */}
      <div className="chapters-container">
        <h2>Select a Chapter</h2>
        
        <div className="chapters-grid">
          {/* Chapter 1 */}
          <div 
            className="chapter-card"
            onMouseEnter={() => setHoverChapter1(true)}
            onMouseLeave={() => setHoverChapter1(false)}
            onClick={handleChapter1Click}
          >
            <div className="chapter-image">
              <img src={IMAGES.nucleus} alt="Chapter 1: Atoms" />
              {hoverChapter1 && (
                <div className="play-button">
                  <i className="play-icon">▶</i>
                </div>
              )}
            </div>
            <div className="chapter-info">
              <h3>Chapter 1: Atoms</h3>
              <p>Learn about the building blocks of matter</p>
            </div>
          </div>

          {/* Chapter 2 - Locked */}
          <div className="chapter-card disabled">
            <div className="chapter-image grayscale">
              <img src={IMAGES.electron} alt="Chapter 2: Coming Soon" />
              <div className="locked-overlay">
                <span>Not Open Yet</span>
              </div>
            </div>
            <div className="chapter-info">
              <h3>Chapter 2</h3>
              <p>Coming soon...</p>
            </div>
          </div>

          {/* Chapter 3 - Locked */}
          <div className="chapter-card disabled">
            <div className="chapter-image grayscale">
              <img src={IMAGES.Proton} alt="Chapter 3: Coming Soon" />
              <div className="locked-overlay">
                <span>Not Open Yet</span>
              </div>
            </div>
            <div className="chapter-info">
              <h3>Chapter 3</h3>
              <p>Coming soon...</p>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="chapter-navigation">
          <button className="nav-arrow prev" disabled>◀</button>
          <div className="nav-indicators">
            <span className="active"></span>
            <span></span>
            <span></span>
          </div>
          <button className="nav-arrow next">▶</button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;