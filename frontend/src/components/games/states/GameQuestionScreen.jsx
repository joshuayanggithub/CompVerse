import { useEffect, useState } from "react";
import Question from "../question/Question";
import ButtonWrapper from "../../ui/wrappers/ButtonWrapper";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import GameTimer from "../question/GameTimer";
import { socket } from "../../../global/socket";

export default function GameQuestionScreen({ roomData }) {
  const roomIDString = roomData._id;
  //question specific
  const [questionText, setQuestionText] = useState("");
  const [questionNumber, setQuestionNumber] = useState(1);
  const [timeLeft, setTimeLeft] = useState(30);
  //game logic specific
  const [buzzedIn, setBuzzedIn] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [turn, setTurn] = useState(true);

  //answer
  const [answer, setAnswer] = useState("");
  const [answerStatus, setAnswerStatus] = useState("");

  function submitAnswer() {
    console.log(answer);
    socket.emit("game:answer", answer);
    setSubmitted(true);
  }

  function buzzIn() {
    socket.emit("game:buzz", roomIDString);
    setBuzzedIn(true);
  }

  function resetInput() {
    setBuzzedIn(false);
    setSubmitted(false);
    setAnswer("");
  }

  useEffect(() => {
    socket.on("game:newQuestion", function ({ questionText, questionNumber }) {
      resetInput();
      setQuestionText(questionText);
      setQuestionNumber(questionNumber);
    });

    socket.on("game:buzzed", function () {
      setTurn(false);
    });

    socket.on("game:actualAnswer", function (answers) {
      console.log(answers);
    });

    socket.on("game:correct", function () {
      console.log("corre");
    });

    socket.on("game:wrong", function () {
      console.log("wrong");
    });

    return () => {
      socket.off("game:newQuestion");
      socket.off("game:buzzed");
      socket.off("game:correct");
      socket.off("game:wrong");
      socket.off("game:actualAnswer");
    };
  }, []);

  function changeAnswer(event) {
    console.log(event);
    socket.emit("game:answering", { _id: roomIDString, currentAnswer: event.target.value });
    setAnswer(event.target.value);
  }

  return (
    <div className="h-full w-full flex flex-col items-center">
      <div className="flex w-full justify-between">
        <GameTimer startingTime={20} />
      </div>

      <div className="flex flex-col h-3/4 w-[90%] justify-center">
        <Question questionNumber={questionNumber} questionText={questionText} />
        <div className="w-full">
          {turn && !buzzedIn && (
            <ButtonWrapper color="bg-red-500" width="w-30" onClick={buzzIn} className="flex gap-1 items-center justify-center">
              Buzz In
              <HiOutlineSpeakerphone size={20} />
            </ButtonWrapper>
          )}
          {turn && buzzedIn && !submitted && (
            <div className="flex w-full gap-2">
              <input type="text" placeholder="Enter Answer" className="h-10 w-1/4 outline outline-1 outline-gray-400 rounded-lg p-5" value={answer} onChange={(e) => changeAnswer(e)}></input>
              <ButtonWrapper color={"bg-status"} onClick={submitAnswer}>
                Submit Answer
              </ButtonWrapper>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
