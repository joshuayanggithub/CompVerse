import Header from "../components/nav/Header";

export default function HowToPage() {
  return (
    <div className="flex w-full h-full p-5 box-border gap-3">
      <div className="flex flex-col h-full w-full">
        <div className="h-[5%] w-full">
          <Header />
        </div>
        <div className="h-[95%] w-full grid grid-cols-2 pt-16 px-12  gap-20">
          <div className="flex flex-col items-start h-1/2">
            <h1 className="text-lg font-bold font-jockey">Lobby</h1>
            <p className="">
              When you first load the page, you will be placed in the lobby where you can start new rooms and join existing rooms. You can interact with other players through the live chat and view
              players online simultaneously
            </p>
            <img src="/howtoplay/lobby.png" alt="lobby" className="w-full" />
          </div>
          <div>
            <h1 className="text-lg font-bold">Room</h1>
            <p>
              When the player who created the room is ready to begin the game, they may start the game. Each game consists of a set amount of questions and time limit per question that the room's
              creator set previously.
            </p>
            <img src="/howtoplay/waitingroom.png" alt="waiting room" />
          </div>
          <div>
            <h1 className="text-lg font-bold">Games</h1>
            <p>
              A question is displayed word by word. In the middle of the question, a player may "buzz-in", which is a 3 second period to input the answer correctly where no other players can
              "buzz-in". If the player answers the question correctly, a point is added to the scoreboard and a new question is commenced.
            </p>
            <img src="/howtoplay/question.png" alt="question" />
          </div>
          <div className="h-1/2">
            <h1 className="text-lg font-bold">Rating & Stats</h1>
            <p>
              Players who have the most points by the end of the game win the match. Games played, questions answered correctly, and games won are all kept track of and displayed on the user's profile
              and on the leaderboards!
            </p>
            <img src="/howtoplay/rating.png" alt="rating" className="w-11/12" />
          </div>
        </div>
      </div>
    </div>
  );
}
