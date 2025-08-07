import React, { useEffect, useRef } from "react";
import "../App.css";
import MissionBriefing from "./MissionBriefing.jsx";
import AtomDisplay from "./AtomDisplay.jsx";
import BackgroundElements from "./BackgroundElements.jsx";
import { IMAGES } from "../constants/Constants.js";

const Scene1 = ({ scrollY = 0 }) => {
  const sceneRef = useRef(null);

  useEffect(() => {
    if (sceneRef.current) {
      if (scrollY > 100) {
        sceneRef.current.classList.add('scrolled');
      } else {
        sceneRef.current.classList.remove('scrolled');
      }
    }
  }, [scrollY]);

  return (
    <section className="scene1" ref={sceneRef}>
        <BackgroundElements scrollY={scrollY} />
        <div className="Start">
            <img id="ribbon" src={IMAGES.ribbon} className="ribbon" />
            <img id="bottles" src={IMAGES.bottles} className="bottle" />
            <MissionBriefing />
            <img id="gate1" src={IMAGES.gate1} className="gate1" />
        </div>
        <AtomDisplay />
        <div className="land-container">
            <div className="ground"></div>
            <div className="grass"></div>
        </div>
    </section>
  );
};

export default Scene1;
