import Chat from "./components/Chat";
import Online from "./components/Online";
import RoomsPage from "./components/RoomsPage";

function App() {
  return (
    <div className="flex w-full h-full p-3 justify-between">
      <RoomsPage />
      <div className="flex flex-col h-full w-1/4 justify-center">
        <Online numberUsers={4} />
        <Chat />
      </div>
    </div>
  );
}

export default App;
