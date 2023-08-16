export default function Room({ roomName, roomGame, usersJoined }) {
  return (
    <div className="flex justify-between outline outline-gray-300 outline-2 rounded-lg p-5 w-full">
      <div>
        <div>{roomName}</div>
        <div className="text-gray-400">{roomGame}</div>
      </div>
      <div>{`Users Joined: ${usersJoined}`}</div>
    </div>
  );
}
