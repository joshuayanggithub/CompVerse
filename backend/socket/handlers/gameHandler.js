const mongoose = require("mongoose");
const { Room, roomUserSchema } = require("../../models/roomsModel");
const { User } = require("../../models/usersModel");
const { Question } = require("../../models/questionsModel");
const AppError = require("../../utils/AppError");

module.exports = async (socket, io) => {
  const gameBuzz = async (_id) => {
    const userID = socket.handshake.auth.userID;
    try {
      //0. No validation for now, to minimize time
      //1. Update buzz state immediately
      socket.broadcast.to(_id).emit("game:buzzed", socket.handshake.auth.username);
      //2. update room data
      const roomBuzzing = await Room.findById(_id);
      const temp = roomBuzzing.users.get(userID);
      temp.buzzed = true;
      roomBuzzing.users.set(userID, temp);
      await roomBuzzing.save();
    } catch (error) {
      console.error(error);
    }
  };
  const gameAnswering = async ({ currentAnswer, _id }) => {
    //0. It's really tedious to have to do error checking, so we aren't going to check valid userID and gameRoom
    const userID = socket.handshake.auth.userID;
    //1. Emit User Input Live to Everyone Else!
    socket.broadcast.to(_id).emit("game:answering", currentAnswer);
  };

  const checkAnswer = async (userAnswer, correctAnswers) => {
    //Try and be as accurate as possible
    console.log(userAnswer);
    correctAnswers.forEach((correctAnswer) => {
      if (correctAnswer.toLowerCase() == userAnswer) {
        console.log("coffd", correctAnswer);
        return true;
      }
    });
    return false;
  };

  const gameAnswer = async (answer) => {
    //1. Validate User and Room
    const userID = socket.handshake.auth.userID;
    const userAnswering = await User.findOne({ userID: userID });
    const room = await Room.findOne({ _id: userAnswering.room });
    //2. Check Answer
    const currentQuestionIndex = room.questionsStartTime.length - 1;
    const correct = checkAnswer(answer.toLowerCase(), room.questions[currentQuestionIndex].answers);
    //3. Continue based on correctness
    if (correct == true) {
      //A. emit user answer and then acceptable, correct answers
      socket.emit("game:correct", answer);
      io.to(room._id.toString()).emit("game:actualAnswer", room.questions[currentQuestionIndex].answers);
      //B. update scoreboard
      let temp = room.users.get(userID);
      temp.score = room.users.get(userID).score + 1;
      console.log(temp);
      room.users.set(userID, temp);
      const updatedRoom = await room.save();
      io.to(updatedRoom._id.toString()).emit("room:update", updatedRoom.users);
      //C. emit new quesiton
      await newQuestion(updatedRoom); //this is mongoose document object
    } else {
      //A. Emit correct answer
      socket.emit("game:wrong", answer);
      io.to(room._id.toString()).emit("game:actualAnswer", room.questions[currentQuestionIndex].answers);
      //Check if Eveyrone has buzzed or not
      let allAnswered = true;
      room.users.forEach((user) => {
        if (!user.buzzed) {
          allAnswered = false;
          return;
        }
      });

      //B. if All Buzzed, then start emitting new question, otherwise do nothing
      if (allAnswered) {
        await newQuestion(room);
      }
    }
  };

  const newQuestion = async (room) => {
    //0. Pre-conditions to check if room is done
    const currentQuestionIndex = room.questionsStartTime.length - 1;
    if (currentQuestionIndex > -1 && currentQuestionIndex == room.questions.length - 1) {
      //make sure room has not started yet either...
      await gameEnd(room);
      return;
    }
    //1. Send new question data! In the future, do this in small chunks, for now just do chunks on client-side
    console.log(room._id.toString());
    io.to(room._id.toString()).emit("game:newQuestion", { questionText: room.questions[currentQuestionIndex + 1].question, questionNumber: currentQuestionIndex + 1 + 1 });

    //2. start question timer immediately
    room.questionsStartTime.push(new Date()); //start officially now;
    await room.save();
  };

  const currentQuestion = async (room) => {
    //1. Send new question data! In the future, do this in small chunks, for now just do chunks on client-side
    io.to(room._id.toString()).emit("game:currentQuestion", { questionText: room.questions[currentQuestionIndex + 1].question, questionNumber: currentQuestionIndex + 1 });
  };

  const gameEnd = async (room) => {
    //0. presumed that room validation is done beforehand
    //1. Update Room state
    room.ongoing = false;
    await room.save();
    //2. Update socket events
    io.to(room._id.toString()).emit("game:end");
  };

  const startGame = async ({ _id }) => {
    const userID = socket.handshake.auth.userID;
    try {
      //1. Find & Validate User And Room
      const userStarting = await User.findOne({ userID: userID });
      if (!userStarting.room) return; //user is not in ANY room
      const roomStarting = await Room.findOne({ _id: userStarting.room });

      //1B. Make sure this user is the leader!
      if (roomStarting.roomLeader != userID) {
        socket.emit("error", new AppError("You are not the room leader", "socket"));
        return;
      }

      //2. Update Room Setitngs
      if (roomStarting) roomStarting.started = true;
      const roomStarted = await roomStarting.save();

      //4. Update socket
      io.to(userStarting.room.toString()).emit("game:started");

      //5. Start new question for users
      await newQuestion(roomStarted);
    } catch (error) {
      console.error(error);
      socket.emit("error", new AppError(error.toString(), "socket"));
    }
  };

  //server listeners
  socket.on("game:answer", gameAnswer);
  socket.on("game:answering", gameAnswering);
  socket.on("game:buzz", gameBuzz);
  socket.on("game:start", startGame);
  socket.on("game:question", currentQuestion);
};
