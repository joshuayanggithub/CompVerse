import GameUser from "./GameUser";

export default function GameUserList() {
  return (
    <div className="flex justify-start items-center w-full gap-10 h-full p-5">
      <GameUser
        username={"dsaf"}
        score={"2"}
        profilePicture={"/anonymous.avif"}
      />
      <GameUser
        username={"dsaf"}
        score={"2"}
        profilePicture={"/anonymous.avif"}
      />
      <GameUser
        username={"dsaf"}
        score={"2"}
        profilePicture={"/anonymous.avif"}
      />
    </div>
  );
}
