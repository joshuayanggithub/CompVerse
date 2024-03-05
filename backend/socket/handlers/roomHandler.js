const mongoose = require("mongoose");
const { Room, roomUserSchema } = require("../../models/roomsModel");
const { User } = require("../../models/usersModel");
const { Question } = require("../../models/questionsModel");

module.exports = async (socket, io) => {
  const createRoom = async ({ competition, gameLength, roomName, userID }) => {
    try {
      //1. Find User Who Created
      const userCreator = await User.findOne({ userID: userID });
      //1.b Double Check User is Not in  New Room Seems to be Automatic
      //2. Create Room in db
      console.log(userID);
      let users = new Map();
      let userData = { username: userCreator.username, score: 0, buzzed: false, join: new Date() };
      users.set(userID, userData);
      const room = await Room.create({ competition, gameLength, roomName, users, roomLeader: userID, questions: [] });
      room.roomLeader = userID;
      await room.save();
      //2.b User attribute reflects room
      userCreator.room = room._id;
      userCreator.save();
      //3. Update Socket Connection / Events
      socket.leave("lobby");
      socket.join(room._id.toString());
      socket.emit("room:created", room.toJSON()); //mongoose document -> plain JS object conversion
      console.log(io.sockets.adapter.rooms);
      io.to(room._id.toString()).emit("room:countChanged", io.sockets.adapter.rooms.get(room._id.toString().size));

      //EXTRA: POPULATE QUESTIONS
      const randQuestions = await Question.aggregate([{ $match: { competition: `${competition}` } }, { $sample: { size: 10 } }]);
      room.questions = randQuestions;
      room.save();
    } catch (error) {
      console.log(error);
      socket.emit("error", error.toString());
    }
  };

  const joinRoom = async (_id) => {
    const userID = socket.handshake.auth.userID;
    try {
      socket.leave("lobby");
      //1. Find User and Add him to Room
      // console.log(_id);
      const roomJoining = await Room.findOne({ _id: _id });
      const userJoining = await User.findOne({ userID: userID });
      // console.log(roomJoining, userJoining);
      roomJoining.users.set(userID, { username: userJoining.username, score: 0, buzzed: false, join: new Date() });
      userJoining.room = roomJoining._id;
      await roomJoining.save();
      await userJoining.save();
      //2. transport user to room
      socket.emit("room:transport", roomJoining);
      socket.join(roomJoining._id.toString());
      //3. Update Socket
      socket.emit("room:joined");
      io.emit("room:countChanged", io.sockets.adapter.rooms.get(roomJoining._id.toString()).size);
    } catch (error) {
      console.log(error);
      socket.emit("error", error);
    }
  };

  const leaveRoom = async () => {
    const userID = socket.handshake.auth.userID;
    try {
      //1. Find UserLeaving
      const userLeaving = await User.findOne({ userID: userID });
      if (!userLeaving.room) return; //user is not in ANY room
      //2. Delete User from Room's Map
      const roomLeaving = await Room.findOne({ _id: userLeaving.room });
      // if (roomLeaving.roomLeader == userID) {
      //   roomLeaving.roomLeader = roomLeaving.users.
      // }
      roomLeaving.users.delete(userLeaving.userID);
      if (roomLeaving.users.size == 0) {
        roomLeaving.ongoing = false; //DELETE ROOM IF NO MORE USERS
        if (roomLeaving.questionsStartTime.length != roomLeaving.questions.length) {
          //this means game was not completed
          roomLeaving.deleteOne();
          return;
        }
      }
      await roomLeaving.save();
      socket.leave(userLeaving.room._id.toString());
      //3. Delete Room from User Attribute
      io.to(userLeaving.room._id.toString()).emit("room:countChanged", io.sockets.adapter.rooms.get(userLeaving.room._id.toString().size));
      userLeaving.room = undefined;
      await userLeaving.save();
    } catch (error) {
      socket.emit("error", error);
    }
  };

  const startRoom = async ({ _id }) => {
    const userID = socket.handshake.auth.userID;
    try {
      //1. Find UserLeaving
      const userStarting = await User.findOne({ userID: userID });
      if (!userStarting.room) return; //user is not in ANY room
      //2. Find the room
      const roomStarting = await Room.findOne({ _id: userStarting.room });
      roomStarting.started = true;
      roomStarting.questionsStartTime.push(new Date()); //start officially now
      await roomStarting.save();
      io.to(userStarting.room.toString()).emit("room:started");
      io.to(userStarting.room.toString()).emit("game:question", roomStarting.questions[0].question);
    } catch (error) {
      socket.emit("error", error);
    }
  };

  socket.on("disconnect", leaveRoom);
  socket.on("room:create", createRoom);
  socket.on("room:join", joinRoom);
  socket.on("room:leave", leaveRoom);
  socket.on("room:start", startRoom);
};
