import { useEffect, useState } from "react";
import { socket } from "../../../global/socket";
import UserAnswer from "./UserAnswer";
import ActualAnswer from "./ActualAnswer";

export default function LiveAnswerFeed() {
  const [userAnswers, setUserAnswers] = useState(new Map());
  const [actualAnswers, setActualAnswers] = useState([]);

  const updateMap = (k, v) => {
    setUserAnswers((userAnswers) => {
      let tempMap = new Map(userAnswers);
      tempMap.set(k, v);
      return tempMap;
    });
  };

  function compare(a, b) {
    if (a.date < b.date) {
      return -1;
    }
    if (a.date > b.date) {
      return 1;
    }
    return 0;
  }

  let arr = Array.from(userAnswers, ([username, value]) => {
    return { username, ...value };
  });
  let sorted = arr.sort(compare);

  useEffect(() => {
    socket.on("game:answering", function ({ username, answer, state, date }) {
      updateMap(username, { answer, state, date });
    });

    socket.on("game:actualAnswer", function (answers) {
      console.log(actualAnswers, "actual answer", answers);
      setActualAnswers((prev) => answers);
    });

    socket.on("game:buzzed", function ({ username, answer, state, date }) {
      updateMap(username, { answer, state, date });
    });

    socket.on("game:correct", function ({ username, answer, state, date }) {
      console.log("correct");
      updateMap(username, { answer, state, date });
    });

    socket.on("game:wrong", function ({ username, answer, state, date }) {
      updateMap(username, { answer, state, date });
    });

    socket.on("game:newQuestion", function () {
      //reset everything!
      console.log("reset User Input After New Question");
      setUserAnswers(new Map());
      console.log(actualAnswers, "new quesiton");
      setActualAnswers((prev) => []);
    });

    return () => {
      socket.off("game:answering");
      socket.off("game:actualAnswer");
      socket.off("game:buzzed");
      socket.off("game:wrong");
      socket.off("game:correct");
      socket.off("game:newQuestion");
    };
  }, []);

  console.log(userAnswers);

  return (
    <div className="flex flex-col items-start justify-center gap-1 h-1/4">
      {sorted.map((userAnswer) => {
        return <UserAnswer key={userAnswer.date} answer={userAnswer.answer} username={userAnswer.username} state={userAnswer.state} date={userAnswer.date} />;
      })}
      <ActualAnswer answers={actualAnswers} />
    </div>
  );
}
