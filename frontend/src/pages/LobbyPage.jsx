import Chat from "../components/chat/Chat";
import Header from "../components/lobby/Header";
import Online from "../components/lobby/Online";
import RoomsList from "../components/rooms/RoomsList";

export default function LobbyPage() {
  return (
    <div className="flex w-full h-full p-5 box-border gap-3">
      <div className="flex flex-col h-full w-3/4 justify-center ">
        <Header />
        <RoomsList />
      </div>
      <div className="flex flex-col h-full w-1/4 justify-center ">
        <Online />
        <Chat />
      </div>
    </div>
  );
}
