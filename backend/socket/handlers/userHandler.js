const mongoose = require("mongoose");
const { User } = require("../../models/usersModel");
const { v4: uuidv4 } = require("uuid");
const usernameGenerator = require("unique-username-generator");
const dotenv = require("dotenv");
const { Room } = require("../../models/roomsModel");

dotenv.config({ path: "./config.env" });

exports.registerUserHandler = async (socket, io) => {
  //broadcast status messages to chat to everybody EXCEPT SENDER
  const user = await User.findOne({ userID: socket.handshake.auth.userID });
  user.online = true;
  await user.save();
  io.emit("user:countChanged", socket.adapter.sids.size);

  //on disconnect set session to inactive and broadcast status message
  socket.on("disconnect", async () => {
    const user = await User.findOne({ userID: socket.handshake.auth.userID });
    user.online = false;
    await user.save();
    io.emit("user:countChanged", socket.adapter.sids.size);
  });

  const updateUsername = async (newUsername) => {
    let data = { error: null };
    try {
      const user = await User.findOne({ userID: socket.handshake.auth.userID });
      user.username = newUsername;
      await user.save();
      socket.handshake.auth.username = newUsername;
      data.username = newUsername;
      socket.emit("user:update", data);
      io.emit("user:refresh");
    } catch (error) {
      console.log(error);
      data.error = error.toString();
      socket.emit("user:update", data);
    }
  };

  socket.on("user:username", updateUsername);
};

//AUTHENTICATION
function updateSocket(socket, user) {
  //doesnt work?
  socket.handshake.auth.userID = user.userID;
  socket.handshake.auth.username = user.username;
}

async function createNewUser(socket) {
  try {
    const userBody = { username: usernameGenerator.generateUsername(), userID: uuidv4() };
    const user = await User.create(userBody);
    updateSocket(socket, user);
    return user;
  } catch (error) {
    return error;
  }
}

// register session before connection
exports.authorizeUser = async (socket, next) => {
  const userID = socket.handshake.auth.userID;
  try {
    //1. Attempt to find user with userID
    let user = await User.findOne({ userID: userID });
    // console.log(user);
    if (user) {
      //2. send user data if found
      updateSocket(socket, user);
    } else {
      //3 valid UUID but not in db means creat new User
      user = await createNewUser(socket); //remember userID is in buffer format! use userIDString instead!
    }
    socket.emit("user:data", user);
  } catch (error) {
    //4. userID is just some randomvalue instead of valid UUID
    const user = await createNewUser(socket); //remember userID is in buffer format! use userIDString instead!
    socket.emit("user:data", user);
    // console.log(user);
  }
  next();
};
