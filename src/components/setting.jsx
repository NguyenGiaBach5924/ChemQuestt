import React, { useState } from 'react';
import { IMAGES } from "../constants/Constants.js";

const Setting = () => {
  const [open, setOpen] = useState(false);
  const [musicOn, setMusicOn] = useState(true);

  const handleExit = () => {
    // Placeholder: Add your exit logic here
  };

  const handleRestart = () => {
    // Placeholder: Add your restart logic here
  };

  return (
    <>
      <div className="setting-container" onClick={() => setOpen(true)}>
        <img
          src={IMAGES.setting}
          alt="Settings"
          className="setting-icon"
        />
      </div>
      {open && (
        <div className="setting-panel-overlay" onClick={() => setOpen(false)}>
          <div className="setting-panel" onClick={e => e.stopPropagation()}>
            <button className="setting-panel-close" onClick={() => setOpen(false)}>&times;</button>
            <h2>Settings</h2>
            <div className="setting-panel-buttons">
              <button onClick={() => setMusicOn(m => !m)} className="setting-btn">
                <img src="/music.png" alt="Music" className="setting-btn-icon" />
                {musicOn ? 'Music: On' : 'Music: Off'}
              </button>
              <button onClick={handleRestart} className="setting-btn restart">
                <img src="/restart.png" alt="Restart" className="setting-btn-icon" />
                Restart
              </button>
              <button onClick={handleExit} className="setting-btn exit">
                <img src="/home.png" alt="Exit" className="setting-btn-icon" />
                Exit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Setting;