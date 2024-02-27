import Chat from "../chat/Chat";
import GameUserList from "./GameUserLIst";

export default function ChatAndGameUserList() {
  return (
    <div className="h-full w-full">
      <GameUserList />
      <Chat height={"h-1/2"} />
    </div>
  );
}
