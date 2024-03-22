import { useEffect, useState } from "react";
import { socket } from "../../../global/socket";

export default function Question() {
  const [paused, setPaused] = useState(false);
  const [questionText, setQuestionText] = useState("");
  const [questionType, setQuestionType] = useState("");
  const [questionCategory, setQuestionCategory] = useState("");
  const [questionNumber, setQuestionNumber] = useState(1);
  const [questionIndex, setQuestionIndex] = useState(0);

  useEffect(() => {
    socket.on("game:newQuestion", function ({ questionText, questionNumber, questionCategories, questionType }) {
      console.log("new Question", questionText, questionNumber);
      setQuestionText(questionText);
      setQuestionNumber(questionNumber);
      setQuestionCategory(questionCategories[0].charAt(0).toUpperCase() + questionCategories[0].toLowerCase().slice(1));
      setQuestionType(questionType.charAt(0).toUpperCase() + questionType.toLowerCase().slice(1));
      setPaused(false);
      setQuestionIndex(0);
    });
    return () => {
      // socket.off("game:newQuestion");
    };
  });

  let questionIndexArray = [];
  for (let i = 0; i < questionText.length; ++i) {
    if (questionText[i] == " ") {
      questionIndexArray.push(i);
    } else if (i == questionText.length - 1) {
      questionIndexArray.push(i + 1);
    }
  }

  useEffect(() => {
    const interval = setInterval(function () {
      if (paused) return;
      if (questionIndex == questionIndexArray.length) {
        clearInterval(interval);
        return;
      }
      setQuestionIndex((index) => index + 1);
    }, 130);

    socket.on("game:pauseQuestion", function () {
      clearInterval(interval);
      setPaused(true);
    });

    socket.on("game:resumeQuestion", function () {
      setPaused(false);
    });

    return () => {
      clearInterval(interval);
      socket.off("game:pauseQuestion");
      socket.off("game:resumeQuestion");
    };
  }, [questionText, paused]);

  return (
    <div className="w-full h-5/6">
      <div className="flex justify-start gap-1 font-jost">
        <h1 className="text-xl font-bold">{`Problem ${questionNumber} `}</h1>
        <h3 className="text-lg font-normal">{`/ ${questionCategory} `}</h3>
        <h3 className="text-lg font-normal">{`/ ${questionType}`}</h3>
      </div>
      <p className="italics whitespace-pre-line">{questionText.substring(0, questionIndexArray[questionIndex])}</p>
    </div>
  );
}
