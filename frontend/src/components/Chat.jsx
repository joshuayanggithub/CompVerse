import { socket } from "../socket";
import { useRef, useState } from "react";
import Message from "./Message";
import { FiSend } from "react-icons/fi";

export default function Chat() {
  const userInput = useRef();
  const [userMessages, setUserMessages] = useState([]);

  console.log("re-render");

  function sendMessageEnter(event) {
    if (event.key === "Enter") {
      sendMessage();
    }
  }

  function sendMessage() {
    let data = {
      message: userInput.current.value,
      userId: socket.id,
      date: new Date(),
    };
    socket.emit("chat message", data);
    userInput.current.value = "";
  }

  socket.on("chat message", function (msgData) {
    console.log(
      `recieved message ${msgData.message} from ${msgData.userId} at ${msgData.date}`
    );
    setUserMessages([...userMessages, msgData]); //something is going on behind the scenes
  });

  return (
    <div className="h-[90%] w-full outline outline-gray-300 outline-2 rounded-lg flex flex-col justify-between">
      <div className="flex-col justify-start p-3">
        {userMessages.map((message, index) => (
          <Message data={message} key={index} />
        ))}
      </div>
      <div className="flex justify-between bg-gray-100 h-10 pl-3">
        <input
          ref={userInput}
          type="text"
          placeholder="Message..."
          className="bg-inherit h-full"
          onKeyDown={sendMessageEnter}
        ></input>
        <button
          className="rounded-sm bg-blue-300 w-10 flex items-center justify-center"
          onClick={sendMessage}
        >
          <FiSend size={25} color="#ffffff" />
        </button>
      </div>
    </div>
  );
}
