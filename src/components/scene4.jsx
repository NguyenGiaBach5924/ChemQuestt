import React from "react";
import "../App.css"; // or split into a new CSS later
import BackgroundElements from "./BackgroundElements.jsx";
import StarryNight from "./StarryNight";
import { IMAGES } from "../constants/Constants.js";
import Boat from "./boat";

const Scene4 = () => {
  return (
    <section className="scene4">
      <StarryNight />
      <BackgroundElements />
      <Boat />
      <div className="land-container">
        <div className="sea"></div>
        <div className="sea-wave"></div>
      </div>
    </section>
  );
};

export default Scene4;
