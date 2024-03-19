import Chat from "./chat/Chat";
// import Scoreboard from "./users/Scoreboard";
import UserList from "./users/UserList";

export default function Sidebar({ chatHeight, userListHeight, socketRoomId }) {
  return (
    <div className="h-full w-full">
      <UserList height={userListHeight} socketRoomId={socketRoomId} />
      <Chat height={chatHeight} socketRoomId={socketRoomId} />
    </div>
  );
}
