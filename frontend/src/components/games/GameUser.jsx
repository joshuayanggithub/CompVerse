export default function GameUser({ username, score, profilePicture }) {
  return (
    <div className="w-[5%] h-full flex gap-2 justify-center items-center">
      <img src={profilePicture} className="w-10 h-10" />
      <h1>{username}</h1>
      <h1>{score}</h1>
    </div>
  );
}
