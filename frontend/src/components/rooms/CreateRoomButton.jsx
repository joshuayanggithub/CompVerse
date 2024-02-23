import { AiOutlinePlusCircle } from "react-icons/ai";
import ButtonWrapper from "../ui/ButtonWrapper";

export default function CreateRoomButton({ setModalOpen, modalOpen }) {
  return (
    <ButtonWrapper onClick={() => setModalOpen(!modalOpen)} width="w-40">
      Create Room
      <AiOutlinePlusCircle className="h-5 w-5" />
    </ButtonWrapper>
  );
}
