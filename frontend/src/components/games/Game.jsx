import { socket } from "../../connection/socket";
import { useState } from "react";
import GameStartScreen from "./start/GameStartScreen";
import GameProblem from "./question/GameProblem";
import GameHeader from "./GameHeader";

export default function Game({ roomData }) {
  const [gameStarted, setGameStarted] = useState(false);
  const [playersJoined, setPlayersJoined] = useState([]);

  return (
    <div className="flex flex-col h-full px-7 pb-7 pt-3 w-full relative  outline outline-1 outline-gray-400 rounded-lg ">
      <GameHeader roomName={roomData.roomName} competition={roomData.competition} />
      {!gameStarted && <GameStartScreen room={roomData} />}
      {gameStarted && <GameProblem />}
    </div>
  );
}
