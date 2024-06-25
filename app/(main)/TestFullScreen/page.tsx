'use client';

import React, { useState, useEffect } from 'react';
import './style.css'; // Đảm bảo rằng bạn đã import file CSS

export default function TestFullScreen() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleFullscreenToggle = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleKeyDown = (event:any) => {
    if (event.key === 'Escape') {
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    if (isFullscreen) {
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
    }

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFullscreen]);

  return (
    <div>
      {!isFullscreen && (
        <button onClick={handleFullscreenToggle}>
          Full Screen
        </button>
      )}
      <div id="component" className={isFullscreen ? 'fullscreen' : ''}>
        Your Component Here
        {isFullscreen && (
          <button onClick={handleFullscreenToggle} className="exit-button">
            Exit Full Screen
          </button>
        )}
      </div>

      111
    </div>
  );
}
