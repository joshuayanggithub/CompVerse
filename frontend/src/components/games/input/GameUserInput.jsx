import { useEffect, useState } from "react";
import { socket } from "../../../global/socket";
import ButtonWrapper from "../../ui/wrappers/ButtonWrapper";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import BuzzTimer from "./BuzzTimer";

export default function GameUserInput({ roomIDString }) {
  //game logic specific
  const [buzzedIn, setBuzzedIn] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [turn, setTurn] = useState(true);
  //answer
  const [answer, setAnswer] = useState("");

  function submitAnswer() {
    if (buzzedIn) {
      console.log("submitted");
      socket.emit("game:answer", answer, new Date());
      setSubmitted(true);
    }
  }

  function buzzIn() {
    socket.emit("game:buzz", roomIDString);
    setBuzzedIn(true);
  }

  function resetInput() {
    setBuzzedIn(false);
    setSubmitted(false);
    setTurn(true);
    setAnswer("");
  }

  useEffect(() => {
    socket.on("game:newQuestion", function () {
      console.log("reset Input");
      resetInput();
    });

    socket.on("game:doneQuestion", function () {
      console.log("ended input");
      if (!buzzedIn) {
        //ONLY IF YOU HAVE NOT BUZZED IN ALREADY
        setTurn(false);
        socket.emit("game:noAnswer"); //no asnwer
      }
    });

    socket.on("game:buzzed", function () {
      setTurn(false);
    });

    socket.on("game:resetBuzz", function () {
      // if (!submitted) {
      setTurn(true);
      // }
    });

    return () => {
      // socket.off("game:newQuestion");
      socket.off("game:buzzed");
      socket.off("game:resetBuzz");
      // socket.off("game:doneQuestion");
    };
  }, []);

  function changeAnswer(event) {
    socket.emit("game:answering", { _id: roomIDString, currentAnswer: event.target.value });
    setAnswer(event.target.value);
  }

  return (
    <div className="w-full">
      {buzzedIn && !submitted && <BuzzTimer submitAnswer={submitAnswer} />}

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
          <input
            autoFocus
            type="text"
            placeholder="Enter Answer"
            className="h-10 w-1/4 outline outline-1 outline-gray-400 rounded-lg p-5"
            value={answer}
            onChange={changeAnswer}
            onKeyDown={(event) => {
              if (event.key == "Enter") {
                submitAnswer();
              }
            }}
          ></input>
          <ButtonWrapper color={"bg-status"} onClick={submitAnswer}>
            Submit Answer
          </ButtonWrapper>
        </div>
      )}
    </div>
  );
}
