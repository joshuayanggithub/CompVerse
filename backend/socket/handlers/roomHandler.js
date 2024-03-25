const mongoose = require("mongoose");
const { Room, roomUserSchema } = require("../../models/roomsModel");
const { User } = require("../../models/usersModel");
const { Question } = require("../../models/questionsModel");
const AppError = require("../../utils/AppError");

module.exports = async (socket, io) => {
  const createRoom = async ({ competition, gameLength, roomName, userID, timePerQuestion }) => {
    try {
      //1. Find and validate the user who created the room
      const userCreator = await User.findOne({ userID: userID });

      //2. Double check that user is not in the new room
      if (userCreator.room != null) {
        socket.emit("error", new AppError("User is already in another room", "socket"));
        return;
      }

      //3A. Create Room in database with updated information
      let users = new Map();
      let userData = { username: userCreator.username, score: 0, buzzed: false, join: new Date() };
      users.set(userID, userData);
      const room = await Room.create({ competition, gameLength, roomName, users, timePerQuestion, roomLeader: userID, questions: [] });
      room.roomLeader = userID;
      await room.save();

      //3B. Update user attributes to reflect user's room
      userCreator.room = room._id;
      await userCreator.save();

      //4. Update Socket Connection / Events
      socket.leave("lobby");
      socket.join(room._id.toString());
      socket.emit("room:transport", room._id.toString()); //room.toJSON() mongoose document -> plain JS object conversion
      io.to(room._id.toString()).emit("room:update");
      io.to("lobby").emit("rooms:update");

      //5. Populate questions in Room
      if (competition == "Math Countdown") {
        const randQuestions = await Question.aggregate([{ $match: { $or: [{ competition: "Mathleague" }, { competition: "Mathcounts" }] } }, { $sample: { size: gameLength } }]);
        room.questions = randQuestions;
        await room.save();
      } else {
        const randQuestions = await Question.aggregate([{ $match: { competition: `${competition}` } }, { $sample: { size: gameLength } }]);
        room.questions = randQuestions;
        await room.save();
      }
    } catch (error) {
      console.log(error);
      socket.emit("error", new AppError(error.toString(), "socket"));
    }
  };

  const joinRoom = async (_id) => {
    const userID = socket.handshake.auth.userID;
    try {
      if (_id == "lobby") {
        await leaveRoom();
        return;
      }
      //1. Find User and Add him to Room
      const roomJoining = await Room.findOne({ _id: _id });
      const userJoining = await User.findOne({ userID: userID });
      roomJoining.users.set(userID, { username: userJoining.username, score: 0, buzzed: false, join: new Date() });
      userJoining.room = roomJoining._id;
      await roomJoining.save();
      const user = await userJoining.save();

      //2A. transport user to new room on client-side
      socket.emit("room:transport", roomJoining._id.toString());
      //2B. Leave lobby and join room _id
      socket.leave("lobby");
      socket.join(roomJoining._id.toString());
      //2C. Chat status to users in room and for user himself/herself
      socket.emit("chat:status", { message: `You have joined`, date: new Date() });
      socket.broadcast.to(roomJoining._id.toString()).emit("chat:status", { message: `${userJoining.username} has joined the Room!`, date: new Date() });

      //3. Update sockets
      io.to(roomJoining._id.toString()).emit("room:update");
      io.to("lobby").emit("rooms:update");

      //3. Emit user data to reload data
      socket.emit("user:data", user);
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
      let roomLeaving = await Room.findOne({ _id: userLeaving.room.toString() });

      //2. Reassign roomLeader if the userLeaving is the roomLeader
      if (roomLeaving.roomLeader.toString() == userID) {
        let users = Array.from(roomLeaving.users.keys());
        for (const user of users) {
          if (user != userID) {
            roomLeaving.roomLeader = user; //emit to this user's room (which is his userID) that he is the new leader
            io.to(user).emit("room:leader", user);
            break;
          }
        }
      }

      //5. Update User in Database
      userLeaving.room = undefined;
      const user = await userLeaving.save();

      //3A. Delete User from Room's Map
      roomLeaving.users.delete(userLeaving.userID);
      roomLeaving = await roomLeaving.save();

      //3B. Set room to finished if no more users
      if (roomLeaving.users.size == 0) {
        roomLeaving.ongoing = false;
        roomLeaving = await roomLeaving.save();
        //3C. Delete the Room from database if not all questions were ever played!
        if (roomLeaving.questionsStartTime.length != roomLeaving.questions.length) {
          await roomLeaving.deleteOne();
        }
      }

      //4. Update socket

      socket.leave(roomLeaving._id.toString());
      socket.broadcast.to(roomLeaving._id.toString()).emit("chat:status", { message: `${userLeaving.username} has left the room!`, date: new Date() });
      socket.join("lobby");
      socket.broadcast.to("lobby").emit("chat:status", { message: `${userLeaving.username} has joined the lobby!`, date: new Date() });
      io.to(roomLeaving._id.toString()).emit("room:update");
      io.to("lobby").emit("rooms:update");
      socket.emit("user:data", user);
    } catch (error) {
      console.error(error);
      console.error(error.message);
      socket.emit("error", new AppError(error.toString(), "socket"));
    }
  };

  socket.on("disconnect", leaveRoom);
  socket.on("room:create", createRoom);
  socket.on("room:join", joinRoom);
  socket.on("room:leave", leaveRoom);
};
