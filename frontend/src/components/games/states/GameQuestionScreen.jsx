import { useEffect, useState } from "react";
import Question from "../question/Question";
import GameTimer from "../question/GameTimer";
import { socket } from "../../../global/socket";
import LiveAnswerFeed from "../answers/LiveAnswerFeed";
import GameHeader from "../GameHeader";
import GameUserInput from "../input/GameUserInput";

export default function GameQuestionScreen({ roomData }) {
  const roomIDString = roomData._id;

  return (
    <div className="h-full w-full flex flex-col items-center">
      <div className="flex w-full justify-between">
        <GameHeader roomName={roomData.roomName} competition={roomData.competition} gameLength={roomData.gameLength} />
        <GameTimer competition={roomData.competition} />
      </div>

      <div className="flex flex-col h-3/4 w-[90%] justify-center">
        <Question />
        <div className="flex justify-start">
          <LiveAnswerFeed />
        </div>
        <GameUserInput roomIDString={roomIDString} />
      </div>
    </div>
  );
}
