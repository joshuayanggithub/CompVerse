import { useEffect, useState } from "react";
import Chat from "../components/chat/Chat";
import Header from "../components/lobby/Header";
import OnlineStatus from "../components/lobby/OnlineStatus";
import RoomsList from "../components/rooms/RoomsList";

import { socket } from "../socket";

export default function LobbyPage() {
  const [username, setUsername] = useState();

  useEffect(() => {
    socket.on("session", ({ sessionID, userID, username }) => {
      // attach the session ID to the next reconnection attempts, session null will be dealt with server-side
      socket.auth = { sessionID };
      // store it in the localStorage
      localStorage.setItem("sessionID", sessionID);
      // save the ID of the user
      socket.userID = userID;
      socket.username = username;
      // console.log(username);
      setUsername(username);
    });

    return () => {
      socket.off("session");
    };
  }, []);

  return (
    <div className="flex w-full h-full p-5 box-border gap-3">
      <div className="flex flex-col h-full w-3/4 justify-center ">
        <div className="h-[5%]">
          <Header />
        </div>
        <div className="h-[95%]">
          <RoomsList username={username} />
        </div>
      </div>
      <div className="flex flex-col h-full w-1/4 justify-center ">
        <div className="h-[5%] w-full">
          <OnlineStatus />
        </div>
        <div className="h-[95%]">
          <Chat username={username} />
        </div>
      </div>
    </div>
  );
}
