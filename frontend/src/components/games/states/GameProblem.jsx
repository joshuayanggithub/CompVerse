import { useEffect, useRef, useState } from "react";
import Question from "../question/Question";
import ButtonWrapper from "../../ui/wrappers/ButtonWrapper";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import GameTimer from "../question/GameTimer";
import { socket } from "../../../global/socket";

export default function GameProblem() {
  const [buzzedIn, setBuzzedIn] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [answerStatus, setAnswerStatus] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [error, setError] = useState("");
  const [questionNumber, setQuestionNumber] = useState(1);

  const answerRef = useRef();

  function submitAnswer() {
    console.log(answerRef.current.value);
    socket.emit("game:answer", answerRef.current.value);
  }

  function buzzIn() {
    socket.emit("game:buzz");
    setBuzzedIn(true);
  }

  useEffect(() => {
    socket.on("game:newQuestion", function (question) {
      setQuestionText(question); //replace \n with
    });

    socket.on("game:buzzed", function (userID) {});

    socket.on("game:", function () {
      setIsCorrect(false);
      setSubmitted(true);

      if (isCorrect) {
        setAnswerStatus(`${answerRef.current.value} is correct!`);
      } else {
        setAnswerStatus(`${answerRef.current.value} is wrong!`);
      }
    });

    return () => {
      socket.off("game:question");
    };
  });

  return (
    <div className="h-full w-full flex flex-col items-center">
      <div className="flex w-full justify-between">
        <GameTimer className="" startingTime={30} />
      </div>

      <div className="flex flex-col h-3/4 w-[90%] justify-center">
        <Question questionNumber={1} questionText={questionText} />
        <div className="w-full">
          {!buzzedIn && (
            <ButtonWrapper color="bg-red-500" width="w-30" onClick={buzzIn} className="flex gap-1 items-center justify-center">
              Buzz In
              <HiOutlineSpeakerphone size={20} />
            </ButtonWrapper>
          )}
          {buzzedIn && !submitted && (
            <div className="flex w-full gap-2">
              <input type="text" placeholder="Enter Answer" className="h-10 w-1/4 outline outline-1 outline-gray-400 rounded-lg p-5" ref={answerRef}></input>
              <ButtonWrapper color={"bg-status"} onClick={submitAnswer}>
                Submit Answer
              </ButtonWrapper>
            </div>
          )}
          {buzzedIn && submitted && <div className="bg-red-200 text-lg">{answerStatus}</div>}
        </div>
      </div>
    </div>
  );
}
