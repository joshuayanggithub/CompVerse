export default function UserAnswer({ answer, state, username }) {
  return (
    <div className="flex items-center justify-center gap-1">
      <h2 className={`font-semibold font-jost text-md italic`}>{`${username} `}</h2>
      <h2 className={`font-jost text-md italic`}>{answer}</h2>
      {state == "correct" && <div className="rounded-md h-7 flex flex-col items-center justify-center text-xs font-semibold bg-green-300 w-16">{state.toUpperCase()}</div>}
      {state == "buzz" && <div className={"rounded-md h-7 flex flex-col items-center justify-center text-xs font-semibold bg-gray-300 w-12"}>{state.toUpperCase()}</div>}
      {state == "wrong" && <div className={"rounded-md h-6 flex flex-col items-center justify-center text-xs font-semibold bg-red-400 w-16"}>{state.toUpperCase()}</div>}
    </div>
  );
}
