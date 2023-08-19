import { useRef, useState } from "react";
import Problem from "./Problem";

export default function GameProblem() {
  const [buzzedIn, setBuzzedIn] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [answerStatus, setAnswerStatus] = useState("");
  const answerRef = useRef();

  function submitAnswer() {
    setIsCorrect(false);
    setSubmitted(true);

    if (isCorrect) {
      setAnswerStatus(`${answerRef.current.value} is correct!`);
    } else {
      setAnswerStatus(`${answerRef.current.value} is wrong!`);
    }
  }

  return (
    <div className="w-3/4 h-full p-4 outline outline-gray-300 outline-2 rounded-lg">
      <Problem
        problemNumber={1}
        problemQuestion={
          "Horem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
        }
      />
      <div>
        {!buzzedIn && (
          <button
            className="bg-red-600 rounded-md h-10 w-1/6 text-white"
            onClick={() => setBuzzedIn(true)}
          >
            Buzz In
          </button>
        )}
        {buzzedIn && !submitted && (
          <div>
            <input
              type="text"
              placeholder="Enter Answer"
              className="h-10 w-1/4 outline outline-2 outline-gray-300 rounded-lg p-5"
              ref={answerRef}
            ></input>
            <button
              className="bg-blue-300 rounded-md h-10 w-1/6 text-white"
              onClick={submitAnswer}
            >
              Submit Answer
            </button>
          </div>
        )}
        {buzzedIn && submitted && (
          <div className="bg-red-200 text-lg">{answerStatus}</div>
        )}
      </div>
    </div>
  );
}
