import { socket } from "../socket";
import { useRef, useState } from "react";
import Message from "./Message";
export default function Chat() {
  const userInput = useRef();
  const [userMessages, setUserMessages] = useState([]);

  console.log("re-render");

  function sendMessage() {
    let data = { message: userInput.current.value, userId: socket.id };
    socket.emit("chat message", data);
    userInput.current.value = "";
  }

  socket.on("chat message", function (msgData) {
    console.log(`recieved message ${msgData.message} from ${msgData.userId}`);
    setUserMessages([...userMessages, msgData.message]); //something is going on behind the scenes
  });

  return (
    <div className="h-[90%] w-1/4 outline outline-blue-200 outline-1 rounded-lg flex flex-col justify-end">
      {userMessages.map((message, index) => (
        <Message value={message} key={index} />
      ))}
      <div className="flex">
        <input
          ref={userInput}
          type="text"
          placeholder="Type a message..."
          className=""
        ></input>
        <button className="rounded-sm bg-blue-300" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}
