import { useEffect, useState } from "react";
import { FiUser } from "react-icons/fi";
import { socket } from "../../socket";

export default function UsernameSelect({ username }) {
  const [name, setName] = useState();

  useEffect(() => {
    setName(username);
  }, [username]);

  function switchName(e) {
    let newName = e.value;
    let data = {
      username: newName,
      sessionID: socket.auth.sessionID,
    };
    socket.emit("player:usernameChange", data);
    setName(newName);
  }

  return (
    <div className="h-10 w-1/4 flex items-center justify-center bg-gray-100 outline outline-1 outline-gray-400 rounded-lg focus-within:outline-blue-300 focus-within:outline-2 gap-1 p-2 border-box">
      <FiUser size={20} />
      <input
        type="text"
        placeholder="Username: "
        className="w-full h-full rounded-lg bg-inherit focus:outline-none"
        value={name}
        onChange={(e) => switchName(e)}
      ></input>
    </div>
  );
}
