export default function Header() {
  return (
    <div className="w-full flex justify-start gap-10 items-center h-full">
      <div className="flex items-center">
        <h1 className="font-medium	 text-xl">CompVerse</h1>
        <img src="trophygold1.png" className="h-5 w-5" />
      </div>
      <div className="font-normal">How-To-Play</div>
      <div className="font-normal">Join Us!</div>
      <div className="font-normal">Leaderboards</div>
      <div className="font-light	 italic text-gray-500">
        &ldquo;Competition is always a good thing. It forces us to do our
        best.&rdquo;
      </div>
    </div>
  );
}
