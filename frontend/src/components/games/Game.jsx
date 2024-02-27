import { socket } from "../../connection/socket";
import { useState } from "react";
import GameStartScreen from "./GameStartScreen";
import { useLoaderData, useNavigate, Link } from "react-router-dom";
import GameProblem from "./GameProblem";
import GameTimer from "./GameTimer";

export default function Game({ room }) {
  const [gameStarted, setGameStarted] = useState(true);
  const [playersJoined, setPlayersJoined] = useState([]);
  const result = useLoaderData();
  const navigate = useNavigate();

  console.log(result);

  if (result.room == undefined) {
    navigate("/");
  }

  function startGame() {
    socket.emit("game:start");
  }

  function leaveGame() {
    socket.emit("game:leave");
  }

  return (
    <div className="flex flex-col h-full px-7 pb-7 pt-3 w-full relative  outline outline-1 outline-gray-400 rounded-lg ">
      {!gameStarted && <GameStartScreen startGame={startGame} leaveGame={leaveGame} room={result.room} />}
      {gameStarted && <GameProblem />}
    </div>
  );
}
