import { useState } from "react";
import CreateRoom from "./CreateRoom";
import { CreateRoomModal } from "./CreateRoomModal";
import Rooms from "./Rooms";

export default function RoomsPage() {
  const [modalOpen, setModalOpen] = useState(false);

  console.log(modalOpen);

  return (
    <div className="flex flex-col gap-5 h-full w-3/4 p-10 relative">
      <Rooms />
      <CreateRoom modalOpen={modalOpen} setModalOpen={setModalOpen} />
      {modalOpen && (
        <CreateRoomModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      )}
    </div>
  );
}
