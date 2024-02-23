import Chat from "../chat/Chat";
import UserList from "./UserList";

export default function ChatAndUsers() {
  return (
    <div className="h-full w-full outline outline-gray-400 outline-1 rounded-md ">
      <div className="h-1/6 px-3 py-3">
        <UserList />
      </div>
      <div className="h-5/6">
        <Chat />
      </div>
    </div>
  );
}
