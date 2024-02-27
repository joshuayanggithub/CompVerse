const mongoose = require("mongoose");
const { Room, roomUserSchema } = require("../../models/roomsModel");
const { User } = require("../../models/usersModel");
const { Question } = require("../../models/questionsModel");

module.exports = async (socket, io) => {
  const createRoom = async ({ competition, gameLength, roomName, userID }) => {
    try {
      //1. Find User Who Created
      const userCreator = await User.findOne({ userID: userID });
      //2. Create Room in db
      let users = new Map();
      let userData = { username: userCreator.username, score: 0, buzzed: false, join: new Date() };
      users.set(userID, userData);
      const room = await Room.create({ competition, gameLength, roomName, users, roomLeader: userID, questions: [] });
      //3. Update Socket Connection / Events
      socket.join(room._id.toString());
      socket.emit("room:created", room.toJSON()); //mongoose document -> plain JS object conversion
      console.log(io.sockets.adapter.rooms);
      io.to(room._id.toString()).emit("room:countChanged", io.sockets.adapter.rooms.get(room._id.toString().size));
      console.log(competition);

      //EXTRA: POPULATE QUESTIONS
      const randQuestions = await Question.aggregate([{ $match: { competition: `${competition}` } }, { $sample: { size: 10 } }]);
      console.log(randQuestions);
      room.questions = randQuestions;
      room.save();
    } catch (error) {
      console.log(error);
      socket.emit("error", error);
    }
  };

  const joinRoom = async ({ room, userID }) => {
    try {
      // socket.join(`${room._id}`);
      const roomJoining = await Room.findOne({ _id: room._id });
      const userJoining = await User.findOne({ userID: userID });
      roomJoining.users.push(userJoining);
      await roomJoining.save();
      socket.emit("room:transport", roomJoining);
      socket.join(roomJoining._id.toString());
      const numberPeople = io.sockets.adapter.rooms.get(roomJoining._id.toString()).size;
      console.log(io.sockets.adapter.rooms);
      console.log(socket.id);
      setTimeout(() => {
        io.emit("room:countChanged", numberPeople);
        console.log(numberPeople);
      }, 10000);
    } catch (error) {
      socket.emit("error", error);
    }
  };

  const leaveRoom = async ({ room, userID }) => {
    try {
      socket.leave(room._id.toString());
      const roomLeaving = await Room.findOne({ _id: room._id });
      roomLeaving.users.forEach(async (user, index) => {
        if (roomLeaving.users.userIDString == userID) {
          roomLeaving.users.splice(index, 1);
          await roomLeaving.save();
          return;
        }
      });
      io.to(roomLeaving._id.toString()).emit("room:countChanged", io.sockets.adapter.rooms.get(roomLeaving._id.toString()));
    } catch (error) {
      socket.emit("error", error);
    }
  };

  const startRoom = async () => {};

  socket.on("room:create", createRoom);
  socket.on("room:join", joinRoom);
  socket.on("room:leave", leaveRoom);
  socket.on("room:start", startRoom);
};
