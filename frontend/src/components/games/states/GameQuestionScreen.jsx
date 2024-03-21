import { useEffect, useState } from "react";
import Question from "../question/Question";
import ButtonWrapper from "../../ui/wrappers/ButtonWrapper";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import GameTimer from "../question/GameTimer";
import { socket } from "../../../global/socket";
import LiveAnswerFeed from "../answers/LiveAnswerFeed";
import GameHeader from "../GameHeader";

export default function GameQuestionScreen({ roomData }) {
  const roomIDString = roomData._id;
  //question specific
  const [questionText, setQuestionText] = useState("");
  const [questionNumber, setQuestionNumber] = useState(1);
  const [timeLeft, setTimeLeft] = useState(30);
  //game logic specific
  const [buzzedIn, setBuzzedIn] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [turn, setTurn] = useState(true);
  //answer
  const [answer, setAnswer] = useState("");

  function submitAnswer() {
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

    socket.on("game:resetBuzz", function () {
      setTurn(true);
    });

    return () => {
      socket.off("game:newQuestion");
      socket.off("game:buzzed");
      socket.off("game:resetBuzz");
    };
  }, []);

  function changeAnswer(event) {
    socket.emit("game:answering", { _id: roomIDString, currentAnswer: event.target.value });
    setAnswer(event.target.value);
  }

  return (
    <div className="h-full w-full flex flex-col items-center">
      <div className="flex w-full justify-between">
        <GameHeader roomName={roomData.roomName} competition={roomData.competition} gameLength={roomData.gameLength} />
        <GameTimer startingTime={20} />
      </div>

      <div className="flex flex-col h-3/4 w-[90%] justify-center">
        <Question questionNumber={questionNumber} questionText={questionText} />
        <div className="flex justify-start">
          <LiveAnswerFeed />
        </div>
        <div className="w-full">
          {turn && !buzzedIn && (
            <ButtonWrapper color="bg-red-500" width="w-28" onClick={buzzIn} className="flex gap-1 items-center justify-center">
              Buzz In
              <HiOutlineSpeakerphone size={20} />
            </ButtonWrapper>
          )}
          {(!turn || submitted) && (
            <div className="flex h-10 w-28 bg-red-100 p-2  gap-1 items-center justify-center rounded-md hover:cursor-not-allowed text-white">
              Buzz In
              <HiOutlineSpeakerphone size={20} />
            </div>
          )}
          {turn && buzzedIn && !submitted && (
            <div className="flex w-full gap-2">
              <input type="text" placeholder="Enter Answer" className="h-10 w-1/4 outline outline-1 outline-gray-400 rounded-lg p-5" value={answer} onChange={changeAnswer}></input>
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
