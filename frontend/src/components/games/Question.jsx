import GameTimer from "./GameTimer";

export default function Question({ questionNumber, questionText }) {
  return (
    <div className="w-full h-5/6">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">{`Problem ${questionNumber}`}</h1>
      </div>
      <p>
        <i>{questionText}</i>
      </p>
    </div>
  );
}
