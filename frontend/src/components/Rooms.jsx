import Room from "./Room";

export default function Rooms() {
  return (
    <>
      <div className="grid grid-cols-2 w-full gap-5">
        <Room
          roomName={"Texas Treaters"}
          roomGame={"Science Bowl"}
          usersJoined={5}
        />
        <Room
          roomName={"Texas Treaters"}
          roomGame={"Science Bowl"}
          usersJoined={5}
        />
        <Room
          roomName={"Texas Treaters"}
          roomGame={"Science Bowl"}
          usersJoined={5}
        />
        <Room
          roomName={"Texas Treaters"}
          roomGame={"Science Bowl"}
          usersJoined={5}
        />
        <Room
          roomName={"Texas Treaters"}
          roomGame={"Science Bowl"}
          usersJoined={5}
        />
      </div>
    </>
  );
}
