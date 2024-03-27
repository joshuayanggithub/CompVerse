import Chat from "./chat/Chat";
import Scoreboard from "./users/Scoreboard";
import UserList from "./users/UserList";

export default function Sidebar({ chatHeight, userListHeight, socketRoomId, toggleProfile }) {
  return (
    <div className="h-full w-full">
      {socketRoomId == "lobby" ? <UserList height={userListHeight} socketRoomId={socketRoomId} toggleProfile={toggleProfile} /> : <Scoreboard _id={socketRoomId} height={userListHeight} />}
      <Chat height={chatHeight} socketRoomId={socketRoomId} />
    </div>
  );
}
