import { useEffect, useState } from "react";
import { socket } from "../../../global/socket";
import ButtonWrapper from "../../ui/wrappers/ButtonWrapper";
import { useNavigate } from "react-router-dom";
import GameHeader from "../GameHeader";

export default function GameStartScreen({ roomData }) {
  const navigate = useNavigate();
  const [isRoomLeader, setIsRoomLeader] = useState(socket.auth.userID == roomData.roomLeaderString);

  function leaveGame() {
    socket.emit("room:leave");
    navigate("/");
  }

  function startGame() {
    socket.emit("game:start", socket.auth.userID);
  }

  useEffect(() => {
    socket.on("room:leader", (IDLeader) => {
      if (socket.auth.userID == IDLeader) {
        setIsRoomLeader(true);
      }
    });

    return () => {
      socket.off("room:leader");
    };
  });

  return (
    <div className="w-full h-full flex flex-col items-center relative">
      <div className="flex w-full justify-start">
        <GameHeader roomName={roomData.roomName} competition={roomData.competition} gameLength={roomData.gameLength} />
      </div>

      <div className="w-full flex flex-col justify-center items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-5xl font-bold font-jost ">{isRoomLeader ? "Start Game When Ready..." : "Waiting for User to Start Game..."}</h1>
        <img src="/snoopy.gif" />
        <div className="flex gap-5">
          {isRoomLeader && (
            <ButtonWrapper onClick={startGame} width={"w-40"}>
              Start Game
            </ButtonWrapper>
          )}
          <ButtonWrapper onClick={leaveGame} color={"bg-red-400"} width={"w-40"}>
            Leave Game
          </ButtonWrapper>
        </div>
      </div>
    </div>
  );
}
