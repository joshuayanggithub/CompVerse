import { socket } from "../../socket";
import { useEffect, useRef, useState } from "react";
import Message from "./message/Message";
import { FiSend } from "react-icons/fi";

export default function Chat({ username }) {
  const userInput = useRef();
  const [Messages, setMessages] = useState([]);

  function sendMessage() {
    let data = {
      message: userInput.current.value,
      userID: socket.auth.userID,
      username,
      date: new Date(),
      type: "user",
    };
    socket.emit("chat:message", data);
    userInput.current.value = "";
  }

  useEffect(() => {
    socket.on("chat:message", function (msgData) {
      setMessages((Messages) => [...Messages, msgData]); //something is going on behind the scenes
    });

    socket.on("chat:status", function (statusData) {
      setMessages((Messages) => [...Messages, statusData]);
    });

    return () => {
      socket.off("chat:message");
      socket.off("chat:status");
    };
  }, []);

  return (
    <div className="h-full w-full outline outline-gray-400 outline-1 rounded-lg flex flex-col justify-between">
      <div className="flex-col justify-start p-3">
        {Messages.map((message, index) => (
          <Message data={message} key={index} />
        ))}
      </div>
      <div className="flex justify-between bg-gray-100 h-10  outline rounded-b-lg rounded-t-sm z-10 outline-2 outline-transparent focus-within:outline-blue-400 ">
        <input
          ref={userInput}
          type="text"
          placeholder="Message..."
          className="bg-inherit h-full w-full pl-2 rounded-lg focus:outline-none z-10"
          onKeyDown={(event) => {
            if (event.key == "Enter") {
              sendMessage();
            }
          }}
        ></input>
        <button
          className="rounded-br-lg bg-turquoise w-10 flex items-center justify-center"
          onClick={sendMessage}
        >
          <FiSend size={25} color="#ffffff" />
        </button>
      </div>
    </div>
  );
}
