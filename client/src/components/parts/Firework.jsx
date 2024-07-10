import React, { useState, useEffect, useRef } from 'react';
import Fireworks from 'fireworks-js';

export default function Firework({ launch }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (launch) startFireworks()
  }, [launch])

//Mount the fireworks
  async function startFireworks() {
    if (containerRef.current.isConnected) {
      const options = {
        decay: { min: 0.008, max: 0.010 },
        gravity: 0.8,
        friction: 0.94,
        lineWidth: {
          explosion: {
            min: 2.5,
            max: 2.5
          }
        }
      }

      // Pass the DOM node to the Fireworks constructor
      const fireworks = new Fireworks(containerRef.current, options);
      fireworks.start()
      await new Promise((resolve) => setTimeout(resolve, 3000))
      // fireworks.stop()
      await fireworks.waitStop()
      // Clean up on unmount
      fireworks.stop(true);
    }
  }

  return <div ref={containerRef} className="absolute z-0 w-full h-full bottom-0 right-0" />;
};


