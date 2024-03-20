import { useEffect, useState } from "react";

export default function Question({ questionNumber, questionText }) {
  const [questionStaggered, setQuestionStaggered] = useState("");

  console.log(questionText);

  useEffect(() => {
    const arr = questionText.split(" "); //regex for edgecases of multiple spaces
    let ind = 0;
    const interval = setInterval(function () {
      if (ind == arr.length) {
        clearInterval(interval);
        return;
      }
      const word = arr[ind];
      setQuestionStaggered((prev) => prev + " " + word);
      ++ind;
    }, 140);

    return () => {
      clearInterval(interval);
      setQuestionStaggered("");
    };
  }, [questionText]);

  return (
    <div className="w-full h-5/6">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">{`Problem ${questionNumber}`}</h1>
      </div>
      <p className="italics whitespace-pre-line">{questionStaggered}</p>
    </div>
  );
}
