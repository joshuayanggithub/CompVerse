import ButtonWrapper from "../../ui/wrappers/ButtonWrapper";
import GameHeader from "../GameHeader";

export default function GameEndScreen({ roomData }) {
  return (
    <div className="w-full h-full flex flex-col items-center relative">
      <div className="flex w-full justify-start">
        <GameHeader roomName={roomData.roomName} competition={roomData.competition} gameLength={roomData.gameLength} />
      </div>

      <div className="w-full flex flex-col justify-center items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-5xl font-bold font-jost ">{isRoomLeader ? "Start Game When Ready..." : "Waiting for User to Start Game..."}</h1>
        <img src="/snoopy.gif" />
        <div className="flex gap-5">
          <ButtonWrapper color={"bg-red-400"} width={"w-40"}>
            Leave
          </ButtonWrapper>
        </div>
      </div>
    </div>
  );
}
