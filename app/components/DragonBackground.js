"use client";

import { motion, useReducedMotion } from "framer-motion";

const DRAGON_SRC = "/dragon-brush.png";

/**
 * Brush-style dragon PNG; black background knocks out via mix-blend-screen on dark UI.
 */
function DragonImage({ variant = "hero" }) {
  const sizeClass =
    variant === "echo"
      ? "h-auto w-[min(38vw,18rem)] max-h-[min(42vh,360px)] object-contain object-center md:w-[min(34vw,16rem)]"
      : "h-auto w-[min(52vw,28rem)] max-h-[min(58vh,520px)] object-contain object-center sm:w-[min(48vw,26rem)] md:max-h-[min(62vh,560px)]";

  return (
    <img
      src={DRAGON_SRC}
      alt=""
      width={512}
      height={768}
      decoding="async"
      draggable={false}
      className={`select-none drop-shadow-[0_0_40px_rgba(52,211,153,0.35)] ${sizeClass}`}
    />
  );
}

export default function DragonBackground() {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return (
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        aria-hidden
      >
        <div className="absolute bottom-[4%] left-1/2 flex -translate-x-1/2 justify-center opacity-[0.14] mix-blend-screen">
          <DragonImage variant="hero" />
        </div>
      </div>
    );
  }

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <motion.div
        className="absolute bottom-[4%] left-0 will-change-transform"
        initial={{ x: "-45%" }}
        animate={{ x: ["-45%", "118vw"] }}
        transition={{
          x: {
            duration: 72,
            repeat: Infinity,
            ease: "linear",
          },
        }}
      >
        <motion.div
          className="will-change-transform"
          animate={{
            y: [0, -36, 22, -28, 18, 0],
            rotate: [-14, -4, 8, -2, 6, -14],
            scale: [1, 1.03, 0.98, 1.02, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="opacity-[0.22] mix-blend-screen md:opacity-[0.28]">
            <DragonImage variant="hero" />
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-[18%] right-0 will-change-transform"
        initial={{ x: "45%" }}
        animate={{ x: ["45%", "-118vw"] }}
        transition={{
          x: {
            duration: 96,
            repeat: Infinity,
            ease: "linear",
            delay: 8,
          },
        }}
      >
        <motion.div
          className="will-change-transform"
          animate={{
            y: [0, 28, -20, 24, -12, 0],
            rotate: [10, 0, -8, 4, -6, 10],
            scale: [0.72, 0.76, 0.7, 0.74, 0.72],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="opacity-[0.1] mix-blend-screen md:opacity-[0.14]">
            <DragonImage variant="echo" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
