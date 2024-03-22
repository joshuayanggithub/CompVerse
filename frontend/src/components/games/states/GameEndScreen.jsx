import GameHeader from "../GameHeader";

export default function GameEndScreen({ roomData }) {
  return (
    <div className="w-full h-full flex flex-col items-center relative">
      <div className="flex w-full justify-start">
        <GameHeader roomName={roomData.roomName} competition={roomData.competition} gameLength={roomData.gameLength} />
      </div>
    </div>
  );
}
