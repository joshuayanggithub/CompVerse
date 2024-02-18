import { useState } from "react";
import Rooms from "./Rooms";
import CreateRoomButton from "./CreateRoomButton";
import CreateRoomModal from "./CreateRoomModal";
import UsernameSelect from "../chat/usernameSelect";
import JoinRoomModal from "./JoinRoomModal";

export default function RoomsList({ username, setUsername }) {
  const [createRoom, setCreateRoom] = useState(false);
  const [joinRoom, setJoinRoom] = useState(false);

  return (
    <div className="flex flex-col h-full p-10 w-full relative justify-between outline outline-1 outline-gray-400 rounded-lg ">
      <Rooms createRoom={createRoom} joinRoom={joinRoom} setJoinRoom={setJoinRoom} />
      {!createRoom && (
        <div className="flex gap-2">
          <CreateRoomButton modalOpen={createRoom} setModalOpen={setCreateRoom} />
          <UsernameSelect username={username} setUsername={setUsername} />
        </div>
      )}
      {createRoom && <CreateRoomModal modalOpen={createRoom} setModalOpen={setCreateRoom} />}
      {joinRoom && <JoinRoomModal modalOpen={joinRoom} setModalOpen={setJoinRoom} />}
    </div>
  );
}
