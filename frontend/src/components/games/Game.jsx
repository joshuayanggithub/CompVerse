import Problem from "./Problem";

export default function Game() {
  return (
    <div className="flex flex-col w-full h-full bg-gray-200">
      <Problem problemNumber={1} />
      <div>
        <input type="text"></input>
        <button className="bg-blue-200 rounded-lg">Submit</button>
      </div>
    </div>
  );
}
