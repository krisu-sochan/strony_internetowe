// ConveyorBelt.jsx
import React, { useEffect, useState } from "react";
import Stone from "./Stone";

const ConveyorBelt = () => {
  const [stones, setStones] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStones((prev) => [
        ...prev,
        {
          id: Date.now(),
          startX: Math.random() * 80 + 700,   // np. od 700 do 780 (z prawej)
          endX: Math.random() * 100 - 50,     // np. od -50 do +50 względem środka
          delay: 0,
        },
      ]);
    }, 2000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-[600px] h-[160px] ">
      {/* SVG taśmy */}
      <svg width="700" height="300" viewBox="100 0 800 300" xmlns="http://www.w3.org/2000/svg">
        <g transform="rotate(15 400 700)">
          <rect x="0" y="100" width="800" height="80" rx="40" ry="40" fill="#222" />
          <rect x="-2" y="70" width="805" height="80" rx="35" ry="30" fill="#222" />
          <rect x="10" y="111" width="775" height="58" rx="30" ry="30" fill="grey" />
          <g stroke="#ccc" strokeWidth="2">
            {[50, 150, 250, 350, 450, 550, 650, 750].map((x) => (
              <line key={x} x1={x} y1="70" x2={x} y2="110" />
            ))}
          </g>
          <g fill="#999" stroke="#444" strokeWidth="2">
            {[100, 200, 300, 400, 500, 600, 700].map((cx) => (
              <g key={cx}>
                <circle cx={cx} cy="140" r="25">
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from={`0 ${cx} 140`}
                    to={`-360 ${cx} 140`}
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
                <rect
                  x={cx - 3}
                  y="115"
                  width="6"
                  height="50"
                  fill="#666"
                  transform={`rotate(0 ${cx} 140)`}
                >
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from={`0 ${cx} 140`}
                    to={`-360 ${cx} 140`}
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </rect>
              </g>
            ))}
          </g>
        </g>
      </svg>

      {/* Kamienie (animacje) */}
      {stones.map((stone) => (
        <Stone key={stone.id} startX={stone.startX} delay={0} />
      ))}
    </div>
  );
};

export default ConveyorBelt;
