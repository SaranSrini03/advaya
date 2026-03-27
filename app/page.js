"use client";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/NavBar";
import Aurora from "@/app/components/Aurora";
import CountdownTimer from "@/app/components/Countdown.js";
import { motion } from "framer-motion";

export default function HomePage() {
  const router = useRouter();

  const goToEventPage = () => {
    router.push("/events");
  };

  return (
    <div className="page-shell relative w-screen min-h-screen overflow-hidden">
      <Navbar />
      <div className="pointer-events-none absolute inset-0 z-0 min-h-[100dvh]">
        <div className="absolute inset-0 h-full min-h-[100dvh] w-full">
          <Aurora
            colorStops={["#022c22", "#10b981", "#86efac"]}
            amplitude={1}
            blend={0.52}
            speed={0.9}
          />
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 z-[1]">
        <div className="absolute top-1/4 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-[color:var(--accent)]/15 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-40 w-40 rounded-full bg-[color:var(--accent-soft)]/20 blur-3xl" />
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 pt-24 pb-12">
        <div className="text-center max-w-5xl w-full px-6 py-12 md:px-12 md:py-16 bg-transparent border-none shadow-none">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center rounded-full bg-transparent px-4 py-1.5 text-xs sm:text-sm font-semibold tracking-wide text-[color:var(--muted-text)]"
          >
            Sri Sairam CSE Presents
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="title-min font-mono mt-6 text-6xl sm:text-7xl md:text-8xl lg:text-9xl"
          >
            Advaya 2k26
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.16 }}
            className="mt-5 text-lg sm:text-xl md:text-2xl font-mono text-[color:var(--muted-text)]"
          >
            April 14-15, Bengaluru
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.22 }}
            className="mx-auto mt-4 max-w-2xl text-sm sm:text-base text-[color:var(--muted-text)]"
          >
            A flagship tech fest with hackathon, design, web, mobile, and coding events.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <button
              onClick={goToEventPage}
              className="w-full sm:w-auto px-10 py-3 rounded-full bg-[color:var(--accent)] text-[color:var(--button-fg)] font-semibold shadow-sm hover:opacity-90 transition-opacity"
              aria-label="Enter Advaya"
            >
              Enter Advaya
            </button>
            <button
              onClick={goToEventPage}
              className="w-full sm:w-auto px-10 py-3 rounded-full bg-transparent font-semibold text-[color:var(--foreground)] hover:opacity-90 transition-opacity"
              aria-label="View all events"
            >
              View Events
            </button>
          </motion.div>

          <div className="mt-5 flex items-center justify-center">
            <div className="px-6 py-2 rounded-full bg-transparent">
              <CountdownTimer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
