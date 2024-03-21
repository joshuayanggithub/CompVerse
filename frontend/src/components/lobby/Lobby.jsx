import { useEffect, useState } from "react";
import Rooms from "./rooms/Rooms";
import CreateRoomButton from "./rooms/CreateRoomButton";
import CreateRoomModal from "./rooms/CreateRoomModal";
import UsernameSelect from "./UsernameSelect";
import { SlSettings } from "react-icons/sl";
import ErrorModal from "../ui/ErrorModal";
import { socket } from "../../global/socket";

export default function Lobby({ username, setUsername }) {
  const [createRoom, setCreateRoom] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    socket.on("error", function (error) {
      //AppError format
      console.log(error);
      setError(error.message);
    });

    socket.emit("room:join", "lobby");

    return () => {
      socket.off("error");
    };
  }, []);

  return (
    <div className="flex flex-col h-full px-7 pb-7 pt-3 w-full relative justify-between outline outline-1 outline-gray-400 rounded-lg ">
      <Rooms createRoom={createRoom} setError={setError} />
      <div className={`${createRoom && ""} flex gap-2 items-center`}>
        <CreateRoomButton modalOpen={createRoom} setModalOpen={setCreateRoom} />
        <UsernameSelect username={username} setUsername={setUsername} />
        <SlSettings size={22} fill={"gray"} className="hover:cursor-pointer" />
      </div>
      {createRoom && <CreateRoomModal modalOpen={createRoom} setModalOpen={setCreateRoom} />}
      {error && <ErrorModal error={error} setError={setError} />}
    </div>
  );
}
