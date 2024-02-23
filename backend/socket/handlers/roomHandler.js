const mongoose = require("mongoose");
const Room = require("../../models/roomsModel");

module.exports = async (socket, io) => {
  const createRoom = async ({ competition, gameLength, roomName, userID }) => {
    users = [userID];
    const room = await Room.create({ competition, gameLength, roomName, users });
    console.log(room);
    io.emit("room:created", room.toJSON()); //mongoose document -> plain JS object conversion
  };

  const joinRoom = async (room, socket) => {
    // socket.join(`${room._id}`);
    socket.emit("room:joined", room);
  };

  socket.on("room:join", joinRoom);
  socket.on("room:create", createRoom);
  // socket.on("game:join", joinGame);
};
