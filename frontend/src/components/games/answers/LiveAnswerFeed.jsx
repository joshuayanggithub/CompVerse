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
  console.log(userAnswers);

  useEffect(() => {
    socket.on("game:answering", function ({ username, answer, state, date }) {
      updateMap(username, { answer, state, date });
    });

    socket.on("game:actualAnswer", function (answers) {
      setActualAnswers(answers);
    });

    socket.on("game:buzzed", function ({ username, answer, state, date }) {
      updateMap(username, { answer, state, date });
    });

    socket.on("game:correct", function ({ username, answer, state, date }) {
      updateMap(username, { answer, state, date });
    });

    socket.on("game:wrong", function ({ username, answer, state, date }) {
      updateMap(username, { answer, state, date });
    });

    socket.on("game:newQuestion", function () {
      //reset everything!
      setUserAnswers(new Map());
      setActualAnswers([]);
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

  return (
    <div className="flex flex-col items-start justify-center gap-1 h-1/4">
      {sorted.map((userAnswer, index) => {
        return <UserAnswer key={userAnswer.date} answer={userAnswer.answer} username={userAnswer.username} state={userAnswer.state} date={userAnswer.date} />;
      })}
      {actualAnswers.length > 0 && <ActualAnswer answers={actualAnswers} />}
    </div>
  );
}
