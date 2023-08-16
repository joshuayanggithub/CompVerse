import Room from "./Room";
import { socket } from "../socket";
import { useEffect, useState } from "react";

export default function Rooms({ modalOpen }) {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    socket.on("game:read", function (gameData) {
      setRooms((rooms) => [...rooms, gameData]);
    });

    return () => {
      socket.off("game:read");
    };
  }, []);

  return (
    <div className={`${modalOpen && "blur-[1px]"}`}>
      <div className="grid grid-cols-2 w-full gap-5">
        {rooms.map((room, index) => {
          return (
            <Room
              roomName={room.gameName}
              roomGame={room.competition}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
}
