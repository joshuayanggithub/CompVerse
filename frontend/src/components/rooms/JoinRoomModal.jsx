import { useEffect, useState } from "react";
import { socket } from "../../connection/socket";
import { GrFormClose } from "react-icons/gr";
import ButtonWrapper from "../ui/ButtonWrapper";
import ErrorWrapper from "../ui/ErrorWrapper";
import { useNavigate } from "react-router-dom";

export default function JoinRoomModal({ setModalOpen }) {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("room:joined", function (room) {
      // socket.join("")
      socket.join(`${room._id}`);
      navigate(`/room/${room._id}`);
    });

    return () => {
      socket.off("room:joined");
    };
  }, []);

  function closeModal() {
    setModalOpen(false);
  }

  function joinRoom() {
    // socket.emit("room:join");
  }

  return (
    <div className="blur-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 rounded-xl flex flex-col bg-white outline outline-gray-400 outline-1 p-5 items-center justify-center gap-5 ">
      <button onClick={closeModal}>
        <GrFormClose size={30} className="absolute top-2 left-2" />
      </button>
      {error != "" && <ErrorWrapper>{error}</ErrorWrapper>}
      <ButtonWrapper onClick={joinRoom} width={"w-1/3"}>
        Join Room
      </ButtonWrapper>
    </div>
  );
}
