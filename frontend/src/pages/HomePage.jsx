import Header from "../components/page/Header";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="flex w-full h-full p-5 box-border gap-3">
      <div className="flex flex-col h-full w-full">
        <div className="h-[5%] w-full">
          <Header />
        </div>
        <div className="h-[95%] w-full flex items-center justify-center gap-[4rem]">
          <div className="h-[80%] flex flex-col w-[30%] justify-around">
            <h1 className="font-jockey text-8xl">Multiplayer, </h1>
            <h1 className="font-jockey text-8xl">Educational,</h1>
            <h1 className="font-jockey text-8xl"> and FUN</h1>
            <p className="text-base font-jost">Compete in head-to-head matches</p>
            <Link to="/">
              <button className="bg-turquoise text-black text-5xl w-[70%] h-20 rounded-full font-jockey animate-jumpshaking">Play Now</button>
            </Link>
          </div>
          <img className="h-[80%]" src="/competitions.png" />
        </div>
      </div>
    </div>
  );
}
