// components/MarqueeBanner.js
import React from "react";

const MarqueeBanner = () => {
  const message = "✦ On-the-spot registration will be closed at 12 PM on the 14th and 15th of April. ✦ ";

  return (
    <div className="absolute top-20 w-full z-40 overflow-hidden bg-emerald-500/20 py-2">
      <div className="animate-marquee whitespace-nowrap">
        {Array.from({ length: 30 }).map((_, i) => (
          <span key={i} className="text-sm font-mono text-emerald-300 mx-4">
            {message}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MarqueeBanner;
