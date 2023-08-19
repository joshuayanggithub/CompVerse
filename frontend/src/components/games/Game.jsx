import Chat from "../chat/Chat";
import GameProblem from "./GameProblem";
import GameUserList from "./GameUserList";
import { socket } from "../../socket";
import { useState } from "react";
import GameStartScreen from "./GameStartScreen";

export default function Game() {
  const [gameStarted, setGameStarted] = useState(false);
  const [playersJoined, setPlayersJoined] = useState([]);

  function sendPlayerStatus({ status }) {
    let data = {
      message: status,
      userId: socket.id,
      date: new Date(),
    };
    socket.emit("chat message", data);
  }

  return (
    <div className="flex flex-col w-full h-full p-5 box-border gap-3">
      <div className="flex w-full h-5/6 justify-center ">
        {gameStarted ? (
          <GameProblem />
        ) : (
          <GameStartScreen playersJoined={playersJoined} />
        )}
        <div className="flex flex-col h-full w-1/4 justify-center ">
          <Chat />
        </div>
      </div>
      <div className="flex w-full h-1/6 justify-center ">
        {gameStarted && <GameUserList />}
      </div>
    </div>
  );
}
