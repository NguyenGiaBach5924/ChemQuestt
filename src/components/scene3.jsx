import React from "react";
import "../App.css"; // or split into a new CSS later
import BackgroundElements from "./BackgroundElements.jsx";
import { IMAGES } from "../constants/Constants.js";
import StarryNight from "./StarryNight";

const Scene3 = () => {
  return (
    <section className="scene3">
        <StarryNight />
        <BackgroundElements />
        <img src={IMAGES.stair2} alt="Stair 2" className="stair2" />
        <img src={IMAGES.gate3} alt="Gate 3" className="gate3" />
        <div className="land-container">
        <div className="sea"></div>
        <div className="sea-wave"></div>
        <div className="dock-column"></div>
        <div className="dock-floor"></div>
        <img id="gate4" src={IMAGES.gate4} className="gate4" />
        </div>
    </section>
  );
};

export default Scene3;
