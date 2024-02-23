import ButtonWrapper from "../ui/ButtonWrapper";

export default function GameStartScreen({ startGame, leaveGame }) {
  return (
    <div className="w-full flex flex-col items-center justify-start">
      <h1 className="text-5xl font-bold font-jost ">Waiting for Game to Start...</h1>
      <img src="/snoopy.gif" />
      <div className="flex gap-5">
        <ButtonWrapper onClick={startGame}>Start Game</ButtonWrapper>
        <ButtonWrapper onClick={leaveGame} color={"bg-red-400"}>
          Leave Game
        </ButtonWrapper>
      </div>
    </div>
  );
}
