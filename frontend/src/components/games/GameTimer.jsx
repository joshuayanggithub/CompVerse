import { useState } from "react";

export default function GameTimer({ startingTime }) {
  const [timeLeft, setTimeLeft] = useState(startingTime);

  const timeout = setTimeout(() => {
    setTimeLeft(timeLeft - 1);
  }, 1000);

  if (timeLeft == 0) {
    clearTimeout(timeout);
  }

  function formatTime() {
    let minutes = Math.floor(timeLeft / 60) == 0 ? "00" : Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60;
    return `${minutes}:${seconds}`;
  }

  const formattedTime = formatTime();

  return <div className="text-xl">{formattedTime}</div>;
}
