"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import Navbar from "@/app/components/NavBar";
import Noise from "@/app/animations/Noise";
import Image from "next/image";
import { motion, stagger, useAnimate } from "framer-motion";
import { UserCircle2 } from "lucide-react";

export default function HomePage() {
  const [dots, setDots] = useState([]);
  const blobRef = useRef(null);
  const [moved, setMoved] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const Clubs = [
    {
      id: "m-apps",
      image: "/app.png",
      name: "Mobile App Development Club",
      description: "Building innovative mobile solutions for modern problems",
    },
    {
      id: "photography",
      image: "/cyber.png",
      name: "Cyber Club",
      description: "Securing digital frontiers and exploring cybersecurity",
    },
    {
      id: "code",
      image: "/code.png",
      name: "Code Club",
      description: "Mastering algorithms and competitive programming",
    },
  ];

  const jurry = [
    {
      name: "Jayakumar J",
      role: "Deputy group manager @titan",
      image: "/jurry/hodmam.jpeg",
    },
    {
      name: "Joseph selvaraj",
      role: "managing director @enerDux private LTD.",
      image: "/teams/vinolamam.jpeg",
    },
    {
      name: "Murali Anandan",
      role: "founder @coderize infotech services LLP",
      image: "/jurry/murali.JPG",
    },
    {
      name: "Adhiyan Chandrasekaran",
      role: "Senior Software Engineer @ Tangoe",
      image: "/jurry/adiyan.jpg",
    },
    {
      name: "Dr. V Keerthika",
      role: "Associate Professor @ Alliance University",
      image: "/jurry/keer.jpg",
    },
    {
      name: "T. Krishnamoorthi",
      role: "Senior Software Engineer",
      image: "/jurry/ktm.jpg",
    },
    {
      name: "Vairamuthu M",
      role: "web3 fullstack developer @Polkassembly",
      image: "/teams/vm.webp",
    },
    {
      name: "Thirumurugan S",
      role: "Blockchain developer",
      image: "/teams/thiru.jpg",
    },
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
          className={`w-full transition-all duration-1000 ${
            moved ? "pt-20 md:pt-24" : "absolute top-1/2 -translate-y-1/2"
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
                  Advaya 2k25 is a premier tech extravaganza that brings
                  together innovators, developers, designers, and tech
                  enthusiasts from around the globe for an immersive experience
                  in cutting-edge technology. This multi-faceted event goes
                  beyond a traditional hackathon, offering a diverse range of
                  competitions and activities, including:
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

              <div className="mt-12 bg-black/20 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-orange-300/20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  {[...Array(10)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-amber-400 rounded-full"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: [0, 0.4, 0],
                        x: Math.random() * 100 - 50,
                        y: Math.random() * 100 - 50,
                      }}
                      transition={{
                        duration: 4 + Math.random() * 6,
                        repeat: Infinity,
                        delay: Math.random() * 2,
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

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {jurry.map((person, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      className="group relative isolate w-full h-full"
                    >
                      <div className="relative h-full bg-zinc-900/80 backdrop-blur-lg border border-orange-300/20 hover:border-orange-300/50 rounded-xl overflow-hidden shadow-2xl transition-all duration-300 group-hover:shadow-[0_0_30px_-10px_rgba(255,140,0,0.3)] flex flex-col">
                        <div className="relative w-full aspect-[3/4] overflow-hidden">
                          <Image
                            src={person.image}
                            alt={person.name}
                            fill
                            className="object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        </div>

                        {/* Content */}
                        <div className="p-4 flex-1 flex flex-col items-center text-center">
                          <h3 className="text-lg font-bold text-amber-200 font-mono mb-2">
                            {person.name}
                          </h3>
                          <div className="relative mb-4 group">
                            <span className="relative z-10 text-sm font-mono px-4 py-1.5 rounded-full bg-gradient-to-br from-orange-900/40 to-amber-900/30 text-amber-200 border border-amber-400/20 backdrop-blur-sm flex items-center gap-2 transition-all duration-500 group-hover:bg-amber-900/50 group-hover:border-amber-400/40 group-hover:text-amber-100 group-hover:shadow-[0_0_15px_-3px_rgba(245,158,11,0.4)]">
                              <UserCircle2 className="w-4 h-4 text-amber-300 group-hover:scale-110 transition-transform duration-300" />
                              {person.role}
                            </span>
                            <span className="absolute -inset-1 rounded-full bg-amber-500/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                            <span className="absolute inset-0 rounded-full border border-amber-400/30 animate-ping opacity-0 group-hover:opacity-30 duration-1000" />
                            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400/80 blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100" />
                            <span className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-amber-400/80 blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="mt-12 bg-black/20 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-orange-300/20">
                <h2
                  className="glitch font-black font-mono text-center mb-8"
                  data-text="Clubs"
                  style={{
                    fontSize: "clamp(2rem, 5vw, 3rem)",
                    "--after-shadow": "-4px 0 #ff6600",
                    "--before-shadow": "4px 0 #ffcc00",
                    textShadow: "0 0 8px rgba(255,140,0,0.5)",
                  }}
                >
                  Clubs
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {Clubs.map((club) => (
                    <motion.div
                      key={club.id}
                      whileHover={{ y: -5 }}
                      className="group relative overflow-hidden rounded-xl border border-orange-300/20 hover:border-orange-400/40 transition-all duration-300"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative z-10 h-full p-6 flex flex-col items-center text-center bg-zinc-900/80 backdrop-blur-sm">
                        <div className="w-20 h-20 mb-4 rounded-full bg-orange-900/30 border border-orange-300/20 flex items-center justify-center group-hover:bg-orange-900/50 transition-all duration-300">
                          <img
                            src={club.image}
                            alt={club.name}
                            className="w-12 h-12 object-contain transform group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <h3 className="text-xl font-bold text-amber-200 font-mono mb-2">
                          {club.name}
                        </h3>
                        <p className="text-sm text-orange-300 mb-4">
                          {club.description}
                        </p>
                        <button className="mt-auto px-4 py-2 text-xs font-mono bg-orange-900/40 border border-orange-300/20 rounded-full hover:bg-orange-900/60 transition-all duration-300 flex items-center gap-2">
                          Learn More
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                        </button>
                      </div>
                    </motion.div>
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
          0% {
            clip-path: polygon(0 20%, 100% 20%, 100% 30%, 0 30%);
          }
          10% {
            clip-path: polygon(0 50%, 100% 50%, 100% 60%, 0 60%);
          }
          20% {
            clip-path: polygon(0 10%, 100% 10%, 100% 20%, 0 20%);
          }
          30% {
            clip-path: polygon(0 70%, 100% 70%, 100% 80%, 0 80%);
          }
          40% {
            clip-path: polygon(0 30%, 100% 30%, 100% 40%, 0 40%);
          }
          50% {
            clip-path: polygon(0 60%, 100% 60%, 100% 70%, 0 70%);
          }
          60% {
            clip-path: polygon(0 15%, 100% 15%, 100% 25%, 0 25%);
          }
          70% {
            clip-path: polygon(0 65%, 100% 65%, 100% 75%, 0 75%);
          }
          80% {
            clip-path: polygon(0 45%, 100% 45%, 100% 55%, 0 55%);
          }
          90% {
            clip-path: polygon(0 25%, 100% 25%, 100% 35%, 0 35%);
          }
          100% {
            clip-path: polygon(0 35%, 100% 35%, 100% 45%, 0 45%);
          }
        }

        @keyframes fade-in {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  );
}
