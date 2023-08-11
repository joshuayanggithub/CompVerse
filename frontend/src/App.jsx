import Chat from "./components/Chat";
import RoomsPage from "./components/RoomsPage";

import { io } from "socket.io-client";

const socket = io("localhost:4000");

function App() {
  return (
    <div className="flex flex-col w-full h-full justify-center p-3">
      <RoomsPage />
      <Chat />
    </div>
  );
}

export default App;
