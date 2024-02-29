import { socket } from "../../global/socket";

export default function User({ username, score, userID }) {
  return (
    <div className={`flex w-full py-1 justify-between items-center px-2`}>
      <div className="flex items-center justify-center gap-1">
        <img src="/anonymous.avif" className="w-5 h-5" />
        <h2 className={`text-bold font-jost font-md ${userID == localStorage.getItem("userID") && "italic text-gray-400 font-light"} `}>{username}</h2>
      </div>
      <h2 className="font-jost font-md">{score}</h2>
    </div>
  );
}
