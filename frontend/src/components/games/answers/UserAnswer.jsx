export default function UserAnswer({ answer, state, username }) {
  return (
    <div className="flex items-center justify-center gap-1">
      <h2 className={`text-bold font-jost text-md`}>{username}</h2>
      <h2 className={`font-jost text-md`}>{answer}</h2>
      {state == "buzz" && <div className="bg-gray-400 capitalize">{state}</div>}
      {state == "wrong" && <div className="bg-red-500 capitalize">{state}</div>}
      {state == "correct" && <div className="bg-green-400">{state}</div>}
    </div>
  );
}
