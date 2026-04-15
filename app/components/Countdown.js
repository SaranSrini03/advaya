"use client";
import { useEffect, useState } from "react";

export default function CountdownTimer({
  targetDate,
  targetMonthIndex = 3, // April (0-based)
  targetDay = 15,
  targetHour = 0,
  completedText = "Event started",
  displayMode = "full",
  durationHours,
  durationMinutes,
  durationSeconds,
}) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    hasEventStarted: false,
  });

  useEffect(() => {
    const hasDurationOverride =
      Number.isFinite(durationHours) ||
      Number.isFinite(durationMinutes) ||
      Number.isFinite(durationSeconds);

    const durationInMs =
      Math.max(0, Number(durationHours) || 0) * 60 * 60 * 1000 +
      Math.max(0, Number(durationMinutes) || 0) * 60 * 1000 +
      Math.max(0, Number(durationSeconds) || 0) * 1000;

    const now = new Date();
    const eventDate = hasDurationOverride
      ? new Date(now.getTime() + durationInMs)
      : typeof targetDate === "string" && targetDate.length > 0
        ? new Date(targetDate)
        : new Date(now.getFullYear(), targetMonthIndex, targetDay, targetHour, 0, 0, 0);

    // If the event date already passed, count down to the next occurrence.
    if (!hasDurationOverride && eventDate - now < 0) {
      eventDate.setFullYear(eventDate.getFullYear() + 1);
    }

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
  }, [targetDate, targetMonthIndex, targetDay, targetHour, durationHours, durationMinutes, durationSeconds]);

  return (
    <>
      {!timeLeft.hasEventStarted ? (
        displayMode === "clock" ? (
          <span>
            {String(timeLeft.days * 24 + timeLeft.hours).padStart(2, "0")}:
            {String(timeLeft.minutes).padStart(2, "0")}
          </span>
        ) : displayMode === "hms" ? (
          <span>
            {String(timeLeft.days * 24 + timeLeft.hours).padStart(2, "0")}h:
            {String(timeLeft.minutes).padStart(2, "0")}m:
            {String(timeLeft.seconds).padStart(2, "0")}s
          </span>
        ) : (
          <>
            <span>{timeLeft.days}d </span>
            <span>{String(timeLeft.hours).padStart(2, "0")}h </span>
            <span>{String(timeLeft.minutes).padStart(2, "0")}m </span>
            <span>{String(timeLeft.seconds).padStart(2, "0")}s</span>
          </>
        )
      ) : (
        <>
          <span>{completedText}</span>
        </>
      )}
    </>
  );
}
