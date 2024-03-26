import { useRef, useState } from "react";
import { socket } from "../../../global/socket";
import { GrFormClose } from "react-icons/gr";
import ButtonWrapper from "../../ui/wrappers/ButtonWrapper";
import { AiOutlinePlusCircle } from "react-icons/ai";
import ErrorWrapper from "../../ui/wrappers/ErrorWrapper";

export default function CreateRoomModal({ setModalOpen }) {
  const competitionRef = useRef();
  const gameLengthRef = useRef();
  const timePerQuestionRef = useRef();
  const gameNameRef = useRef();
  const [error, setError] = useState("");

  function sanitizeData() {
    if (competitionRef.current.value == "notchosen") {
      setError("Please Choose A Game!");
      return true;
    }
    if (!(Number(gameLengthRef.current.value) >= 5 && Number(gameLengthRef.current.value) <= 20)) {
      setError("Please Choose A Valid Game Length! (5-20 Questions)");
      return true;
    }
    if (gameNameRef.current.value == "") {
      setError("Please Choose A Room Name!");
      return true;
    }
    if (!(Number(timePerQuestionRef.current.value) >= 5 && Number(timePerQuestionRef.current.value) <= 60)) {
      setError("Please input a valid time per question! (5 - 60 seconds)");
      return true;
    }
    setError("");
    return false;
  }

  function createRoom() {
    if (sanitizeData()) return;
    const roomData = {
      competition: competitionRef.current.value,
      gameLength: Number(gameLengthRef.current.value),
      roomName: gameNameRef.current.value,
      timePerQuestion: timePerQuestionRef.current.value,
      userID: socket.auth.userID,
    };
    socket.emit("room:create", roomData);
    setModalOpen(false);
  }
  function closeRoom() {
    setModalOpen(false);
  }

  return (
    <div className="blur-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-3/5 rounded-xl flex flex-col bg-white outline outline-gray-400 outline-1 p-5 items-center justify-center gap-5 ">
      <button onClick={closeRoom}>
        <GrFormClose size={30} className="absolute top-2 left-2" />
      </button>
      <select name="game" id="game" className="w-2/3 h-10 rounded-lg bg-white outline outline-gray-400 outline-1 text-center" defaultValue={"notchosen"} ref={competitionRef} required>
        <option value="notchosen" disabled>
          Choose Competition
        </option>
        <option value="Science Bowl">Science Bowl</option>
        <option value="Quiz Bowl">Quiz Bowl</option>
        <option value="Math Countdown">Mathleague & Mathcounts Countdown</option>
      </select>
      <div className="w-2/3 flex items-center justify-between gap-5">
        <input
          required
          type="number"
          placeholder="# of Questions"
          name="quantity"
          min="5"
          max="20"
          step="5"
          ref={gameLengthRef}
          className="w-1/2 h-10 rounded-lg bg-white outline outline-gray-400 outline-1 text-center"
        />
        <input
          required
          type="number"
          placeholder="Time per Question"
          name="quantity"
          min="5"
          max="60"
          step="5"
          ref={timePerQuestionRef}
          className="w-1/2 h-10 rounded-lg bg-white outline outline-gray-400 outline-1 text-center"
        />
      </div>
      <input type="text" placeholder="Room Name" className="w-2/3 h-10 rounded-lg bg-white outline outline-gray-400 outline-1 text-center" ref={gameNameRef} />
      {error != "" && <ErrorWrapper>{error}</ErrorWrapper>}
      <ButtonWrapper onClick={createRoom} width={"w-1/3"}>
        Create Game
        <AiOutlinePlusCircle className="h-5 w-5" />
      </ButtonWrapper>
    </div>
  );
}
