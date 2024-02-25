import Chat from "../chat/Chat";
import UserList from "./UserList";

export default function ChatAndUserList() {
  return (
    <div className="h-full w-full">
      <UserList />
      <Chat />
    </div>
  );
}
