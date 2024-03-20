import { socket } from "../../global/socket";
import { useEffect, useState } from "react";
import GameStartScreen from "./states/GameStartScreen";
import GameQuestionScreen from "./states/GameQuestionScreen";
import GameHeader from "./GameHeader";

export default function Game({ roomData }) {
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    socket.on("game:started", function () {
      setGameStarted(true);
      socket.emit("");
    });

    return () => {
      socket.off("game:started");
    };
  });

  return (
    <div className="flex flex-col h-full px-7 pb-7 pt-3 w-full relative  outline outline-1 outline-gray-400 rounded-lg ">
      <GameHeader roomName={roomData.roomName} competition={roomData.competition} />
      {!gameStarted && <GameStartScreen roomData={roomData} />}
      {gameStarted && <GameQuestionScreen roomData={roomData} />}
    </div>
  );
}
