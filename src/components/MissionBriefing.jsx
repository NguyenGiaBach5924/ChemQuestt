import React from "react";
import { MISSION_BRIEFING, IMAGES } from "../constants/Constants";
import "../App.css";

const MissionBriefing = () => (
  <div className="instruction">
    <img src={IMAGES.note} alt="instruction" className="note" />
    <div className="text">
      <h2>{MISSION_BRIEFING.title}</h2>
      {MISSION_BRIEFING.paragraphs.map((text, index) => (
        <p key={index}>{text}</p>
      ))}
    </div>
  </div>
);

export default MissionBriefing; 