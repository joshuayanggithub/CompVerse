import PlayersJoined from "./PlayersJoined";

export default function GameStartScreen({ playersJoined }) {
  return (
    <div className="w-3/4 h-full p-4 outline outline-gray-300 outline-2 rounded-lg flex flex-col items-center">
      <h1 className="text-2xl font-bold">{`Players Joined: ${playersJoined.length}`}</h1>
      <PlayersJoined playersJoined={playersJoined} />
      <div>
        <button className="">Start Game</button>
        <button>Leave Game</button>
      </div>
    </div>
  );
}
