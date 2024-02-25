import { useState } from "react";
import ButtonWrapper from "../ui/ButtonWrapper";
import RoomHeadCount from "../ui/RoomHeadCount";

export default function Room({ roomName, roomGame, joined }) {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="flex justify-between outline outline-gray-400 outline-1 rounded-lg p-5 w-full font-jost h-32 hover:cursor-pointer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="flex flex-col justify-between h-full">
        <div className="text-black text-lg overflow-scroll">{"Room " + roomName}</div>
        <div className="text-gray-400 text-md font-light">{roomGame}</div>
        <div className="relative h-1/3 w-full">
          <RoomHeadCount online={joined} maxHeadCount={3} size={7} style={"-translate-x-1/2 "} />
        </div>
      </div>
      <div className="h-full w-1/2 flex justify-around items-center flex-col">
        {!hover && <img src="/fighting.png" alt="waiting..." className="h-3/4" />}
        {hover && <ButtonWrapper>Join Game</ButtonWrapper>}
        <p className="text-gray-400 font-light text-xs text-center">Game Not Started</p>
      </div>
    </div>
  );
}
