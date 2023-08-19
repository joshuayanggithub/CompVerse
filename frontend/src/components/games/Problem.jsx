import Timer from "./Timer";

export default function Problem({ problemNumber, problemQuestion }) {
  return (
    <div className="w-full h-5/6">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">{`Problem ${problemNumber}`}</h1>
        <Timer />
      </div>
      <p>
        <i>{problemQuestion}</i>
      </p>
    </div>
  );
}
