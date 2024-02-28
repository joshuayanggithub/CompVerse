import { useEffect, useState } from "react";
import ButtonWrapper from "../ui/wrappers/ButtonWrapper";
import RoomHeadCount from "../ui/RoomHeadCount";
import { socket } from "../../connection/socket";
import { useNavigate } from "react-router-dom";

export default function Room({ room }) {
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();

  const joinRoom = () => {
    socket.emit("room:join", { _id: room._id });
  };

  useEffect(() => {
    socket.on("room:transport", function (roomJoining) {
      console.log(roomJoining);
      navigate(`/game/${roomJoining._id}`);
    });

    return () => {
      socket.off("room:transport");
    };
  }, []);
  //roomName={room.roomName} roomGame={room.competition} joined={room.users.length} started={room.started}
  return (
    <div
      className="flex justify-between outline outline-gray-400 outline-1 rounded-lg p-5 w-full font-jost h-32 hover:cursor-pointer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="flex flex-col justify-between h-full">
        <div className="text-black text-lg overflow-scroll">{"Room " + room.roomName}</div>
        <div className="text-gray-400 text-md font-light">{room.competition}</div>
        <div className="relative h-1/3 w-full">
          <RoomHeadCount online={Object.keys(room.users).length} maxHeadCount={3} size={7} style={"-translate-x-1/2 "} />
        </div>
      </div>
      <div className="h-full w-1/2 flex justify-around items-center flex-col">
        {!hover && <img src="/fighting.png" alt="waiting..." className="h-3/4" />}
        {hover && <ButtonWrapper onClick={joinRoom}>Join Game</ButtonWrapper>}
        {!room.started && <p className="text-gray-400 font-light text-xs text-center">Game Not Started</p>}
      </div>
    </div>
  );
}
