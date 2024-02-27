import { useEffect, useState } from "react";
import OnlineStatus from "../lobby/OnlineStatus";
import MinimizeArrow from "../ui/MinimizeArrow";
import User from "../lobby/User";
import GameOnlineStatus from "../lobby/GameOnlineStatus";

export default function GameUserList() {
  const [minimized, setMinimized] = useState(false);
  // const [users, setUsers] = useState([]);

  return (
    <div className={`w-full ${minimized ? "h-10" : "h-1/2"} outline outline-gray-400 outline-1 rounded-t-md rounded-b-none  px-3 py-3 overflow-hidden`}>
      <div className="flex items-center">
        <GameOnlineStatus />
        <MinimizeArrow minimized={minimized} setMinimized={setMinimized} />
      </div>
      <div className={`overflow-scroll ${minimized && "hidden"}`}>
        {/* {users.map((user, index) => {
          return <User username={user.username} score={0} key={index} userID={user.userIDString} />;
        })} */}
      </div>
    </div>
  );
}
