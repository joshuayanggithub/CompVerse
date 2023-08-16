import { useState } from "react";
import { socket } from "../../socket";

export default function Online() {
  const [playersOnline, setPlayersOnline] = useState(0);

  socket.on("player:countChanged", (online) => {
    console.log(online);
    setPlayersOnline(online);
  });

  return (
    <div className="flex justify-between items-center h-[5%]">
      <div className="flex items-center justify-center gap-1">
        <div className="w-[5px] h-[5px] rounded-lg bg-green-500"></div>
        <div>{`Users Online: ${playersOnline}`}</div>
      </div>
      <div className="flex h-full justify-between items-center">
        <img src="/anonymous.avif" className="h-[80%]" />
      </div>
    </div>
  );
}
