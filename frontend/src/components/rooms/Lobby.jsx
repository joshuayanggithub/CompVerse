import { useState } from "react";
import Rooms from "./Rooms";
import CreateRoomButton from "./CreateRoomButton";
import CreateRoomModal from "./CreateRoomModal";
import UsernameSelect from "../chat/usernameSelect";
import { SlSettings } from "react-icons/sl";
import ErrorModal from "../ui/ErrorModal";

export default function Lobby({ username, setUsername }) {
  const [createRoom, setCreateRoom] = useState(false);
  const [error, setError] = useState("");

  const [settings, setSettings] = useState(false);

  return (
    <div className="flex flex-col h-full px-7 pb-7 pt-3 w-full relative justify-between outline outline-1 outline-gray-400 rounded-lg ">
      <Rooms createRoom={createRoom} />
      <div className={`${createRoom && ""} flex gap-2 items-center`}>
        <CreateRoomButton modalOpen={createRoom} setModalOpen={setCreateRoom} />
        <UsernameSelect username={username} setUsername={setUsername} />
        <SlSettings size={22} fill={"gray"} className="hover:cursor-pointer" onClick={() => setSettings(true)} />
      </div>
      {createRoom && <CreateRoomModal modalOpen={createRoom} setModalOpen={setCreateRoom} />}
      {error && <ErrorModal error={error} setError={setError} />}
    </div>
  );
}
