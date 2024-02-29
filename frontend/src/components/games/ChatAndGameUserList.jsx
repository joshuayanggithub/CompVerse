import { socket } from "../../global/socket";
import Chat from "../chat/Chat";
import GameUserList from "./users/GameUserList";

export default function ChatAndGameUserList({ _id }) {
  return (
    <div className="h-full w-full">
      <GameUserList height={"h-1/2"} _id={_id} />
      <Chat height={"h-1/2"} socketRoom={_id} />
    </div>
  );
}
