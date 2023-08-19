import { useState } from "react";
import Rooms from "./Rooms";
import CreateRoomButton from "./CreateRoomButton";
import CreateRoomModal from "./CreateRoomModal";
import UsernameSelect from "../chat/usernameSelect";

export default function RoomsList() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="flex flex-col h-[90%] p-10 w-full relative justify-between outline outline-2 outline-gray-300 rounded-lg ">
      <Rooms modalOpen={modalOpen} />
      {!modalOpen && (
        <div className="flex gap-2">
          <CreateRoomButton modalOpen={modalOpen} setModalOpen={setModalOpen} />
          <UsernameSelect />
        </div>
      )}
      {modalOpen && (
        <CreateRoomModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      )}
    </div>
  );
}
