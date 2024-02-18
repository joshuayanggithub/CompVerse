import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { FiUser } from "react-icons/fi";
import LoadingSpinner from "../ui/LoadingSpinner";
import { socket } from "../../connection/socket";

export default function UsernameSelect() {
  const { username, setUsername } = useContext(UserContext); //THIS IS THE REAL USERNAME
  const [changingUsername, setChangingUsername] = useState(username); //WE NEED A PLACEHOLDER WHEN CHECKING IF USERNAME IS VALID OR NOT
  const [isValidating, setIsValidating] = useState(false);
  // const [finishedValidating, setFinishedValidating] = useState(true);

  const [errorMessage, setErrorMessage] = useState("");
  // async function switchName() {
  // socket.emit("player:usernameChange", data);
  //

  useEffect(() => {
    //component will not re-render unless useffect handles Promise for username
    setChangingUsername(username);
  }, [username]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const checkAndUpdateUsername = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL_DEV}api/user/${localStorage.getItem("userID")}`, {
          signal,
          method: "PATCH",
          headers: { "Content-Type": "application/json" }, //LITERALLY 30 MINUTES OF DEBUGGING
          body: JSON.stringify({ username: changingUsername }),
        });
        const result = await response.json();
        setUsername(result.data.response.username);
        setIsValidating(false);
        setErrorMessage("");
        socket.auth.username = result.data.response.username;
        // setFinishedValidating(true); //checkmark
        // setTimeout(() => setFinishedValidating(false), 500);
      } catch (error) {
        setErrorMessage("Username Already Taken");
        // }
      }
    };

    setIsValidating(true);
    checkAndUpdateUsername();

    return () => {
      controller.abort();
    };
  }, [changingUsername]);

  return (
    <div className="relative h-10 w-1/4 flex items-center justify-center bg-gray-100 outline outline-1 outline-gray-400 rounded-lg focus-within:outline-blue-300 focus-within:outline-2 gap-1 p-2 border-box">
      <FiUser size={20} />
      <input
        type="text"
        placeholder="Username: "
        className="w-full h-full rounded-lg bg-inherit focus:outline-none"
        value={changingUsername}
        onChange={(e) => setChangingUsername(e.target.value)}
      ></input>
      {isValidating && <LoadingSpinner />}
      <p className="absolute left-0 -top-6 transform text-red-400 font-jost ">
        <em>{errorMessage}</em>
      </p>
    </div>
  );
}
