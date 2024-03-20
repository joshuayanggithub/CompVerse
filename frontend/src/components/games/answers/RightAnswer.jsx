export default function RightAnswer({ answers }) {
  let answerString = "";

  for (let i = 0; i < answers.length; ++i) {
    answerString = answerString + answers[i] + ", ";
  }

  return (
    <div className="flex items-center justify-center gap-1">
      <h2 className={`text-bold font-jost text-md`}>{` ${answerString} were the correct answers!`}</h2>
    </div>
  );
}
