import Header from "../components/page/Header";
import Lobby from "../components/lobby/Lobby";

import ChatAndUserList from "../components/lobby/ChatAndUserList";

export default function PlayPage() {
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
            <Lobby />
          </div>
          <div className="h-full w-[23%]">
            <ChatAndUserList />
          </div>
        </div>
      </div>
    </>
  );
}