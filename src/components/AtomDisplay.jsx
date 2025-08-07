import React, { useState } from "react";
import { IMAGES } from "../constants/Constants.js";
import ThreeAtom from "./ThreeAtom.jsx";
import "../App.css";

const AtomDisplay = () => {
  const [showElectronInfo, setShowElectronInfo] = useState(false);
  const [showNucleusInfo, setShowNucleusInfo] = useState(false);
  const [showProtonInfo, setShowProtonInfo] = useState(false);
  const [showNeutronInfo, setShowNeutronInfo] = useState(false);
  const [showAtomInfo, setShowAtomInfo] = useState(false);

  return (
    <div className="level1">
      <img src={IMAGES.note} alt="Atom" className="Atom" />
      <div className="nameAtom">
        <h2>Atom</h2>
      </div>
      <img 
        src={IMAGES.electron} 
        alt="electron"
        className="electronAlone"
        onClick={() => setShowElectronInfo(!showElectronInfo)}
      />
      <img src={IMAGES.electronEyeClose} alt="electron blinking" className="electronAlone electron-eye-closed" />
      {showElectronInfo && (
        <div className="electron-info">
          <h3>Electron</h3>
          <p>A negatively charged subatomic particle that orbits around the nucleus of an atom.</p>
        </div>
      )}
      <img 
        src={IMAGES.nucleus} 
        alt="nucleus" 
        className="nucleusAlone" 
        onClick={() => {
          setShowNucleusInfo(!showNucleusInfo);
          setShowProtonInfo(!showProtonInfo);
          setShowNeutronInfo(!showNeutronInfo);
        }}
      />
      <img src={IMAGES.NucleusEye} alt="nucleus eye" className="nucleus-eye float-combo" />
      {showNucleusInfo && (
        <div className="nucleus-info">
          <h3>Nucleus</h3>
          <p>The central core of an atom, containing protons and neutrons.</p>
        </div>
      )}
      {showProtonInfo && (
        <div className="proton-info">
          <h3>Proton</h3>
          <p>A positively charged subatomic particle found in the nucleus of an atom.</p>
        </div>
      )}
      {showNeutronInfo && (
        <div className="neutron-info">
          <h3>Neutron</h3>
          <p>A neutral subatomic particle found in the nucleus of an atom.</p>
        </div>
      )}
      <div className="atom-container">
        {[...Array(8)].map((_, index) => (
          <img
            key={index}
            src={IMAGES.electron}
            alt="electron"
            className={`electron${index + 1}`}
          />
        ))}
      </div>
      <img src={IMAGES.nucleus} alt="nucleus" className="nucleus" />
      <img src={IMAGES.NucleusEye} alt="nucleus eye" className="nucleus-eye2 float-combo" /> 
      {showAtomInfo && (
        <div className="atom-info">
          <h3>Atom</h3>
          <p>The basic unit of matter, composed of protons, neutrons, and electrons.</p>
        </div>
      )}
      <ThreeAtom />
      <img src={IMAGES.stair} alt="stair" className="stair" />
    </div>
  );
};

export default AtomDisplay; 