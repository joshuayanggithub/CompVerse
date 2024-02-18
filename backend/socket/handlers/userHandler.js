const mongoose = require("mongoose");
const User = require("../../models/usersModel");
const { v4: uuidv4 } = require("uuid");
const usernameGenerator = require("unique-username-generator");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

exports.registerUserHandler = (socket, io) => {
  //broadcast status messages to chat to everybody EXCEPT SENDER
  socket.emit("user:countChanged", socket.adapter.sids.size);
  //on disconnect set session to inactive and broadcast status message
  socket.on("disconnect", () => {
    socket.broadcast.emit("user:countChanged", socket.adapter.sids.size);
  });
};

async function createNewUser() {
  try {
    const response = await fetch(`${process.env.API_URL_DEV}api/user`, {
      method: "POST",
      body: JSON.stringify(),
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

//register session before connection
exports.authorizeUser = async (socket, next) => {
  //we can attach any object we want to this auth object, as is done on the client side. Otherwise this would simply be a null value.
  const userID = socket.handshake.auth.userID;
  try {
    const user = await User.findOne({ userID });
    if (user) {
      socket.emit("player:recieveData", user);
    } else {
      const user = await createNewUser(); //remember userID is in buffer format! use userIDString instead!
      socket.emit("player:recieveData", user.data.user);
    }
  } catch (error) {
    const user = await createNewUser(); //remember userID is in buffer format! use userIDString instead!
    socket.emit("player:recieveData", user.data.user);
  }
  next();
};
