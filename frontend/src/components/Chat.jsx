export default function Chat() {
  function sendMessage() {}

  return (
    <div className="h-[90%] w-1/4 outline outline-blue-200 outline-1 rounded-lg flex flex-col justify-end">
      <div className="flex">
        <input type="text" placeholder="Type a message..." className=""></input>
        <button className="rounded-sm bg-blue-300" onSubmit={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}
