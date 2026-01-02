import { useState, useEffect } from "react";
import { weddingDate } from "../../data/weddingData";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = weddingDate.getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div
      className="flex justify-center gap-4 md:gap-8"
      role="timer"
      aria-label="Countdown to wedding day"
    >
      {timeUnits.map((unit) => (
        <div key={unit.label} className="text-center">
          <div className="bg-card/80 backdrop-blur-sm rounded-lg p-4 md:p-6 min-w-[70px] md:min-w-[90px] shadow-soft">
            <span
              className="block font-display text-2xl md:text-4xl text-foreground"
              aria-live="polite"
            >
              {String(unit.value).padStart(2, "0")}
            </span>
          </div>
          <span className="text-xs md:text-sm text-muted-foreground mt-2 block">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}
