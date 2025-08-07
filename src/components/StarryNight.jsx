import React, { useState, useEffect } from "react";
import "../App.css";

const StarryNight = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    // Create initial stars
    const initialStars = [...Array(150)].map((_, index) => ({
      id: index, 
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
      opacity: 0
    }));
    setStars(initialStars);

    // Update star opacity every 100ms
    const interval = setInterval(() => {
      setStars(currentStars => 
        currentStars.map(star => ({
          ...star,
          opacity: Math.sin((Date.now() / 1000 + star.delay) * Math.PI) * 0.5 + 0.5
        }))
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="starry-night">
      {stars.map(star => (
        <div
          key={star.id}
          className="star"
          style={{
            left: star.left,
            top: star.top,
            opacity: star.opacity,
            transform: `translateZ(0) scale(${1 + star.opacity * 1})`
          }}
        />
      ))}
    </div>
  );
};

export default StarryNight; 