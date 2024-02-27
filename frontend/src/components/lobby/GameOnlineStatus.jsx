import { useEffect, useState } from "react";
import { socket } from "../../connection/socket";
// import HeadCount from "../ui/HeadCount";

export default function GameOnlineStatus() {
  const [usersPlaying, setUsersPlaying] = useState(0);

  useEffect(() => {
    socket.on("room:countChanged", (number) => {
      console.log(number);
      setUsersPlaying(number);
    });

    return () => {
      socket.off("room:countChanged");
    };
  }, []);

  return (
    <div className="flex justify-between items-center h-full w-full">
      <div className="flex items-center justify-center gap-1">
        <div className="w-[5px] h-[5px] rounded-lg bg-green-500"></div>
        <h3 className="italic text-gray-600 text-sm font-light">{`Scoreboard of ${usersPlaying} Users`}</h3>
      </div>
      {/* <HeadCount online={playersOnline} maxHeadCount={10} size={7} style={""} /> */}
    </div>
  );
}
