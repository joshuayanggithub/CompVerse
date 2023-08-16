import { useState } from "react";
import Rooms from "./Rooms";
import CreateRoomButton from "./CreateRoomButton";
import CreateRoomModal from "./CreateRoomModal";

export default function RoomsList() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="flex flex-col h-[90%] p-10 w-full relative justify-between outline outline-2 outline-gray-300 rounded-lg">
      <Rooms modalOpen={modalOpen} />
      {!modalOpen && (
        <CreateRoomButton modalOpen={modalOpen} setModalOpen={setModalOpen} />
      )}
      {modalOpen && (
        <CreateRoomModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      )}
    </div>
  );
}
