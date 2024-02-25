import { useEffect, useState } from "react";
import OnlineStatus from "./OnlineStatus";
import MinimizeArrow from "../ui/MinimizeArrow";
import User from "./User";

export default function UserList() {
  const [minimized, setMinimized] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchAllUsers = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL_DEV}api/user?online=true`, {
          signal,
          method: "GET",
          headers: { "Content-Type": "application/json" }, //LITERALLY 30 MINUTES OF DEBUGGING
        });
        const result = await response.json();
        setUsers(result.data.users);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAllUsers();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div
      className={`w-full ${minimized ? "h-10" : "h-1/6"} outline outline-gray-400 outline-1 rounded-t-md rounded-b-none  px-3 py-3 overflow-hidden`}
    >
      <div className="flex items-center">
        <OnlineStatus />
        <MinimizeArrow minimized={minimized} setMinimized={setMinimized} />
      </div>
      <div className={`overflow-scroll ${minimized && "hidden"}`}>
        {users.map((user, index) => {
          return <User username={user.username} score={0} key={index} />;
        })}
      </div>
    </div>
  );
}
