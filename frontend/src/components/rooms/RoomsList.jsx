import { useState } from "react";
import Rooms from "./Rooms";
import CreateRoomButton from "./CreateRoomButton";
import CreateRoomModal from "./CreateRoomModal";

export default function RoomsList() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="flex flex-col gap-5 h-full w-3/4 p-10 relative">
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
