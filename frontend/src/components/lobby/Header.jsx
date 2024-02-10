import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="w-full flex justify-start gap-10 items-center h-full font-jockey">
      <Link to="/home" className="flex items-center hover:underline">
        <h1 className="text-xl m-1">CompVerse</h1>
        <img src="trophy.png" className="h-7" />
      </Link>
      <Link to="/home" className="text-xl hover:underline">
        Home
      </Link>
      <Link to="/howto" className="text-xl hover:underline">
        How to Play
      </Link>
      <Link to="/leaderboards" className="text-xl hover:underline">
        Leaderboards
      </Link>
      <div className="font-light italic text-gray-500">
        &ldquo;Competition is always a good thing. It forces us to do our
        best.&rdquo;
      </div>
    </div>
  );
}
