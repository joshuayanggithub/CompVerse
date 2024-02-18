import { useEffect, useState } from "react";
import Chat from "../components/chat/Chat";
import Header from "../components/lobby/Header";
import { UserContext } from "../contexts/UserContext";
import OnlineStatus from "../components/lobby/OnlineStatus";
import RoomsList from "../components/rooms/RoomsList";

import { socket } from "../connection/socket";
import { authorizeUser } from "../connection/auth";

export default function LobbyPage() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchOrCreateUser = async () => {
      const user = await authorizeUser(signal);
      socket.auth.username = user.username;
      setUsername(user.username);
      socket.connect(); //manually connect only on component render of LobbyPage (Home Page should not connect socket)
    };

    fetchOrCreateUser();
    return () => {
      //React will call your cleanup function each time before the Effect runs again, and one final time when the component unmounts (gets removed)
      controller.abort();
      socket.disconnect(); //force disconnect when another page is visited!
    };
  }, []);

  // useEffect(() => {
  //   socket.on("player:recieveData", (user) => {
  //     localStorage.setItem("userID", user.userIDString);
  //     setUsername(user.username);
  //     socket.auth.username = user.username; //set username
  //   });

  //   return () => {
  //     socket.off("player:recieveData");
  //   };
  // });

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      <div className="flex w-full h-full p-5 box-border gap-3">
        <div className="flex flex-col h-full w-3/4 justify-center ">
          <div className="h-[5%]">
            <Header />
          </div>
          <div className="h-[95%]">
            <RoomsList />
          </div>
        </div>
        <div className="flex flex-col h-full w-1/4 justify-center ">
          <div className="h-[5%] w-full">
            <OnlineStatus />
          </div>
          <div className="h-[95%]">
            <Chat />
          </div>
        </div>
      </div>
    </UserContext.Provider>
  );
}
