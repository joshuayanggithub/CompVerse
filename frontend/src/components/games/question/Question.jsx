import { useEffect, useState } from "react";
import { socket } from "../../../global/socket";

export default function Question({ questionNumber, questionText }) {
  const [questionStaggered, setQuestionStaggered] = useState("");
  const [stopQuestion, setStopQuestion] = useState(false);
  const [index, setIndex] = useState(0);

  const arr = questionText.split(" "); //regex for edgecases of multiple spaces

  useEffect(() => {
    let ind = index;

    const interval = setInterval(function () {
      if (!stopQuestion) {
        if (ind == arr.length) {
          clearInterval(interval);
          return;
        }
        const word = arr[ind];
        setQuestionStaggered((prev) => prev + " " + word);
        ++ind;
      }
    }, 140);

    socket.on("game:stopQuestion", function () {
      // setIndex(ind);
      // clearInterval();
      // setStopQuestion(true);
    });

    socket.on("game:newQuestion", function () {
      setIndex(0);
      setStopQuestion(false);
    });

    socket.on("game:resetBuzz", function () {
      setStopQuestion(false);
    });

    return () => {
      clearInterval(interval);
      setQuestionStaggered("");
      socket.off("game:stopQuestion");
      socket.off("game:newQuestion");
      socket.off("game:restBuzz");
    };
  }, [questionText, stopQuestion]);

  return (
    <div className="w-full h-5/6">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">{`Problem ${questionNumber}`}</h1>
      </div>
      <p className="italics whitespace-pre-line">{questionStaggered}</p>
    </div>
  );
}
