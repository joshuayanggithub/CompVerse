import { useRef, useState } from "react";
import { socket } from "../../socket";
import { GrFormClose } from "react-icons/gr";
import ButtonWrapper from "../ui/ButtonWrapper";
import { AiOutlinePlusCircle } from "react-icons/ai";
import ErrorWrapper from "../ui/ErrorWrapper";

export default function CreateRoomModal({ setModalOpen }) {
  const competitionRef = useRef();
  const gameLengthRef = useRef();
  const gameNameRef = useRef();
  const [error, setError] = useState("");

  function sanitizeData() {
    if (competitionRef.current.value == "notchosen") {
      setError("Please Choose A Game!");
      return true;
    }
    if (gameLengthRef.current.value == "notchosen") {
      setError("Please Choose A Game Length!");
      return true;
    }
    if (gameNameRef.current.value == "") {
      setError("Please Choose A Room Name!");
      return true;
    }
    setError("");
    return false;
  }

  function createRoom() {
    if (sanitizeData()) return;
    const roomData = {
      competition: competitionRef.current.value,
      matchLength: gameLengthRef.current.value,
      roomName: gameNameRef.current.value,
    };
    console.log(roomData);
    socket.emit("game:create", roomData);
    setModalOpen(false);
  }
  function closeRoom() {
    setModalOpen(false);
  }

  return (
    <div className="blur-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-4/5 rounded-xl flex flex-col bg-white outline outline-gray-400 outline-1 p-5 items-center justify-center gap-5 ">
      <button onClick={closeRoom}>
        <GrFormClose size={30} className="absolute top-2 left-2" />
      </button>
      <select
        name="game"
        id="game"
        className="w-2/3 h-10 rounded-lg bg-white outline outline-gray-400 outline-1 text-center"
        defaultValue={"notchosen"}
        ref={competitionRef}
        required
      >
        <option value="notchosen" disabled>
          Choose Competition
        </option>
        <option value="Science Bowl">Science Bowl</option>
        <option value="Knowledge Bowl">Knowledge Bowl</option>
        <option value="Math">Math</option>
      </select>
      <select
        name="problems"
        id="problems"
        className="w-2/3 h-10 rounded-lg bg-white outline outline-gray-400 outline-1 text-center"
        defaultValue={"notchosen"}
        ref={gameLengthRef}
        required
      >
        <option value="notchosen" disabled>
          Choose Game Length
        </option>
        <option value="5">5 Problems</option>
        <option value="10">10 Problems</option>
        <option value="20">20 Problems</option>
        <option value="freeplay">Free Play</option>
      </select>
      <input
        type="text"
        placeholder="Room Name"
        className="w-2/3 h-10 rounded-lg bg-white outline outline-gray-400 outline-1 text-center"
        ref={gameNameRef}
      ></input>
      {error != "" && <ErrorWrapper>{error}</ErrorWrapper>}
      <ButtonWrapper onClick={createRoom} width={"w-1/3"}>
        Create Game
        <AiOutlinePlusCircle className="h-5 w-5" />
      </ButtonWrapper>
    </div>
  );
}
