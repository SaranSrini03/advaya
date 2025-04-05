// components/MarqueeBanner.js
import React from "react";

const MarqueeBanner = () => {
  const message = "✦ If you apply for one event, you can join 3 events ✦ ";

  return (
    <div className="absolute top-20 w-full z-40 overflow-hidden bg-orange-500/20 py-2">
      <div className="animate-marquee whitespace-nowrap">
        {Array.from({ length: 30 }).map((_, i) => (
          <span key={i} className="text-sm font-mono text-orange-300 mx-4">
            {message}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MarqueeBanner;
