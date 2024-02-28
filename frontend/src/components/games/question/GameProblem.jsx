import { useRef, useState } from "react";
import Question from "./Question";
import ButtonWrapper from "../../ui/wrappers/ButtonWrapper";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import GameTimer from "./GameTimer";

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
    <div className="h-full w-full flex flex-col items-center">
      <div className="flex w-full justify-between">
        <div className="italic font-md text-gray-600 font-light ">{`Room ${2} / ${2} / ${0} out of ${2}`}</div>
        <GameTimer className="" startingTime={30} />
      </div>

      <div className="flex flex-col h-3/4 w-[90%] justify-center">
        <Question
          questionNumber={1}
          questionText={
            "Horem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
          }
        />
        <div className="w-full">
          {!buzzedIn && (
            <ButtonWrapper color="bg-red-500" width="w-30" onClick={() => setBuzzedIn(true)} className="flex gap-1 items-center justify-center">
              Buzz In
              <HiOutlineSpeakerphone size={20} />
            </ButtonWrapper>
          )}
          {buzzedIn && !submitted && (
            <div className="flex w-full gap-2">
              <input type="text" placeholder="Enter Answer" className="h-10 w-1/4 outline outline-2 outline-gray-300 rounded-lg p-5" ref={answerRef}></input>
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
