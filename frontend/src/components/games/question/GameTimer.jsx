import { useEffect, useState } from "react";
import { socket } from "../../../global/socket";

export default function GameTimer({ competition }) {
  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {
    socket.on("game:newQuestion", function () {
      setTimeLeft(300);
    });

    const timeout = setTimeout(() => {
      // if (timeLeft != 30) return;
      setTimeLeft(timeLeft - 1);
    }, 100);

    if (timeLeft == 0) {
      clearTimeout(timeout);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [timeLeft]);

  function formatTime() {
    // let minutes = Math.floor(timeLeft / 60) == 0 ? "00" : Math.floor(timeLeft / 60);
    // let seconds = timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60;
    let seconds = Math.floor(timeLeft / 10);
    let deciseconds = timeLeft % 10;
    return `${seconds}.${deciseconds}`;
  }

  const formattedTime = formatTime();

  return <div className="text-xl font-semibold font-jocke ">{formattedTime}</div>;
}
