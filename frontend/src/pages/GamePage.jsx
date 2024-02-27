import ChatAndGameUserList from "../components/games/ChatAndGameUserList";
import Game from "../components/games/Game";
import Header from "../components/lobby/Header";

export default function GamePage() {
  return (
    <div className="flex flex-col w-full h-full box-border py-5">
      <div className="h-[10%] w-full">
        <div className="h-full">
          <Header />
        </div>
      </div>
      <div className="flex h-[90%] w-full justify-evenly items-center">
        <div className="h-full w-[73%]">
          <Game />
        </div>
        <div className="h-full w-[23%]">
          <ChatAndGameUserList />
        </div>
      </div>
    </div>
  );
}
