import Header from "../components/nav/Header";
import Lobby from "../components/lobby/Lobby";

import Sidebar from "../components/sidebar/Sidebar";
import { useState } from "react";

export default function LobbyPage() {
  const [profile, toggleProfile] = useState("");

  return (
    <>
      <div className="flex flex-col w-full h-full box-border py-5">
        <div className="h-[10%] w-full">
          <div className="h-full">
            <Header />
          </div>
        </div>
        <div className="flex h-[90%] w-full justify-evenly items-center">
          <div className="h-full w-[73%]">
            <Lobby profile={profile} toggleProfile={toggleProfile} />
          </div>
          <div className="h-full w-[23%]">
            <Sidebar socketRoomId="lobby" toggleProfile={toggleProfile} chatHeight={"h-2/3"} userListHeight={"h-1/3"} />
          </div>
        </div>
      </div>
    </>
  );
}
