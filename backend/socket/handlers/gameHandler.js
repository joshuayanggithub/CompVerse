const mongoose = require("mongoose");
const { Room, roomUserSchema } = require("../../models/roomsModel");
const { User } = require("../../models/usersModel");
const { Question } = require("../../models/questionsModel");

module.exports = async (socket, io) => {
  const gameBuzz = async () => {
    const userID = socket.handshake.auth.userID;
    try {
      //1. Validate User and Room
      const userBuzzing = await User.findOne({ userID: userID });
      const roomBuzzing = await Room.findOne({ _id: userBuzzing.room });
      //2. Update buzz state immediately
      io.to(roomBuzzing._id.toString()).emit("game:buzzed", userID);
      roomBuzzing.users.set(userID, (roomBuzzing.users.get(userID).buzzed = true));
      await roomBuzzing.save();
    } catch (error) {
      console.error(error);
    }
  };
  const gameAnswering = async (answer, _id) => {
    //0. It's really tedious to have to do error checking, so we aren't going to check valid userID and gameRoom
    const userID = socket.handshake.auth.userID;
    //1. Emit User Input Live
    io.except(userID).to(_id).emit("game:answering", answer);
  };

  const checkAnswer = async (userAnswer, correctAnswers) => {
    return correctAnswers.includes(userAnswer);
  };

  const gameAnswer = async (answer) => {
    //1. Validate User and Room
    const userID = socket.handshake.auth.userID;
    const user = await User.findOne({ userID: userID });
    const room = await Room.findOne({ _id: userAnswering.room });
    //2. Check Answer
    const currentQuestionIndex = room.questionsStartTime.length - 1;
    answer = answer.toLowerCase();
    const correct = checkAnswer(answer, room.questions[currentQuestionIndex].answers);
    //3. Continue based on correctness
    if (correct) {
      //A. emit user answer and then acceptable, correct answers
      io.to(room._id.toString()).emit("game:correct", answer).emit("game:correctanswer", room.questions[currentQuestionIndex].answers);
      //B. update scoreboard
      room.users.set((room.users.get(userID).score += 1));
      const updatedRoom = await room.save();
      io.to(updatedRoom._id.toString()).emit("game:scoreboard", updatedRoom.users);
      //C. emit new quesiton
      await newQuestion(updatedRoom); //this is mongoose document object
    } else {
      //A. Emit correct answer
      io.to(room._id.toString()).emit("game:correctanswer", room.questions[currentQuestionIndex].answers);
      //If no one else answers...
      let allAnswered = true;
      for (user in room.users) {
        if (!user.buzzed) {
          allAnswered = false;
          break;
        }
      }
      //B. if All answered, then start emitting new question, otherwise do nothing
      if (allAnswered) {
        await newQuestion(room);
      }
    }
  };

  const newQuestion = async (room) => {
    //0. Pre-conditions to check if room is done
    const currentQuestionIndex = room.questionsStartTime.length - 1;
    if (currentQuestionIndex == room.questions.length - 1) {
      gameEnd();
      return;
    }
    //1. Send new question data
    io.to(room._id.toString()).emit("game:newQuestion", room.questions[currentQuestionIndex + 1].question);
    //2. start question timer immediately
    room.questionsStartTime.push(new Date()); //start officially now;
    await room.save();
  };

  const gameEnd = async (room) => {
    //0. presumed that room validation is done beforehand
    //1. Update Room state
    room.ongoing = false;
    await room.save();
  };

  //server emitters
  //

  //server listeners
  socket.on("game:answer", gameAnswer);
  socket.on("game:answering", gameAnswering);
  socket.on("game:buzz", gameBuzz);
};
