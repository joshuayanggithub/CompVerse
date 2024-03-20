export default function User({ username, score, userID }) {
  return (
    <div className={`flex w-full py-[1px] justify-between items-center px-2`}>
      <div className="flex items-center justify-center gap-1">
        <img src="/anonymous.avif" className="w-5 h-5" />
        <h2 className={`text-bold font-jost text-md ${userID == localStorage.getItem("userID") && ""} `}>
          {username}
          {userID == localStorage.getItem("userID") && <span className="text-gray-400 text-xs">(You)</span>}
        </h2>
      </div>
      <h2 className="font-jost font-md">{score}</h2>
    </div>
  );
}
