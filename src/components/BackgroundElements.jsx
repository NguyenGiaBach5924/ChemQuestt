import React from "react";
import { IMAGES } from "../constants/Constants";
import "../App.css";

const BackgroundElements = ({ scrollY = 0 }) => {
  return (
    <div className="background-container">
      <div className="clouds-container">
        <img src={IMAGES.cloud1} alt="cloud1" className="cloud cloud1" />
        <img src={IMAGES.cloud2} alt="cloud2" className="cloud cloud2" />
        <img src={IMAGES.cloud1} alt="cloud3" className="cloud cloud3" />
        <img src={IMAGES.cloud2} alt="cloud4" className="cloud cloud4" />
        <img src={IMAGES.cloud1} alt="cloud5" className="cloud cloud5" />
        <img src={IMAGES.cloud2} alt="cloud6" className="cloud cloud6" />
      </div>
    </div>
  );
};

export default BackgroundElements; 