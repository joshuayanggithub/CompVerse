import { useState } from "react";
import Rooms from "./Rooms";
import CreateRoomButton from "./CreateRoomButton";
import CreateRoomModal from "./CreateRoomModal";
import UsernameSelect from "../chat/usernameSelect";
import JoinRoomModal from "./JoinRoomModal";
import { SlSettings } from "react-icons/sl";
import { GoGear } from "react-icons/go";

export default function Lobby({ username, setUsername }) {
  const [createRoom, setCreateRoom] = useState(false);
  const [joinRoom, setJoinRoom] = useState(false);
  const [settings, setSettings] = useState(false);

  return (
    <div className="flex flex-col h-full px-7 pb-7 pt-3 w-full relative justify-between outline outline-1 outline-gray-400 rounded-lg ">
      <Rooms createRoom={createRoom} joinRoom={joinRoom} setJoinRoom={setJoinRoom} />
      {!createRoom && (
        <div className="flex gap-2 items-center">
          <CreateRoomButton modalOpen={createRoom} setModalOpen={setCreateRoom} />
          <UsernameSelect username={username} setUsername={setUsername} />
          <SlSettings size={22} fill={"gray"} className="hover:cursor-pointer" onClick={() => setSettings(true)} />
        </div>
      )}
      {createRoom && <CreateRoomModal modalOpen={createRoom} setModalOpen={setCreateRoom} />}
      {joinRoom && <JoinRoomModal modalOpen={joinRoom} setModalOpen={setJoinRoom} />}
    </div>
  );
}
