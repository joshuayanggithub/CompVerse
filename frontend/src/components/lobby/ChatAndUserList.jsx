import Chat from "../chat/Chat";
import UserList from "../users/UserList";

export default function ChatAndUserList() {
  return (
    <div className="h-full w-full">
      <UserList height={"h-1/3"} />
      <Chat height={"h-2/3"} socketRoom={"lobby"} />
    </div>
  );
}
