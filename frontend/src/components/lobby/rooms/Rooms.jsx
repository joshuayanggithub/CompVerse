import Room from "./Room";
import { socket } from "../../../global/socket";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Rooms({ createRoom, setError }) {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

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
        // setError(error.toString());
      }
    };

    fetchAllRooms();

    socket.on("rooms:update", function () {
      console.log("Joindsf");
      fetchAllRooms();
    });

    socket.on("room:transport", function (_id) {
      navigate(`/game/${_id}`);
      fetchAllRooms();
    });

    return () => {
      socket.off("room:transport");
      socket.off("rooms:update");
      controller.abort();
    };
  }, []);

  if (rooms.length == 0) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <h1 className="text-xl text-gray-500 font-light">
          <i>Create a Room or Invite A Friend Or Two!</i>
        </h1>
      </div>
    );
  } else {
    return (
      <>
        <div className="flex w-full justify-between pb-3">
          <div className="flex items-center gap-1 ">
            <div className="w-[5px] h-[5px] rounded-lg bg-blue-300"></div>
            <h3 className="italic text-gray-600 text-sm font-light">{`${rooms.length} Game Rooms In Progress...`}</h3>
          </div>
          <div className="flex items-center gap-1">
            <h3 className="italic text-gray-600 text-sm font-light">Join or Create Room to Get Started!</h3>
          </div>
        </div>
        <div className={`grid grid-cols-3 content-start w-full gap-10 h-[80%] overflow-scroll p-1 ${createRoom && "blur-[1px]"}`}>
          {rooms.map((room, index) => {
            return <Room room={room} key={index} />;
          })}
        </div>
      </>
    );
  }
}
