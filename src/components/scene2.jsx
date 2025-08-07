import React from "react";
import "../App.css"; // or split into a new CSS later
import { IMAGES } from "../constants/Constants";


const Scene2 = () => {
  return (
    <div className="scene2">
        <section className="scene2">
            <img src={IMAGES.gate2} alt="Gate 2" className="gate2" />
            <img src={IMAGES.frame} alt="Frame" className="frame" />
            <div className="land-container">
            <div className="floor"></div>
            <div className="panel"></div>
            </div>
        </section>
    </div>
  );
};

export default Scene2;
