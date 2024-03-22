export default function ActualAnswer({ answers }) {
  let answerString = "";
  let answerString2 = "";

  for (let i = 0; i < answers.length; ++i) {
    answerString = answerString + answers[i] + ", ";
  }

  if (answers.length > 1) {
    answerString2 = " were acceptable answers!";
  } else {
    answerString2 = " was the correct answer!";
  }

  if (answers.length > 0) {
    return (
      <div className="bg-blue-200 rounded-md h-10 font-jost text-md py-1 px-2 flex items-center justify-start">
        <span className="font-semibold">{answerString}</span>
        <span className="font-normal italic">{answerString2}</span>
      </div>
    );
  } else {
    return <></>;
  }
}
