import React, { useEffect, useState } from "react";
import { IMAGES } from "../constants/Constants.js";

const Boat = ({ className = "boat", style = {} }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      setIsVisible(window.scrollY < 23608);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <img
      src={IMAGES.boat}
      alt="Boat"
      className={className}
      style={{
        position: "absolute",
        left: "-50px",
        bottom: -70,
        zIndex: 15,
        width: "500px",
        height: "380px",
        ...style,
      }}
    />
  );
};

export default Boat;
