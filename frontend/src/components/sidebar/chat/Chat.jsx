import { useEffect, useRef, useState } from "react";
import Message from "./message/Message";
import { FiSend } from "react-icons/fi";
import MinimizeArrow from "../../ui/MinimizeArrow";
import removeObscenity from "../../../global/chatfilter";
import { socket } from "../../../global/socket";

export default function Chat({ height, socketRoomId }) {
  const userInput = useRef();
  const [Messages, setMessages] = useState([]);
  const [minimized, setMinimized] = useState(false);
  const messagesEndRef = useRef(null);

  function sendMessage() {
    if (userInput.current.value == "" || userInput.current.value == undefined || userInput.current.value == null) {
      return;
    }
    const filteredmessage = removeObscenity(userInput.current.value);
    let data = {
      message: filteredmessage,
      username: socket.auth.username,
      date: new Date(),
      type: "user",
      room: socketRoomId,
    };
    socket.emit("chat:message", data);
    userInput.current.value = "";
  }

  useEffect(() => {
    socket.on("chat:message", function (msgData) {
      setMessages((Messages) => [...Messages, msgData]); //something is going on behind the scenes
    });

    socket.on("connect", function () {
      //lobby
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

  useEffect(() => {
    scrollToBottom();
  }, [Messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={`${minimized ? "h-10" : height} w-full flex flex-col justify-between mt-[1px] outline outline-gray-400 outline-1 rounded-b-md rounded-t-none z-0`}>
      {/* Chat Header */}
      <div className="flex items-center justify-between px-3 pt-3">
        <div className="flex items-center justify-center gap-1">
          <div className="w-[5px] h-[5px] rounded-lg bg-green-500"></div>
          <h3 className="italic text-gray-600 text-sm font-light">Chatroom {`(${socketRoomId.substring(0, 5)})`}</h3>
        </div>
        <MinimizeArrow minimized={minimized} setMinimized={setMinimized} />
      </div>
      {/* Chat Components */}
      <div className={`${minimized && "hidden"} h-full flex flex-col justify-between overflow-hidden`}>
        <div className="flex-col justify-start px-5 overflow-scroll h-[90%]">
          {Messages.map((message, index) => (
            <Message data={message} key={index} username={socket.auth.username} />
          ))}
          <div ref={messagesEndRef}></div>
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
