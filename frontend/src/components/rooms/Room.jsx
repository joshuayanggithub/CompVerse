import HeadCount from "../ui/HeadCount";

export default function Room({ roomName, roomGame, joined, joinRoom, setJoinRoom }) {
  return (
    <div
      className="flex justify-between outline outline-gray-300 outline-2 rounded-lg p-5 w-full font-jost h-32 hover:cursor-pointer"
      onClick={() => setJoinRoom(!joinRoom)}
    >
      <div className="flex flex-col justify-between">
        <div className="text-black text-lg">{"Room " + roomName}</div>
        <div className="text-gray-400 text-md">{roomGame}</div>
        <div className="h-1/3">
          <HeadCount online={joined} maxHeadCount={3} size={7} style={"translate-y-1/2"} />
        </div>
      </div>
      <div className="h-full w-1/2 flex justify-center items-center flex-col">
        <img src="/waiting.gif" alt="waiting..." className="h-3/4" />
        <p className="text-gray-400 text-xs text-center">game not started...</p>
      </div>
    </div>
  );
}
