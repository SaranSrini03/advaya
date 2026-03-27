"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import Navbar from "@/app/components/NavBar";
import Image from "next/image";
import { motion, stagger, useAnimate } from "framer-motion";
import { UserCircle2 } from "lucide-react";

export default function HomePage() {
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
    {
      name: "sujay S",
      role: "consultant @ infosys",
      image: "/jurry/new.jpeg",
    },
    {
      name: "Dr Srividya Ganesan",
      role: "Associate professor @ New horizon college, bangalore",
      image: "/jurry/srividhya.jpeg",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setMoved(true);
      setTimeout(() => setShowContent(true), 500);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="page-shell relative w-full min-h-screen overflow-hidden text-[color:var(--foreground)]">
      <Navbar />

      <div className="relative z-10 w-full min-h-screen flex flex-col">
        {/* Glitchy title */}
        <div
          className={`w-full transition-all duration-1000 ${
            moved ? "pt-20 md:pt-24" : "absolute top-1/2 -translate-y-1/2"
          }`}
        >
          <span className="title-min font-black font-mono block text-center mx-auto text-5xl md:text-6xl">
            About
          </span>
        </div>

        {/* Main Content */}
        {showContent && (
          <div className="flex-1 flex items-center justify-center py-6 md:py-12 animate-fade-in">
            <div className="w-full max-w-7xl px-4 md:px-8">
              {/* About Section */}
              <div className="section-card rounded-xl p-6 md:p-8">
                <p className="text-sm sm:text-base md:text-lg font-mono text-emerald-200 leading-relaxed">
                  Advaya 2k26 is a premier tech extravaganza that brings
                  together innovators, developers, designers, and tech
                  enthusiasts from around the globe for an immersive experience
                  in cutting-edge technology. This multi-faceted event goes
                  beyond a traditional hackathon, offering a diverse range of
                  competitions and activities, including:
                </p>

                <ul className="mt-4 space-y-3 text-sm sm:text-base md:text-lg font-mono text-emerald-200">
                  {/* List items... */}
                </ul>

                <p className="mt-4 text-sm sm:text-base md:text-lg font-mono text-emerald-200 leading-relaxed">
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
                        className="p-2 sm:p-3 bg-emerald-500/20 rounded-lg border border-emerald-300/20 text-center"
                      >
                        <span className="font-mono text-xs sm:text-sm md:text-base text-emerald-300">
                          {text}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="section-card mt-12 rounded-xl p-6 md:p-8 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  {[...Array(10)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-lime-400 rounded-full"
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
                  className="title-min font-black font-mono text-center mb-8 relative z-10 text-3xl md:text-4xl"
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
                      <div className="relative h-full bg-[color:var(--panel-bg)] backdrop-blur-lg border border-[color:var(--panel-border)] hover:border-[color:rgba(16,185,129,0.35)] rounded-xl overflow-hidden shadow-2xl transition-all duration-300 group-hover:shadow-[0_0_30px_-10px_rgba(16,185,129,0.3)] flex flex-col">
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
                          <h3 className="text-lg font-bold text-lime-200 font-mono mb-2">
                            {person.name}
                          </h3>
                          <div className="relative mb-4 group">
                            <span className="relative z-10 text-sm font-mono px-4 py-1.5 rounded-full bg-gradient-to-br from-emerald-900/40 to-lime-900/30 text-lime-200 border border-lime-400/20 backdrop-blur-sm flex items-center gap-2 transition-all duration-500 group-hover:bg-lime-900/50 group-hover:border-lime-400/40 group-hover:text-lime-100 group-hover:shadow-[0_0_15px_-3px_rgba(16,185,129,0.4)]">
                              <UserCircle2 className="w-4 h-4 text-lime-300 group-hover:scale-110 transition-transform duration-300" />
                              {person.role}
                            </span>
                            <span className="absolute -inset-1 rounded-full bg-lime-500/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                            <span className="absolute inset-0 rounded-full border border-lime-400/30 animate-ping opacity-0 group-hover:opacity-30 duration-1000" />
                            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-lime-400/80 blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100" />
                            <span className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-lime-400/80 blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="section-card mt-12 rounded-xl p-6 md:p-8">
                <h2
                  className="title-min font-black font-mono text-center mb-8 text-3xl md:text-4xl"
                >
                  Clubs
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {Clubs.map((club) => (
                    <motion.div
                      key={club.id}
                      whileHover={{ y: -5 }}
                      className="group relative overflow-hidden rounded-xl border border-emerald-300/20 hover:border-emerald-400/40 transition-all duration-300"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative z-10 h-full p-6 flex flex-col items-center text-center bg-[color:var(--panel-bg)] backdrop-blur-sm">
                        <div className="w-20 h-20 mb-4 rounded-full bg-emerald-900/30 border border-emerald-300/20 flex items-center justify-center group-hover:bg-emerald-900/50 transition-all duration-300">
                          <img
                            src={club.image}
                            alt={club.name}
                            className="w-12 h-12 object-contain transform group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <h3 className="text-xl font-bold text-lime-200 font-mono mb-2">
                          {club.name}
                        </h3>
                        <p className="text-sm text-emerald-300 mb-4">
                          {club.description}
                        </p>
                        <button className="mt-auto px-4 py-2 text-xs font-mono bg-emerald-900/40 border border-emerald-300/20 rounded-full hover:bg-emerald-900/60 transition-all duration-300 flex items-center gap-2">
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
