import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL = import.meta.env.PROD ? undefined : "http://localhost:4000"; //4000 is my node.js server with the attatched socket.io server

const userID = localStorage.getItem("userID"); //null if not found

export const socket = io(URL, {
  auth: { userID },
  // autoConnect: true, //IMPORTANT TO PREVENT CONNECTION BY DEFAULT
  //multiplex: false for testing different users
});
