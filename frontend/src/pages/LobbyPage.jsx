import Chat from "../components/chat/Chat";
import Online from "../components/lobby/Online";
import RoomsList from "../components/rooms/RoomsList";

export default function LobbyPage() {
  return (
    <div className="flex w-full h-full p-3 justify-between">
      <RoomsList />
      <div className="flex flex-col h-full w-1/4 justify-center">
        <Online />
        <Chat />
      </div>
    </div>
  );
}
