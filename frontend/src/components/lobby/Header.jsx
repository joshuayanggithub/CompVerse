export default function Header() {
  return (
    <div className="w-full flex justify-start gap-10 items-center h-full font-jockey">
      <div className="flex items-center">
        <h1 className="text-xl m-1">CompVerse</h1>
        <img src="trophy.png" className="h-7" />
      </div>
      <div className="text-xl">How-To-Play</div>
      <div className="text-xl">Join Us!</div>
      <div className="text-xl">Leaderboards</div>
      <div className="font-light italic text-gray-500">
        &ldquo;Competition is always a good thing. It forces us to do our
        best.&rdquo;
      </div>
    </div>
  );
}
