import React, { useState, useEffect, useRef } from 'react';
import '../App.css';
import { IMAGES } from '../constants/Constants.js';

const FRAME_WIDTH = 195;   // width of a single frame in px
const FRAME_HEIGHT = 184.5;  // height of a single frame in px
const FRAMES_PER_ROW = 3;  // number of frames in each row
const SCENE4_START = 23608; // scroll position where scene4 starts

const Character = () => {
  const [frame, setFrame] = useState(0); // 0 to 5
  const [facing, setFacing] = useState('right'); // 'right' or 'left'
  const [bottomPosition, setBottomPosition] = useState(100); // Add state for bottom position
  const [isInScene4, setIsInScene4] = useState(false); // Track if character is in scene4

  // Call this when user scrolls
  function handleScroll(deltaPageVerticalPosition) {
    if (deltaPageVerticalPosition > 0) {
      setFacing('right');
    } else if (deltaPageVerticalPosition < 0) {
      setFacing('left');
    }
    setFrame((prev) => (prev + 1) % FRAMES_PER_ROW);
    updateCharacterPosition();
  } 
  
  function updateCharacterPosition() {
    const scrollY = window.scrollY;
    
    // Check if character is in scene4
    setIsInScene4(scrollY >= SCENE4_START);
    
    if (scrollY >= 7290.4 && scrollY <= 15456.8) {
      setBottomPosition(145);
    }
    else if (scrollY >= 23572 ) {
      setBottomPosition(30);
    }
    else {
      setBottomPosition(100);
    }
  }
  
  useEffect(() => {
    const onWheel = (e) => {
      handleScroll(e.deltaY);
    };
    
    const onScroll = () => {
      updateCharacterPosition();
    };
    
    window.addEventListener('wheel', onWheel);
    window.addEventListener('scroll', onScroll);
    
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // Calculate background position
  const bgX = -frame * FRAME_WIDTH;
  const bgY = facing === 'right' ? 0 : -FRAME_HEIGHT;

  return (
    <div 
      className="character-container"
      style={{
        bottom: `${bottomPosition}px`
      }}
    >
      <div
        className="character-sprite"
        style={{
          backgroundImage: isInScene4 ? `url(${IMAGES.robbyBoat})` : `url(${IMAGES.characterSlides})`,
          backgroundPosition: isInScene4
            ? (facing === 'right' ? '0px 0px' : '-500px 0px')
            : `${bgX}px ${bgY}px`,
          width: isInScene4 ? '500px' : '195px',
          height: isInScene4 ? '258px' : '190px',
          backgroundSize: isInScene4 ? '1000px 258px' : 'auto',
        }}
      />
    </div>
  );
};

export default Character;