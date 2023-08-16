import { useEffect, useState } from "react";
import { socket } from "../../socket";
import HeadCount from "../ui/HeadCount";

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
    <div className="flex justify-between items-center h-[10%] w-full">
      <div className="flex items-center justify-center gap-1">
        <div className="w-[5px] h-[5px] rounded-lg bg-green-500"></div>
        <div>{`Users Online: ${playersOnline}`}</div>
      </div>
      <HeadCount online={playersOnline} />
    </div>
  );
}
