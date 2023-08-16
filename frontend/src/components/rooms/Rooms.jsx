import Room from "./Room";
import { socket } from "../../socket";
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

  if (rooms.length == 0) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <h1 className="text-xl text-gray-500">
          <i>No Games In Progress! Maybe Invite A Friend Or Two!</i>
        </h1>
      </div>
    );
  } else {
    return (
      <div
        className={`grid grid-cols-2 w-full gap-5 h-[90%] ${
          modalOpen && "blur-[1px]"
        }`}
      >
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
    );
  }
}