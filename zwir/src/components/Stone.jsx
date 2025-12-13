import React, { useEffect, useRef, useState } from "react";

const Stone = ({ delay = 0 }) => {
  const stoneRef = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!show) return;

    let x = 450;
    let y = 130;
    let vx = -2.1;        // prędkość pozioma (lewo)
    let vy = -0.6;      // wznoszenie (ujemne = do góry)
    let ay = 0.05;      // przyspieszenie (grawitacja)
    let frame = 0;

    const animate = () => {
      if (stoneRef.current) {
        if (frame > 250) {
          vy += ay; // po ~3 sekundach zaczynamy spadać
        }

        x += vx;
        y += vy;

        stoneRef.current.style.transform = `translate(${x}px, ${y}px)`;

        // Jeśli kamień spadnie poza widok — przestań animować
        if (y < 900) {
          requestAnimationFrame(animate);
        } else {
          stoneRef.current.style.opacity = 0;
        }
        frame++;
      }
    };

    requestAnimationFrame(animate);
  }, [show]);
  const rock = "/loader_folder/rock1.png"
  if (!show) return null;

  return (
    <div
      ref={stoneRef}
      className="w-9 h-9 rounded-full absolute z-20"
      style={{ top: 20, left: 180,zIndex:0 }}
    ><img src={rock} alt="rock" /></div>
  );
};

export default Stone;
