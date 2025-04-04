"use client"
import { useEffect, useRef, useState } from 'react';
import Navbar from "@/app/components/NavBar";
import Noise from "@/app/animations/Noise";

export default function HomePage() {
  const [dots, setDots] = useState([]);
  const blobRef = useRef(null);
  const [moved, setMoved] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!blobRef.current) return;
      const { clientX, clientY } = e;
      blobRef.current.animate(
        {
          left: `${clientX}px`,
          top: `${clientY}px`,
        },
        { duration: 3000, fill: "forwards" }
      );
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    setDots([...Array(20)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    })));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMoved(true);
      setTimeout(() => setShowContent(true), 500);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gradient-to-br from-[#2a0a00] via-[#4a1a00] to-[#7f2a00]">
      <Navbar />
      <Noise />

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

      {/* Gradient blob follower */}
      <div
        ref={blobRef}
        classNa me="absolute w-40 h-40 md:w-64 md:h-64 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full opacity-20 blur-3xl -translate-x-1/2 -translate-y-1/2"
      />

      <div className="relative z-10 h-full text-white">
        {/* Animated title */}
        <div className={`absolute w-full transition-all duration-1000 ${moved ? 'top-8' : 'top-1/2 -translate-y-1/2'}`}>
          <span
            className="glitch font-black  mt-20  lg:mt-28 font-mono block text-center mx-auto"
            data-text="About"
            style={{
              fontSize: "clamp(3rem, 8vw, 10rem)",
              "--after-shadow": "-8px 0 #ff6600",
              "--before-shadow": "8px 0 #ffcc00",
              textShadow: '0 0 10px rgba(255,140,0,0.5)'
            }}
          >
            About
          </span>
        </div>

        {/* Content section */}
        {showContent && (
          <div className="pt-40 h-full flex items-center justify-center animate-fade-in">
            <div className="max-w-2xl px-4 md:px-8 text-center">
              <p className="text-lg md:text-xl font-mono text-orange-200 leading-relaxed">
                Advayathon is a premier 24-hour hackathon bringing together innovators,
                developers, and creators from around the globe. Our event focuses on
                cutting-edge technologies, collaborative problem-solving, and pushing
                the boundaries of what's possible in tech. With workshops, mentorship
                from industry leaders, and exciting challenges, we provide the perfect
                platform to transform ideas into reality.
              </p>
              <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
                {['24h Duration', '500+ Participants', '$50k Prizes'].map((text, i) => (
                  <div key={i} className="p-3 bg-orange-500/20 rounded-lg border border-orange-300/20">
                    <span className="font-mono text-sm md:text-base text-orange-300">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        .glitch {
          position: relative;
          color: #fff;
          white-space: nowrap;
        }
        
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        /* Keep existing glitch animations */
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

        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}