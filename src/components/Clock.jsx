import React, { useState, useEffect } from "react";

const CustomClock = ({ timeZone, cityName }) => {
  const [time, setTime] = useState(
    new Date().toLocaleTimeString("en-US", { timeZone })
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString("en-US", { timeZone }));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeZone]);

  const [hours, minutes, seconds] = time
    .split(":")
    .map((num, index) =>
      index === 0 ? parseInt(num) % 12 || 12 : parseInt(num)
    );

  // const secondsAngle = (seconds / 60) * 360;
  const minutesAngle = ((minutes + seconds / 60) / 60) * 360;
  const hoursAngle = (((hours % 12) + minutes / 60) / 12) * 360;

  return (
    <div className="flex flex-col items-center">
      <svg width="140" height="140" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="#FFFFFF"
          stroke="#2e2e2e"
          strokeWidth="2"
        />

        {/* Clock numbers */}
        {[...Array(12)].map((_, i) => {
          const angle = ((i + 1) / 12) * Math.PI * 2 - Math.PI / 2;
          const x = 50 + 38 * Math.cos(angle);
          const y = 50 + 38 * Math.sin(angle);
          return (
            <text
              key={i}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#000"
              fontSize="8"
              fontWeight='bold'
            >
              {i + 1}
            </text>
          );
        })}

        {/* Hour hand */}
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="25"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          transform={`rotate(${hoursAngle} 50 50)`}
        />

        {/* Minute hand */}
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="20"
          stroke="black"
          strokeWidth="1.5"
          strokeLinecap="round"
          transform={`rotate(${minutesAngle} 50 50)`}
        />

        {/* Second hand */}
        {/* <line
          x1="50"
          y1="50"
          x2="50"
          y2="15"
          stroke="#ff0000"
          strokeWidth="1"
          strokeLinecap="round"
          transform={`rotate(${secondsAngle} 50 50)`}
        /> */}

        {/* Center dot */}
        <circle cx="50" cy="50" r="2" fill="#412601" />
      </svg>
      <h2 className="text-xl font-bold mb-2">{cityName}</h2>
    </div>
  );
};

const ClockDisplay = () => {
  const cities = [
    { name: "INDIA", timeZone: "Asia/Kolkata" },
    { name: "LONDON", timeZone: "Europe/London" },
    { name: "NEW YORK", timeZone: "America/New_York" },
  ];

  return (
    <div className="flex justify-center items-center mt-3">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cities.map((city, index) => (
          <CustomClock
            key={index}
            timeZone={city.timeZone}
            cityName={city.name}
          />
        ))}
      </div>
    </div>
  );
};

export default ClockDisplay;
