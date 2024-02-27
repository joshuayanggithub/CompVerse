import { useEffect, useState } from "react";
import Header from "../components/lobby/Header";
import { UserContext } from "../contexts/UserContext";
import Lobby from "../components/rooms/Lobby";

import { socket } from "../connection/socket";
import { authorizeUser } from "../connection/auth";
import ChatAndUserList from "../components/lobby/ChatAndUserList";
import DuplicateTabModal from "../components/lobby/DuplicateTabModal";

export default function LobbyPage() {
  const [username, setUsername] = useState("");
  const [duplicateTab, setDuplicateTab] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchOrCreateUser = async () => {
      const user = await authorizeUser(signal);
      socket.auth.username = user.username;
      socket.auth.id = user.userID;
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
    <>
      {!duplicateTab && (
        <UserContext.Provider value={{ username, setUsername }}>
          <div className="flex flex-col w-full h-full box-border py-5">
            <div className="h-[10%] w-full">
              <div className="h-full">
                <Header />
              </div>
            </div>
            <div className="flex h-[90%] w-full justify-evenly items-center">
              <div className="h-full w-[73%]">
                <Lobby />
              </div>
              <div className="h-full w-[23%]">
                <ChatAndUserList />
              </div>
            </div>
          </div>
        </UserContext.Provider>
      )}
      {duplicateTab && <DuplicateTabModal />}
    </>
  );
}
