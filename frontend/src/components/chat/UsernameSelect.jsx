import { useState } from "react";
import { FiUser } from "react-icons/fi";
import { socket } from "../../socket";

export default function UsernameSelect() {
  const [username, setUsername] = useState("");

  socket.auth = { username: username };

  return (
    <div className="h-10 w-1/4 flex items-center justify-center bg-gray-100 outline outline-2 outline-gray-300 rounded-lg focus-within:outline-blue-300 focus-within:outline focus-within:outline-2 gap-1 p-2 border-box">
      <FiUser size={20} />
      <input
        type="text"
        placeholder="username: "
        className="w-full h-full rounded-lg bg-inherit focus:outline-none"
        value={username}
        onChange={(e) => setUsername(e.value)}
      ></input>
    </div>
  );
}
