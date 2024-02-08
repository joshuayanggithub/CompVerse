const mongoose = require("mongoose");
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

//register session before connection
exports.authorizeUser = (socket, next) => {
  //we can attach any object we want to this auth object, as is done on the client side. Otherwise this would simply be a null value.
  const userID = socket.handshake.auth.userID;
  console.log(userID);
  if (!userID) {
    //this means localStorage does not have that userID
    const userID = uuidv4();
    const randUsername = usernameGenerator.generateUsername();
    userData = { userID, username: randUsername };
    socket.username = randUsername;
    socket.emit("user:newid", userData);
  }
  next();
};
