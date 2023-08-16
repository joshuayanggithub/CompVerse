import { AiOutlinePlusCircle } from "react-icons/ai";
import ButtonWrapper from "../ui/ButtonWrapper";

export default function CreateRoomButton({ setModalOpen, modalOpen }) {
  return (
    <div className="w-full h-[5%]">
      <ButtonWrapper onClick={() => setModalOpen(!modalOpen)}>
        Create Room
        <AiOutlinePlusCircle className="h-5 w-5" />
      </ButtonWrapper>
    </div>
  );
}
