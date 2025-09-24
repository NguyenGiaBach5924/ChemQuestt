import React, { useEffect, useState } from "react";
import "../App.css";

const ProcessBar = ({ scrollY = 0, elapsedSeconds = 0 }) => {
  const [currentScene, setCurrentScene] = useState(1);
  const [progress, setProgress] = useState(0);
  const [isExpanded, setIsExpanded] = useState(true);

  // Scene breakpoints (approximate scroll positions where scenes change)
  const sceneBreakpoints = {
    1: { start: 0, end: 7418 },
    2: { start: 7418, end: 15456.8 },
    3: { start: 15456.8, end: 23572 },
    4: { start: 23572, end: 30870 }
  };

  const sceneNames = {
    1: "Meet the Atom",
    2: "Atomic Number and Mass",
    3: "Electron Shells",
    4: "Bohr Model"
  };

  useEffect(() => {
    // Determine current scene based on scroll position
    let newScene = 1;
    for (let scene = 1; scene <= 4; scene++) {
      if (scrollY >= sceneBreakpoints[scene].start && scrollY < sceneBreakpoints[scene].end) {
        newScene = scene;
        break;
      }
    }
    setCurrentScene(newScene);

    // Calculate overall progress (0-100%)
    const totalDistance = sceneBreakpoints[4].end - sceneBreakpoints[1].start;
    const currentProgress = Math.min((scrollY / totalDistance) * 100, 100);
    setProgress(currentProgress);
  }, [scrollY]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const mm = String(minutes).padStart(2, '0');
    const ss = String(seconds).padStart(2, '0');
    return hours > 0 ? `${hours}:${mm}:${ss}` : `${mm}:${ss}`;
  };

  return (
    <div className={`process-bar-container ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="process-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        <div className="timer-display">{formatTime(elapsedSeconds)}</div>
        
        {/* Scene indicators */}
        {Object.keys(sceneBreakpoints).map((sceneNum) => {
          const scene = parseInt(sceneNum);
          const isActive = scene <= currentScene;
          const isCurrent = scene === currentScene;
          
          return (
            <div
              key={scene}
              className={`scene-indicator ${isActive ? 'active' : ''} ${isCurrent ? 'current' : ''}`}
              style={{
                left: `${((sceneBreakpoints[scene].start - sceneBreakpoints[1].start) / (sceneBreakpoints[4].end - sceneBreakpoints[1].start)) * 100}%`
              }}
            >
              <div className="indicator-dot"></div>
              <div className={`scene-label ${isExpanded ? 'visible' : 'hidden'}`}>
                {sceneNames[scene]}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Current scene info */}
      <div className={`current-scene-info ${isExpanded ? 'visible' : 'hidden'}`}>
        <span className="scene-number">Scene {currentScene}</span>
        <span className="scene-name">{sceneNames[currentScene]}</span>
        <span className="progress-percentage">{Math.round(progress)}%</span>
      </div>

      {/* Expand/Collapse Button */}
      <button 
        className="expand-collapse-btn"
        onClick={toggleExpand}
        title={isExpanded ? "Collapse" : "Expand"}
      >
        {isExpanded ? '−' : '+'}
      </button>
    </div>
  );
};

export default ProcessBar;
