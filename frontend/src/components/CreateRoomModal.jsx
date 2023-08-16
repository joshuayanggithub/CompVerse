import { useRef } from "react";
import { socket } from "../socket";
import { GrFormClose } from "react-icons/gr";

export function CreateRoomModal({ modalOpen, setModalOpen }) {
  const competitionRef = useRef();
  const gameLengthRef = useRef();
  const gameNameRef = useRef();

  function createRoom() {
    const roomData = {
      competition: competitionRef.current.value,
      gameLength: gameLengthRef.current.value,
      gameName: gameNameRef.current.value,
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
        defaultValue={"competition"}
        ref={competitionRef}
      >
        <option value="competition" disabled>
          Competition
        </option>
        <option value="sciencebowl">ScienceBowl</option>
        <option value="knowledgebowl">KnowledgeBowl</option>
        <option value="math">Math</option>
      </select>
      <select
        name="problems"
        id="problems"
        className="w-2/3 h-10 rounded-lg bg-white outline outline-gray-400 outline-1 text-center"
        defaultValue={"gamelength"}
        ref={gameLengthRef}
      >
        <option value="gamelength" disabled>
          Game Length
        </option>
        <option value="5">5 Problems</option>
        <option value="10">10 Problems</option>
        <option value="20">20 Problems</option>
        <option value="freeplay">Free Play</option>
      </select>
      <input
        type="text"
        placeholder="Game Name"
        className="w-2/3 h-10 rounded-lg bg-white outline outline-gray-400 outline-1 text-center"
        ref={gameNameRef}
      ></input>
      <button
        className="w-[20%] h-10 rounded-md bg-blue-200 flex items-center justify-center"
        onClick={createRoom}
      >
        Create Game
      </button>
    </div>
  );
}
