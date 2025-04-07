"use client";
import { useEffect, useState } from "react";

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    hasEventStarted: false,
  });

  useEffect(() => {
    const eventDate = new Date(2025, 4, 6, 11, 0); // May 6, 2025 11:00 AM

    const calculateTimeLeft = () => {
      const now = new Date();
      const diff = eventDate - now;

      if (diff <= 0) {
        return { hasEventStarted: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      return { days, hours, minutes, seconds, hasEventStarted: false };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {!timeLeft.hasEventStarted ? (
        <>
          <span>{timeLeft.days}d </span>
          <span>{String(timeLeft.hours).padStart(2, "0")}h </span>
          <span>{String(timeLeft.minutes).padStart(2, "0")}m </span>
          <span>{String(timeLeft.seconds).padStart(2, "0")}s</span>
        </>
      ) : (
        <>
          <span>Explore Events</span>
          <svg
            className="w-5 h-5 transition-transform group-hover:translate-x-1"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </>
      )}
    </>
  );
}
