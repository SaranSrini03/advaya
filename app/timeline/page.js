"use client"
import { useEffect, useRef, useState } from 'react';
import Navbar from "@/app/components/NavBar";
import Noise from "@/app/animations/Noise";

export default function HomePage() {
  const [dots, setDots] = useState([]);
  const [moved, setMoved] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);

  const timelineEvents = [
    { date: "Day 1", title: "Kickoff & Registrations", time: "9:00 AM" },
    { date: "Day 2", title: "Workshops & Coding", time: "10:00 AM" },
    { date: "Day 3", title: "Project Submissions", time: "2:00 PM" },
    { date: "Day 4", title: "Demo Day & Awards", time: "4:00 PM" },
    { date: "Day 4", title: "Demo Day & Awards", time: "4:00 PM" },
    { date: "Day 4", title: "Demo Day & Awards", time: "4:00 PM" },
    { date: "Day 4", title: "Demo Day & Awards", time: "4:00 PM" },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setMoved(true);
      setTimeout(() => setShowTimeline(true), 500);
    }, 50);

    return () => clearTimeout(timer);
  }, []);


  useEffect(() => {
    setDots([...Array(20)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    })));
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



      <div className="relative z-10 h-full text-white">
        {/* Animated title */}
        <div className={`absolute w-full transition-all duration-1000 ${moved ? 'top-8' : 'top-1/2 -translate-y-1/2'}`}>
          <span
            className="glitch font-black lg:mt-6 mt-16 font-mono block text-center mx-auto"
            data-text="Timeline"
            style={{
              fontSize: "clamp(3rem, 8vw, 8rem)",
              "--after-shadow": "-8px 0 #ff6600",
              "--before-shadow": "8px 0 #ffcc00",
              textShadow: '0 0 10px rgba(255,140,0,0.5)'
            }}
          >
            Timeline
          </span>
        </div>

        {/* Scrollable timeline container */}
        {showTimeline && (
          <div className="pt-40 h-full flex items-center justify-center">
            <div className="relative max-w-4xl w-full h-[70vh] px-4 overflow-y-auto scrollbar-hide">
              <div className="relative min-h-[500px] pb-8">
                {timelineEvents.map((event, index) => (
                  <div 
                    key={index}
                    className="relative py-8 pl-6 md:pl-8 pr-4 group animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    {/* Timeline line */}
                    <div className="absolute left-0 top-0 w-0.5 md:w-1 h-full bg-orange-500/30">
                      <div className="absolute top-0 left-0 w-full h-8 bg-orange-500 animate-pulse" />
                    </div>
                    
                    {/* Event dot */}
                    <div className="absolute left-0 top-1/2 -translate-x-[5px] md:-translate-x-[7px] -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 bg-orange-500 rounded-full" />

                    <div className="ml-8 md:ml-12 bg-black/40 backdrop-blur-lg p-4 md:p-6 rounded-xl border border-orange-300/20 hover:border-orange-500/50 transition-all">
                      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-2 md:mb-4">
                        <h3 className="text-lg md:text-xl font-mono text-orange-300">
                          {event.title}
                        </h3>
                        <span className="font-mono text-xs md:text-sm text-orange-500 mt-1 md:mt-0">
                          {event.date}
                        </span>
                      </div>
                      <p className="text-orange-200 font-mono text-xs md:text-sm">
                        {event.time}
                      </p>
                    </div>
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