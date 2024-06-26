import { useEffect } from "react";
import Game from "../components/games/Game";
import Header from "../components/nav/Header";
import { useLoaderData, useNavigate } from "react-router-dom";
import { socket } from "../global/socket";
import Sidebar from "../components/sidebar/Sidebar";

export default function GamePage() {
  const roomData = useLoaderData().room;
  const navigate = useNavigate();

  if (roomData == undefined) {
    navigate("/");
  }

  useEffect(() => {
    socket.emit("room:join", roomData._id);

    socket.on("user:data", function (user) {
      localStorage.setItem("userID", user.userIDString);
      socket.auth.userID = user.userIDString;
      socket.auth.username = user.username;
    });

    return () => {
      socket.off("user:data");
    };
  }, []);

  return (
    <div className="flex flex-col w-full h-full box-border py-5">
      <div className="h-[10%] w-full">
        <div className="h-full">
          <Header />
        </div>
      </div>
      <div className="flex h-[90%] w-full justify-evenly items-center">
        <div className="h-full w-[73%]">
          <Game roomData={roomData} />
        </div>
        <div className="h-full w-[23%]">
          <Sidebar socketRoomId={roomData._id.toString()} chatHeight={"h-1/2"} userListHeight={"h-1/2"} />
        </div>
      </div>
    </div>
  );
}
