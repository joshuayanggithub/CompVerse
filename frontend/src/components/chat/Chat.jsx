import { socket } from "../../connection/socket";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import Message from "./message/Message";
import { FiSend } from "react-icons/fi";
import MinimizeArrow from "../ui/MinimizeArrow";

export default function Chat({ height }) {
  const userInput = useRef();
  const { username } = useContext(UserContext);
  const [Messages, setMessages] = useState([]);
  const [minimized, setMinimized] = useState(false);

  function sendMessage() {
    let data = {
      message: userInput.current.value,
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

    socket.on("connect", function () {
      setMessages((Messages) => [...Messages, { message: "You have connected!", date: new Date() }]);
    });

    socket.on("chat:status", function (statusData) {
      setMessages((Messages) => [...Messages, statusData]);
    });

    return () => {
      socket.off("chat:message");
      socket.off("connect");
      socket.off("chat:status");
    };
  });

  return (
    <div className={`${minimized ? "h-10" : height} w-full flex flex-col justify-between mt-[1px] outline outline-gray-400 outline-1 rounded-b-md rounded-t-none z-0`}>
      {/* Chat Header */}
      <div className="flex items-center justify-between px-3 pt-3">
        <div className="flex items-center justify-center gap-1">
          <div className="w-[5px] h-[5px] rounded-lg bg-green-500"></div>
          <h3 className="italic text-gray-600 text-sm font-light">Chatroom</h3>
        </div>
        <MinimizeArrow minimized={minimized} setMinimized={setMinimized} />
      </div>
      {/* Chat Components */}
      <div className={`${minimized && "hidden"} h-full flex flex-col justify-between overflow-hidden`}>
        <div className="flex-col justify-start px-5 overflow-scroll h-[90%]">
          {Messages.map((message, index) => (
            <Message data={message} key={index} username={username} />
          ))}
        </div>
        <div className="flex justify-between bg-gray-100 h-10  outline rounded-b-lg rounded-t-sm outline-2 outline-transparent focus-within:outline-blue-400 z-50 ">
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
          <button className="rounded-br-lg bg-turquoise w-10 flex items-center justify-center" onClick={sendMessage}>
            <FiSend size={25} color="#ffffff" />
          </button>
        </div>
      </div>
    </div>
  );
}
