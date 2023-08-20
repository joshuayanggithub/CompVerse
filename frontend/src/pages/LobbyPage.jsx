import Chat from "../components/chat/Chat";
import Header from "../components/lobby/Header";
import OnlineStatus from "../components/lobby/OnlineStatus";
import RoomsList from "../components/rooms/RoomsList";

export default function LobbyPage() {
  return (
    <div className="flex w-full h-full p-5 box-border gap-3">
      <div className="flex flex-col h-full w-3/4 justify-center ">
        <div className="h-[5%]">
          <Header />
        </div>
        <div className="h-[95%]">
          <RoomsList />
        </div>
      </div>
      <div className="flex flex-col h-full w-1/4 justify-center ">
        <div className="h-[5%]">
          <OnlineStatus />
        </div>
        <div className="h-[95%]">
          <Chat />
        </div>
      </div>
    </div>
  );
}
