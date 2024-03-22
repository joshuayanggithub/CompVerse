import { useEffect, useState } from "react";
import OnlineStatus from "./OnlineStatus";
import MinimizeArrow from "../../ui/MinimizeArrow";
import User from "./User";
import { socket } from "../../../global/socket";

export default function UserList({ height, socketRoomId }) {
  const [minimized, setMinimized] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchURL =
      socketRoomId == "lobby"
        ? `${import.meta.env.VITE_API_URL_DEV}api/user?` +
          new URLSearchParams({
            online: true,
          })
        : `${import.meta.env.VITE_API_URL_DEV}api/user?` +
          new URLSearchParams({
            online: true,
            room: socketRoomId,
          });

    const fetchAllUsers = async () => {
      try {
        const response = await fetch(fetchURL, {
          signal,
          method: "GET",
          headers: { "Content-Type": "application/json" }, //LITERALLY 30 MINUTES OF DEBUGGING
        });
        const result = await response.json();
        setUsers(result.data.users);
      } catch (error) {
        // console.error(error);
      }
    };

    fetchAllUsers();

    socket.on("room:update", fetchAllUsers); //roomUsersList
    socket.on("users:update", fetchAllUsers); //usersList for lobby

    return () => {
      controller.abort();
      // socket.off("room:update");
      socket.off("users:update");
    };
  }, []);

  return (
    <div className={`w-full ${minimized ? "h-10" : height} outline outline-gray-400 outline-1 rounded-t-md rounded-b-none  px-3 py-3 overflow-hidden`}>
      <div className="flex items-center">
        <OnlineStatus playersOnline={users.length} socketRoomId={socketRoomId} />
        <MinimizeArrow minimized={minimized} setMinimized={setMinimized} />
      </div>
      <div className={`overflow-scroll ${minimized && "hidden"}`}>
        {users.map((user, index) => {
          return <User username={user.username} score={user.gamesWon} key={index} userID={user.userIDString} />;
        })}
      </div>
    </div>
  );
}
