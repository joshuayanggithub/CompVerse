import { useEffect, useState } from "react";
import MinimizeArrow from "../../ui/MinimizeArrow";
import User from "./User";
import { socket } from "../../../global/socket";
import OnlineStatus from "./OnlineStatus";

export default function Scoreboard({ height, _id }) {
  const [minimized, setMinimized] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchAllUsersInRoom = async () => {
      try {
        console.log(_id);
        const response = await fetch(`${import.meta.env.VITE_API_URL_DEV}api/room/${_id}`, {
          signal,
          method: "GET",
          headers: { "Content-Type": "application/json" }, //LITERALLY 30 MINUTES OF DEBUGGING
        });
        const result = await response.json();
        console.log(result.data.room.users);
        const arr = Object.keys(result.data.room.users).map((userID) => ({ userID, ...result.data.room.users[userID] }));
        console.log(arr);
        setUsers(arr);
      } catch (error) {
        console.error(error);
      }
    };

    socket.on("room:update", function () {
      //new users
      console.log("updated room");
      fetchAllUsersInRoom();
    });

    return () => {
      controller.abort();
      socket.off("room:update");
    };
  }, []);

  return (
    <div className={`w-full ${minimized ? "h-10" : height} outline outline-gray-400 outline-1 rounded-t-md rounded-b-none  px-3 py-3 overflow-hidden`}>
      <div className="flex items-center">
        <OnlineStatus playersOnline={users.length} socketRoomId={_id} />
        <MinimizeArrow minimized={minimized} setMinimized={setMinimized} />
      </div>
      <div className={`overflow-scroll ${minimized && "hidden"}`}>
        {users.map((user, index) => {
          return <User username={user.username} score={user.score} key={index} userID={user.userIDString} buzzed={user.buzzed} />;
        })}
      </div>
    </div>
  );
}
