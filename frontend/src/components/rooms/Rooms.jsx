import Room from "./Room";
import { socket } from "../../connection/socket";
import { useEffect, useState } from "react";

export default function Rooms({ createRoom, joinRoom, setJoinRoom }) {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchAllRooms = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL_DEV}api/room`, {
          signal,
          method: "GET",
          headers: { "Content-Type": "application/json" }, //LITERALLY 30 MINUTES OF DEBUGGING
        });
        const result = await response.json();
        setRooms(result.data.rooms);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAllRooms();

    socket.on("room:created", function (room) {
      // try {
      //   const response = await fetch(`${import.meta.env.VITE_API_URL_DEV}api/room`, {
      //     signal,
      //     method: "GET",
      //     headers: { "Content-Type": "application/json" }, //LITERALLY 30 MINUTES OF DEBUGGING
      //   });
      //   const result = await response.json();
      //   setRooms((rooms) => [...rooms, result.data.room]);
      // } catch (error) {
      //   console.error(error);
      // }
      // console.log(room);
      setRooms((rooms) => [...rooms, room]);
    });

    return () => {
      socket.off("room:create");
      socket.off("room:created");
      controller.abort();
    };
  }, []);

  if (rooms.length == 0) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <h1 className="text-xl text-gray-500 font-light">
          <i>No Games In Progress! Create a Room and invite A Friend Or Two!</i>
        </h1>
      </div>
    );
  } else {
    return (
      <div className={`grid grid-cols-3 content-start w-full gap-5 h-[90%] ${createRoom && "blur-[1px]"}`}>
        {rooms.map((room, index) => {
          return (
            <Room
              roomName={room.roomName}
              roomGame={room.competition}
              joined={room.users.length}
              started={room.started}
              key={index}
              joinRoom={joinRoom}
              setJoinRoom={setJoinRoom}
            />
          );
        })}
      </div>
    );
  }
}
