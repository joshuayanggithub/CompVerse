import { useEffect } from "react";
import { socket } from "../../global/socket";
// import HeadCount from "../ui/HeadCount";

export default function OnlineStatus({ playersOnline, setPlayersOnline }) {
  useEffect(() => {
    socket.on("user:countChanged", (online) => {
      setPlayersOnline(online);
    });

    return () => {
      socket.off("user:countChanged");
    };
  }, []);

  return (
    <div className="flex justify-between items-center h-full w-full">
      <div className="flex items-center justify-center gap-1">
        <div className="w-[5px] h-[5px] rounded-lg bg-green-500"></div>
        <h3 className="italic text-gray-600 text-sm font-light">{`${playersOnline} User${playersOnline == 1 ? "" : "s"} Online`}</h3>
      </div>
      {/* <HeadCount online={playersOnline} maxHeadCount={10} size={7} style={""} /> */}
    </div>
  );
}
