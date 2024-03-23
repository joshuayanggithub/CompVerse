import { socket } from "../../global/socket";
import { useEffect, useState } from "react";
import GameStartScreen from "./states/GameStartScreen";
import GameQuestionScreen from "./states/GameQuestionScreen";
import ErrorModal from "../ui/modals/ErrorModal";
import { useNavigate } from "react-router-dom";
import GameEndScreen from "./states/GameEndScreen";

export default function Game({ roomData }) {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameError, setGameError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("game:started", function () {
      setGameStarted(true);
      socket.emit("");
    });

    socket.on("game:end", function () {
      navigate("/");
    });

    socket.on("error", function () {
      setGameError(gameError);
    });

    return () => {
      socket.off("game:started");
      socket.off("game:end");
    };
  });

  return (
    <div className="flex flex-col h-full px-7 pb-7 pt-3 w-full relative  outline outline-1 outline-gray-400 rounded-lg ">
      {!gameStarted && <GameStartScreen roomData={roomData} />}
      {gameStarted && <GameQuestionScreen roomData={roomData} />}
      {gameError && <ErrorModal error={gameError} setError={setGameError} />}
    </div>
  );
}
