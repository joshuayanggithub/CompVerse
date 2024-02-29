import { socket } from "../../../global/socket";
import ButtonWrapper from "../../ui/wrappers/ButtonWrapper";
import { useNavigate } from "react-router-dom";

export default function GameStartScreen() {
  const navigate = useNavigate();

  function leaveGame() {
    socket.emit("room:leave");
    navigate("/");
  }

  function startGame() {
    socket.emit("room:start");
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold font-jost ">Waiting for Game to Start...</h1>
      <img src="/snoopy.gif" />
      <div className="flex gap-5">
        <ButtonWrapper onClick={startGame} width={"w-40"}>
          Start Game
        </ButtonWrapper>
        <ButtonWrapper onClick={leaveGame} color={"bg-red-400"} width={"w-40"}>
          Leave Game
        </ButtonWrapper>
      </div>
    </div>
  );
}
