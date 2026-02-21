"use client";

import { useEffect, useState } from "react";

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("May 9, 2026 00:00:00").getTime();

    function calculate() {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center gap-3 md:gap-6 text-center mb-8 countdown-wrapper">
      <div>
        <p className="text-sm uppercase tracking-[0.25em] text-gray-200">
          Days
        </p>
        <p className="text-2xl md:text-6xl font-semibold">
          {timeLeft.days}
        </p>
      </div>
      <div>
        <p className="text-sm uppercase tracking-[0.25em] text-gray-200">
          Hours
        </p>
        <p className="text-2xl md:text-6xl font-semibold">
          {timeLeft.hours}
        </p>
      </div>
      <div>
        <p className="text-sm uppercase tracking-[0.25em] text-gray-200">
          Minutes
        </p>
        <p className="text-2xl md:text-6xl font-semibold">
          {timeLeft.minutes}
        </p>
      </div>
      <div>
        <p className="text-sm uppercase tracking-[0.25em] text-gray-200">
          Seconds
        </p>
        <p className="text-2xl md:text-6xl font-semibold">
          {timeLeft.seconds}
        </p>
      </div>
    </div>
  );
}
