import { AiOutlinePlusCircle } from "react-icons/ai";

export default function CreateRoom({ setModalOpen, modalOpen }) {
  return (
    <div className="w-full h-[5%]">
      <button
        className="w-[10%] h-full rounded-md bg-blue-200 flex items-center justify-center"
        onClick={() => setModalOpen(!modalOpen)}
      >
        Create Room
        <AiOutlinePlusCircle className="h-5 w-5" />
      </button>
    </div>
  );
}
