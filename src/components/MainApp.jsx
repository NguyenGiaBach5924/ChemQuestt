import React, { useEffect, useRef, useState } from "react";
import "../App.css";
import Scene1 from "./scene1";
import Scene2 from "./scene2";
import Scene3 from "./scene3";
import Scene4 from "./scene4";
import Character from "./Character";
import ProcessBar from "./processBar";
import Book from "./book";
import Setting from "./setting";

function MainApp() {
  const horizontalRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const horizontal = horizontalRef.current;

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);

      // Move horizontal world
      if (horizontal) {
        horizontal.style.transform = `translateX(-${currentScrollY}px)`;
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="scroll-wrapper">
      <ProcessBar scrollY={scrollY} />
      <Book />
      <Character />
      <Setting />
      <div className="horizontal-scroll" ref={horizontalRef}>
        <Scene1 scrollY={scrollY} />
        <Scene2 />
        <Scene3 />
        <Scene4 />
      </div>
    </div>
  );
}

export default MainApp; 