export default function OnlineStatus({ playersOnline, socketRoomId }) {
  const onlineString =
    socketRoomId == "lobby" ? `${playersOnline} User${playersOnline == 1 ? "" : "s"} Online (${socketRoomId.substring(0, 5)})` : `Scoreboard of ${playersOnline} (${socketRoomId.substring(0, 5)})`;

  return (
    <div className="flex justify-between items-center h-full w-full">
      <div className="flex items-center justify-center gap-1">
        <div className="w-[5px] h-[5px] rounded-lg bg-green-500"></div>
        <h3 className="italic text-gray-600 text-sm font-light">{onlineString}</h3>
      </div>
    </div>
  );
}
