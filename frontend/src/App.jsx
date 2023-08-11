import Chat from "./components/Chat";
import RoomsPage from "./components/RoomsPage";

function App() {
  return (
    <div className="flex flex-col w-full h-full justify-center p-3">
      <RoomsPage />
      <Chat />
    </div>
  );
}

export default App;
