"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import Navbar from "@/app/components/NavBar";
import Noise from "@/app/animations/Noise";
import Image from "next/image";
import { motion, stagger, useAnimate } from "framer-motion";


export default function HomePage() {
  const [dots, setDots] = useState([]);
  const blobRef = useRef(null);
  const [moved, setMoved] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const Clubs = [
    {
      id: "m-apps",
      image: "/app.png",
      name: "Mobile App Development Club"
    },
    {
      id: "photography",
      image: "/cyber.png",
      name: "cyber Club"
    },
    {
      id: "code",
      image: "/code.png",
      name: "Code Club"
    }
  ];

  const jurry = [
    { name: "Jayakumar", role: "Database", image: "/jurry/hodmam.jpeg" },
    { name: "Murali", role: "jurry Coordinator", image: "/jurry/murali.JPG" },
    { name: "Adhiyan Chandrasekaran", role: "Senior Software Engineer @ Tangoe", image: "/jurry/adiyan.jpg" },
    { name: "Dr. V Keerthika", role: "Associate Professor @ Alliance University", image: "/jurry/keer.jpg" },
    { name: "T. Krishnamoorthi", role: "Senior Software Engineer", image: "/jurry/ktm.jpg" },

  ];


  const handleMouseMove = useCallback((e) => {
    if (!blobRef.current) return;
    const { clientX, clientY } = e;
    blobRef.current.animate(
      {
        left: `${clientX}px`,
        top: `${clientY}px`,
      },
      { duration: 3000, fill: "forwards" }
    );
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  useEffect(() => {
    setDots(
      [...Array(20)].map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }))
    );
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMoved(true);
      setTimeout(() => setShowContent(true), 500);
    }, 50);
    return () => clearTimeout(timer);
  }, []);



  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-[#2a0a00] via-[#4a1a00] to-[#7f2a00]">
      <Navbar />
      <Noise />

      {/* Animated background dots */}
      <div className="absolute inset-0 opacity-20">
        {dots.map((dot, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-orange-300 rounded-full animate-pulse"
            style={{
              left: dot.left,
              top: dot.top,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      {/* Follower gradient blob */}
      <div
        ref={blobRef}
        className="absolute w-40 h-40 md:w-64 md:h-64 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full opacity-20 blur-3xl -translate-x-1/2 -translate-y-1/2"
      />

      <div className="relative z-10 w-full min-h-screen flex flex-col">
        {/* Glitchy title */}
        <div
          className={`w-full transition-all duration-1000 ${moved ? "pt-20 md:pt-24" : "absolute top-1/2 -translate-y-1/2"
            }`}
        >
          <span
            className="glitch font-black font-mono block text-center mx-auto"
            data-text="About"
            style={{
              fontSize: "clamp(3rem, 8vw, 6rem)",
              "--after-shadow": "-8px 0 #ff6600",
              "--before-shadow": "8px 0 #ffcc00",
              textShadow: "0 0 10px rgba(255,140,0,0.5)",
            }}
          >
            About
          </span>
        </div>

        {/* Main Content */}
        {showContent && (
          <div className="flex-1 flex items-center justify-center py-6 md:py-12 animate-fade-in">
            <div className="w-full max-w-7xl px-4 md:px-8">
              {/* About Section */}
              <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-orange-300/20">
                <p className="text-sm sm:text-base md:text-lg font-mono text-orange-200 leading-relaxed">
                  Advaya 2k25 is a premier tech extravaganza that brings together
                  innovators, developers, designers, and tech enthusiasts from
                  around the globe for an immersive experience in cutting-edge
                  technology. This multi-faceted event goes beyond a traditional
                  hackathon, offering a diverse range of competitions and
                  activities, including:
                </p>

                <ul className="mt-4 space-y-3 text-sm sm:text-base md:text-lg font-mono text-orange-200">
                  {/* List items... */}
                </ul>

                <p className="mt-4 text-sm sm:text-base md:text-lg font-mono text-orange-200 leading-relaxed">
                  With mentorship from experts, hands-on workshops, and exciting
                  prizes, Advayathon is the ultimate playground for tech
                  enthusiasts to learn, collaborate, and push the boundaries of
                  innovation.
                </p>

                <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-3">
                  {["48h Duration", "500+ Participants", "₹30,000 Prizes"].map(
                    (text, i) => (
                      <div
                        key={i}
                        className="p-2 sm:p-3 bg-orange-500/20 rounded-lg border border-orange-300/20 text-center"
                      >
                        <span className="font-mono text-xs sm:text-sm md:text-base text-orange-300">
                          {text}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>



              {/* jury Section */}
              <div className="mt-12 bg-black/20 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-orange-300/20 relative overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0 opacity-10">
                  {[...Array(10)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-amber-400 rounded-full"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: [0, 0.4, 0],
                        x: Math.random() * 100 - 50,
                        y: Math.random() * 100 - 50
                      }}
                      transition={{
                        duration: 4 + Math.random() * 6,
                        repeat: Infinity,
                        delay: Math.random() * 2
                      }}
                    />
                  ))}
                </div>

                <h2
                  className="glitch font-black font-mono text-center mb-8 relative z-10"
                  data-text="Experts Joining With Us"
                  style={{
                    fontSize: "clamp(2rem, 5vw, 3rem)",
                    "--after-shadow": "-4px 0 #ff6600",
                    "--before-shadow": "4px 0 #ffcc00",
                    textShadow: "0 0 8px rgba(255,140,0,0.5)",
                  }}
                >
                  Experts Joining With Us
                </h2>

                <div className="grid grid-cols-1 w-full sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 px-4">
                  {jurry.map((person, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      className="group relative isolate w-full max-w-xs mx-auto"
                    >
                      {/* Hover gradient background */}
                      <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_center,#ff660015_0%,transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div className="relative bg-zinc-900/80 backdrop-blur-lg border border-orange-300/20 hover:border-orange-300/50 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 group-hover:shadow-[0_0_30px_-10px_rgba(255,140,0,0.3)]">
                        {/* Image container with parallax effect */}
                        <motion.div
                          className="relative w-full aspect-square overflow-hidden"
                          whileHover={{ scale: 1.05 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Image
                            src={person.image}
                            alt={person.name}
                            fill
                            className="object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                          {/* Image overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        </motion.div>

                        {/* Content */}
                        <div className="p-4 text-center space-y-3 relative">
                          {/* Name with animated underline */}
                          <h3 className="text-xl font-bold text-amber-200 font-mono relative inline-block">
                            <span className="relative">
                              {person.name}
                              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-amber-400 group-hover:w-full transition-all duration-300 ease-out" />
                            </span>
                          </h3>

                          {/* Role badge */}
                          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-900/40 backdrop-blur-sm rounded-full border border-orange-300/20 transition-all duration-300 group-hover:bg-orange-900/60">
                            <svg
                              className="w-4 h-4 text-amber-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-sm text-orange-300 font-mono">{person.role}</span>
                          </div>
                        </div>

                        {/* Animated border */}
                        <div className="absolute inset-0 rounded-2xl overflow-hidden">
                          <div className="absolute inset-0 border-[1px] border-orange-300/15 group-hover:border-orange-300/40 transition-all duration-500" />
                          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[conic-gradient(from_180deg_at_50%_50%,#ff8c0040_0deg,#ff8c0000_180deg)] animate-rotate" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              
              {/* Clubs Section */}
              <div className="mt-12 bg-black/20 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-orange-300/20">
                <h2 className="glitch font-black font-mono text-center mb-8"
                  data-text="Clubs"
                  style={{
                    fontSize: "clamp(2rem, 5vw, 3rem)",
                    "--after-shadow": "-4px 0 #ff6600",
                    "--before-shadow": "4px 0 #ffcc00",
                    textShadow: "0 0 8px rgba(255,140,0,0.5)"
                  }}>
                  Clubs
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Clubs.map((club) => (
                    <div
                      key={club.id}
                      className="group relative aspect-square bg-black/20 backdrop-blur-sm rounded-lg border border-orange-300/20 hover:border-orange-400/40 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                    >
                      <div className="absolute inset-0 p-4 flex flex-col items-center justify-center text-center">
                        <img
                          src={club.image}
                          alt={club.name}
                          className="w-16 h-16 mb-4 object-contain transform group-hover:rotate-12 transition-transform duration-300"
                        />
                        <h3 className="font-mono text-orange-300 mb-2 text-lg">
                          {club.name}
                        </h3>
                      </div>
                      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-br from-orange-500/30 to-transparent" />
                    </div>
                  ))}
                </div>
              </div>



            </div>
          </div>
        )}
      </div>

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
          0% { clip-path: polygon(0 20%, 100% 20%, 100% 30%, 0 30%) }
          10% { clip-path: polygon(0 50%, 100% 50%, 100% 60%, 0 60%) }
          20% { clip-path: polygon(0 10%, 100% 10%, 100% 20%, 0 20%) }
          30% { clip-path: polygon(0 70%, 100% 70%, 100% 80%, 0 80%) }
          40% { clip-path: polygon(0 30%, 100% 30%, 100% 40%, 0 40%) }
          50% { clip-path: polygon(0 60%, 100% 60%, 100% 70%, 0 70%) }
          60% { clip-path: polygon(0 15%, 100% 15%, 100% 25%, 0 25%) }
          70% { clip-path: polygon(0 65%, 100% 65%, 100% 75%, 0 75%) }
          80% { clip-path: polygon(0 45%, 100% 45%, 100% 55%, 0 55%) }
          90% { clip-path: polygon(0 25%, 100% 25%, 100% 35%, 0 35%) }
          100% { clip-path: polygon(0 35%, 100% 35%, 100% 45%, 0 45%) }
        }

        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(20px) }
          100% { opacity: 1; transform: translateY(0) }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  );
}