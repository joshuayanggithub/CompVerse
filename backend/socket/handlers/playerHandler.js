const mongoose = require("mongoose");
const User = require("../../models/usersModel");
const { v4: uuidv4 } = require("uuid");
const usernameGenerator = require("unique-username-generator");

exports.registerPlayerHandler = (socket, io) => {
  //broadcast status messages to chat to everybody EXCEPT SENDER
  socket.emit("player:countChanged", io.engine.clientsCount);

  //on disconnect set session to inactive and broadcast status message
  socket.on("disconnect", () => {
    socket.broadcast.emit("player:countChanged", io.engine.clientsCount);
  });
};

const createNewUser = async (socket) => {
  const userID = uuidv4();
  const randUsername = usernameGenerator.generateUsername();
  await User.create({ userID, username: randUsername });
  socket.emit("player:ID", { userID, username: randUsername });
};

//register session before connection
exports.authorizeUser = async (socket, next) => {
  //we can attach any object we want to this auth object, as is done on the client side. Otherwise this would simply be a null value.
  const userID = socket.handshake.auth.userID;
  try {
    const user = await User.find({ userID });
    if (user.length == 0) {
      await createNewUser(socket);
    } else {
      //already have this user
      socket.emit("player:data", user);
    }
  } catch (error) {
    // console.error(error);
    await createNewUser(socket);
  }
  next();
};
