import { useEffect, useState } from "react";
import { FiUser } from "react-icons/fi";
import LoadingSpinner from "../ui/LoadingSpinner";
import { socket } from "../../global/socket";

export default function UsernameSelect() {
  const [username, setUsername] = useState("");
  const [changingUsername, setChangingUsername] = useState(""); //WE NEED A PLACEHOLDER WHEN CHECKING IF USERNAME IS VALID OR NOT
  const [isValidating, setIsValidating] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // const [finishedValidating, setFinishedValidating] = useState(true);

  // async function switchName() {
  // socket.emit("player:usernameChange", data);
  //

  useEffect(() => {
    socket.on("user:data", function (user) {
      localStorage.setItem("userID", user.userIDString);
      socket.auth.userID = user.userIDString;
      socket.auth.username = user.username;
      setUsername(user.username);
      setChangingUsername(user.username);
    });

    socket.on("user:update", function ({ error }) {
      if (error) {
        setErrorMessage("Duplicate Username");
      } else {
        setUsername(username);
        setErrorMessage("");
        setChangingUsername(changingUsername);
        setIsValidating(false);
      }
    });

    return () => {
      socket.off("user:data");
      socket.off("user:update");
    };
  });

  function changeUsername(newUsername) {
    setIsValidating(true);
    setChangingUsername(newUsername);
    socket.emit("user:username", newUsername);
  }

  return (
    <div className="relative h-10 w-1/4 flex items-center justify-center bg-gray-100 outline outline-1 outline-gray-400 rounded-lg focus-within:outline-blue-300 focus-within:outline-2 gap-1 p-2 border-box">
      <FiUser size={20} />
      <input type="text" placeholder="Username: " className="w-full h-full rounded-lg bg-inherit focus:outline-none" value={changingUsername} onChange={(e) => changeUsername(e.target.value)}></input>
      {isValidating && <LoadingSpinner />}
      <p className="absolute left-0 -top-6 transform text-red-400 font-jost overflow-visible w-full italic">{errorMessage}</p>
    </div>
  );
}
