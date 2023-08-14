import Room from "./Room";

export default function RoomsPage() {
  return (
    <div className="flex flex-col w-[80%]">
      <Room
        roomName={"Texas Treaters"}
        roomGame={"Science Bowl"}
        usersJoined={5}
      />
    </div>
  );
}
