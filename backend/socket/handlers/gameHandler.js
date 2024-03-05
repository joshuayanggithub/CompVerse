const mongoose = require("mongoose");
const { Room, roomUserSchema } = require("../../models/roomsModel");
const { User } = require("../../models/usersModel");
const { Question } = require("../../models/questionsModel");

module.exports = async (socket, io) => {
  //io.to(userStarting.room.toString()).emit("room:question", roomStarting.questions[0]);

  const gameAnswer = async (answer) => {
    console.log(answer);
    const userID = socket.handshake.auth.userID;
    const userAnswering = await User.findOne({ userID: userID });
    console.log(userAnswering);
    const roomAnswering = await Room.findOne({ _id: userAnswering.room });
    const currentQuestionIndex = roomAnswering.questionsStartTime.length - 1;
    io.to(userAnswering.room.toString()).emit("game:correctanswer", roomAnswering.questions[currentQuestionIndex].answer);
    roomAnswering.questionsStartTime.push(new Date()); //start officially now;
    await roomAnswering.save();
    io.to(userAnswering.room.toString()).emit("game:question", roomAnswering.questions[currentQuestionIndex + 1].question);
  };

  const gameBuzz = async () => {
    const userID = socket.handshake.auth.userID;
    try {
      const userBuzzing = await User.findOne({ userID: userID });
      const roomBuzzing = await Room.findOne({ _id: userBuzzing.room });
      roomBuzzing.users.set(userID, (roomBuzzing.users.get(userID).buzzed = true));
    } catch (error) {}
  };

  socket.on("game:answer", gameAnswer);

  socket.on("game:buzz", gameBuzz);
};
