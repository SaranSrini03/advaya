"use client"
import { useEffect, useRef, useState } from 'react';
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/NavBar";
import Noise from "@/app/animations/Noise";
import MarqueeBanner from "@/app/components/MarqueeBanner.js";

export default function HomePage() {
  const [dots, setDots] = useState([]);
  // const blobRef = useRef(null);
  const [glitchText, setGlitchText] = useState("Advaya 2k25");
  const router = useRouter();



  useEffect(() => {
    setDots([...Array(20)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    })));
  }, []);

  useEffect(() => {
    setGlitchText("Advaya 2k25"); // Ensures this is only set once on the client
  }, []);

  const goToEventPage = () => {
    router.push("/events");
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gradient-to-br from-[#2a0a00] via-[#4a1a00] to-[#7f2a00]">
      <Navbar />
      <Noise />
      <MarqueeBanner />

      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        {dots.map((dot, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-orange-300 rounded-full animate-pulse"
            style={{
              left: dot.left,
              top: dot.top,
              animationDelay: `${i * 0.2}s`
            }}
          />
        ))}
      </div>


      <div className="relative z-10 flex items-center justify-center h-full text-white">
        <div className="text-center">
          <h2
            className="text-bold sm:text-lg md:text-sm lg:text-sm xl:text-3xl font-mono font-semibold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-yellow-500 mb-4 sm:mb-6 md:mb-8 leading-tight sm:leading-snug md:leading-normal text-center px-4 animate-fade-in drop-shadow-md"
          >
            Department of Computer Science And Engineering
            <span className="text-white"> X </span>
            IEEE Student Branch Chapter - Computer Society
          </h2>


          <span
            className="glitch font-black font-mono cursor-pointer select-none mx-auto hover:scale-105 transition-transform duration-300"
            data-text={glitchText}
            style={{
              fontSize: "clamp(3rem, 8vw, 10rem)", // Responsive text size
              "--after-shadow": "-8px 0 #ff6600",
              "--before-shadow": "8px 0 #ffcc00",
              textShadow: "0 0 10px rgba(255,140,0,0.5)",
            }}
          >
            Advaya 2k25
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold font-mono mb-8 animate-fade-in-down">
            Welcomes you
          </h1>
          <button
            onClick={goToEventPage}
            className="group relative px-10 py-3 cursor-pointer rounded-full text-white font-bold text-lg overflow-hidden shadow-xl transition-transform duration-300 hover:scale-[1.03] bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600"
          >
            {/* Background glow on hover */}
            <span className="absolute inset-0 bg-orange-700 opacity-10 blur-md transition-opacity duration-500 group-hover:opacity-30 z-0" />

            {/* Shine effect */}
            <span className="absolute top-0 left-[-75%] w-[200%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 group-hover:left-[100%] transition-all duration-1000 z-0" />

            {/* Button text */}
            <span className="relative z-10">Explore Events</span>

            {/* Border pulse */}
            <span className="absolute inset-0 rounded-full border-2 border-orange-300/30 group-hover:border-orange-100/50 transition-all duration-300 z-0" />
          </button>


          {/* Subtle animated border (hidden on very small screens) */}
          <div className="absolute inset-0 border-2 border-orange-300/20 rounded-lg animate-pulse-border hidden sm:block" />
        </div>

      </div>

      {/* Scroll indicator (larger on mobile for better tap interaction)
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-10 h-14 sm:w-8 sm:h-12 border-4 border-orange-300/30 rounded-3xl">
          <div className="w-2 h-2 mt-3 sm:mt-2 bg-orange-300/50 rounded-full mx-auto" />
        </div>
      </div> */}

      {/* Global Styles */}
      <style jsx global>{`
        .glitch {
          position: relative;
          color: #fff;
          white-space: nowrap;
        }

        
        .glitch::before,
        .glitch::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          clip-path: inset(0 0 0 0);
        }

        .glitch::after {
          left: 8px;
          text-shadow: var(--after-shadow);
          animation: animate-glitch 3s infinite linear alternate-reverse;
        }

        .glitch::before {
          left: -8px;
          text-shadow: var(--before-shadow);
          animation: animate-glitch 2s infinite linear alternate-reverse;
        }

        @keyframes animate-glitch {
          0%   { clip-path: polygon(0 20%, 100% 20%, 100% 30%, 0 30%); }
          10%  { clip-path: polygon(0 50%, 100% 50%, 100% 60%, 0 60%); }
          20%  { clip-path: polygon(0 10%, 100% 10%, 100% 20%, 0 20%); }
          30%  { clip-path: polygon(0 70%, 100% 70%, 100% 80%, 0 80%); }
          40%  { clip-path: polygon(0 30%, 100% 30%, 100% 40%, 0 40%); }
          50%  { clip-path: polygon(0 60%, 100% 60%, 100% 70%, 0 70%); }
          60%  { clip-path: polygon(0 15%, 100% 15%, 100% 25%, 0 25%); }
          70%  { clip-path: polygon(0 65%, 100% 65%, 100% 75%, 0 75%); }
          80%  { clip-path: polygon(0 45%, 100% 45%, 100% 55%, 0 55%); }
          90%  { clip-path: polygon(0 25%, 100% 25%, 100% 35%, 0 35%); }
          100% { clip-path: polygon(0 35%, 100% 35%, 100% 45%, 0 45%); }
        }

        .animate-fade-in-down {
          animation: fadeInDown 1s ease-out;
        }

        @keyframes fadeInDown {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-pulse-border {
          animation: pulseBorder 2s infinite;
        }

        @keyframes pulseBorder {
          0% { opacity: 0.2; }
          50% { opacity: 0.5; }
          100% { opacity: 0.2; }
        }

        .glitch:hover::after {
          animation-duration: 1s;
        }

        .glitch:hover::before {
          animation-duration: 0.8s;
        }
      `}</style>
    </div>
  );
}
