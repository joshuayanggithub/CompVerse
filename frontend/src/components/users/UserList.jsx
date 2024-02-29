import { useEffect, useState } from "react";
import OnlineStatus from "./OnlineStatus";
import MinimizeArrow from "../ui/MinimizeArrow";
import User from "./User";
import { socket } from "../../global/socket";

export default function UserList({ height }) {
  const [minimized, setMinimized] = useState(false);
  const [users, setUsers] = useState([]);
  const [playersOnline, setPlayersOnline] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchAllUsers = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL_DEV}api/user?` +
            new URLSearchParams({
              online: true,
            }),
          {
            signal,
            method: "GET",
            headers: { "Content-Type": "application/json" }, //LITERALLY 30 MINUTES OF DEBUGGING
          }
        );
        const result = await response.json();
        setUsers(result.data.users);
      } catch (error) {
        // console.error(error);
      }
    };

    socket.on("user:countChanged", fetchAllUsers);

    socket.on("user:refresh", fetchAllUsers);

    return () => {
      controller.abort();
      socket.off("user:countChanged");
      socket.off("user:refresh");
    };
  }, []);

  return (
    <div className={`w-full ${minimized ? "h-10" : height} outline outline-gray-400 outline-1 rounded-t-md rounded-b-none  px-3 py-3 overflow-hidden`}>
      <div className="flex items-center">
        <OnlineStatus playersOnline={playersOnline} setPlayersOnline={setPlayersOnline} />
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
