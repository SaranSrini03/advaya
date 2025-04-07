"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/NavBar";
import Noise from "@/app/animations/Noise";
import MarqueeBanner from "@/app/components/MarqueeBanner";
import CountdownTimer from "@/app/components/Countdown.js";
import { motion } from "framer-motion";

export default function HomePage() {
  const [dots, setDots] = useState([]);
  const [glitchText, setGlitchText] = useState("Advaya 2k25");
  const router = useRouter();

  useEffect(() => {
    setDots(
      [...Array(20)].map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        scale: 0.5 + Math.random(),
      }))
    );
  }, []);

  useEffect(() => {
    setGlitchText("Advaya 2k25");
  }, []);

  const goToEventPage = () => {
    router.push("/events");
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gradient-to-br from-[#2a0a00] via-[#4a1a00] to-[#7f2a00]">
      <Navbar />
      <Noise />
      <MarqueeBanner />

      <div className="absolute inset-0 opacity-20 mix-blend-soft-light">
        {dots.map((dot, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 bg-orange-200 rounded-full animate-float"
            style={{
              left: dot.left,
              top: dot.top,
              animationDelay: `${i * 0.2}s`,
              filter: "blur(1px)",
              transform: `scale(${dot.scale})`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex items-center justify-center h-full text-white">
        <div className="text-center max-w-6xl px-4">
          <motion.div
            className="relative group"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span
              className="glitch font-black font-mono cursor-pointer select-none transform transition-all duration-500 hover:filter hover:brightness-110"
              data-text={glitchText}
              style={{
                fontSize: "clamp(3rem, 8vw, 10rem)",
                "--after-shadow": "-8px 0 #ff6600",
                "--before-shadow": "8px 0 #ffcc00",
                textShadow: "0 0 20px rgba(255,140,0,0.3)",
              }}
            >
              Advaya 2k25
              <span className="absolute inset-0 bg-[radial-gradient(circle,#ff8c00aa_0%,transparent_70%)] opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-4xl sm:text-6xl md:text-7xl font-bold font-mono mb-8 mt-4 bg-gradient-to-r from-amber-200 to-orange-300 bg-clip-text text-transparent"
          >
            6-7 May 2025
          </motion.h1>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={goToEventPage}
            className="group relative px-12 py-4 cursor-pointer rounded-full text-white font-bold text-xl overflow-hidden shadow-2xl transition-all duration-300 hover:shadow-[0_0_40px_5px_rgba(255,140,0,0.3)] bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600"
            aria-label="Explore Events"
          >
            <span className="absolute inset-0 bg-orange-700 opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
            <span className="absolute top-0 left-[-75%] w-[200%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 group-hover:left-[100%] transition-all duration-1000" />
            <span className="relative z-10 flex items-center justify-center gap-2">
              <CountdownTimer />
            </span>
            <span className="absolute inset-0 rounded-full border-2 border-orange-300/30 group-hover:border-orange-100/50 transition-all duration-300" />
          </motion.button>

          <p
            className="mt-4 text-xs text-orange-300 hover:text-orange-100 transition-colors cursor-pointer underline underline-offset-4"
            onClick={goToEventPage}
          >
            Learn more about Advaya
          </p>

          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute left-1/4 top-1/3 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute right-1/4 bottom-1/4 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl animate-pulse delay-1000" />
          </div>
        </div>
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
      `}</style>
    </div>
  );
}
