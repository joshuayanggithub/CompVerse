import { Link } from "react-router-dom";
import StatsSummary from "./StatsSummary";

export default function Header() {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-full flex justify-center gap-10 items-center font-jockey">
        <Link to="/howto" className="text-xl hover:underline">
          How to Play
        </Link>
        <Link to="/home" className="text-xl hover:underline">
          Community
        </Link>
        <Link to="/" className="flex items-center hover:underline">
          <h1 className="text-2xl m-1 text-trophygold font-outline-1">CompVerse</h1>
          <img src="/trophy.png" className="h-7" />
        </Link>
        <Link to="/leaderboards" className="text-xl hover:underline">
          Leaderboards
        </Link>
        <Link to="/aboutus" className="text-xl hover:underline">
          About Us
        </Link>
        {/* <div className="font-light italic text-gray-500">&ldquo;Competition is always a good thing. It forces us to do our best.&rdquo;</div> */}
      </div>
      <div>
        <StatsSummary />
      </div>
    </div>
  );
}
