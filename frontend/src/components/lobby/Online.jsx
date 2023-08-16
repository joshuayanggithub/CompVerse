import { useEffect, useState } from "react";
import { socket } from "../../socket";

export default function Online() {
  const [playersOnline, setPlayersOnline] = useState(0);

  useEffect(() => {
    socket.on("player:countChanged", (online) => {
      console.log(online);
      setPlayersOnline(online);
    });

    return () => {
      socket.off("player:countChanged");
    };
  });

  return (
    <div className="flex justify-between items-center h-[10%]">
      <div className="flex items-center justify-center gap-1">
        <div className="w-[5px] h-[5px] rounded-lg bg-green-500"></div>
        <div>{`Users Online: ${playersOnline}`}</div>
      </div>
      <div className="flex w-10 h-10 justify-between items-center">
        <img src="/anonymous.avif" className="h-[80%]" />
      </div>
    </div>
  );
}
