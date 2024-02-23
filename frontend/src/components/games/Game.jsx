import { socket } from "../../connection/socket";
import { useState } from "react";
import GameStartScreen from "./GameStartScreen";

export default function Game({ room }) {
  const [gameStarted, setGameStarted] = useState(false);
  const [playersJoined, setPlayersJoined] = useState([]);

  function sendPlayerStatus({ status }) {
    let data = {
      message: status,
      userId: socket.id,
      date: new Date(),
    };
    socket.emit("chat:message", data);
  }

  function startGame() {
    socket.emit("game:start");
  }

  function leaveGame() {
    socket.emit("game:leave");
  }

  return (
    <div className="flex flex-col h-full px-7 pb-7 pt-3 w-full relative  outline outline-1 outline-gray-400 rounded-lg ">
      <div className="italic font-md text-gray-600 font-light ">{`Room ${""} / ${""}`}</div>
      {!gameStarted && <GameStartScreen startGame={startGame} leaveGame={leaveGame} />}
    </div>
  );
}
