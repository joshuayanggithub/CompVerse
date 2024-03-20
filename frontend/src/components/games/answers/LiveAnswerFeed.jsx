import { useEffect } from "react";
import { socket } from "../../../global/socket";

export default function LiveAnswerFeed({ username, currentAnswer }) {
  useEffect(() => {
    socket.on("game:answering", function () {});

    return () => {
      socket.off("game:answering");
    };
  }, []);

  return <div className="flex flex-col items-center justify-center gap-1 h-1/5"></div>;
}
