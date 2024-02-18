const mongoose = require("mongoose");
const Room = require("../../models/roomsModel");

module.exports = async (socket, io) => {
  const createRoom = async ({ competition, gameLength, roomName, userID }) => {
    users = [userID];
    const room = await Room.create({ competition, gameLength, roomName, users });
    io.emit("room:created", room.toJSON()); //mongoose document -> plain JS object conversion
  };

  socket.on("room:create", createRoom);
  // socket.on("game:join", joinGame);
};
