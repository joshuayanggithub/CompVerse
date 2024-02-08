import { useState } from "react";
import Rooms from "./Rooms";
import CreateRoomButton from "./CreateRoomButton";
import CreateRoomModal from "./CreateRoomModal";
import UsernameSelect from "../chat/usernameSelect";

export default function RoomsList({ username, setUsername }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="flex flex-col h-full p-10 w-full relative justify-between outline outline-1 outline-gray-400 rounded-lg ">
      <Rooms modalOpen={modalOpen} />
      {!modalOpen && (
        <div className="flex gap-2">
          <CreateRoomButton modalOpen={modalOpen} setModalOpen={setModalOpen} />
          <UsernameSelect username={username} setUsername={setUsername} />
        </div>
      )}
      {modalOpen && (
        <CreateRoomModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      )}
    </div>
  );
}
