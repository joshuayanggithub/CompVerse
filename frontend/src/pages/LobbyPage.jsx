import { useEffect, useState } from "react";
import Chat from "../components/chat/Chat";
import Header from "../components/lobby/Header";
import OnlineStatus from "../components/lobby/OnlineStatus";
import RoomsList from "../components/rooms/RoomsList";

import { socket } from "../socket";

export default function LobbyPage() {
  const [username, setUsername] = useState();

  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    });

    socket.on("user:newid", ({ userID, username }) => {
      setUsername(username);
    });

    return () => {
      socket.off("chat:message");
      socket.off("user:newid");
    };
  }, []);

  return (
    <div className="flex w-full h-full p-5 box-border gap-3">
      <div className="flex flex-col h-full w-3/4 justify-center ">
        <div className="h-[5%]">
          <Header />
        </div>
        <div className="h-[95%]">
          <RoomsList username={username} setUsername={setUsername} />
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
