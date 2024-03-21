const mongoose = require("mongoose");
const { Room, roomUserSchema } = require("../../models/roomsModel");
const { User } = require("../../models/usersModel");
const { Question } = require("../../models/questionsModel");
const AppError = require("../../utils/AppError");

module.exports = async (socket, io) => {
  const gameBuzz = async (_id) => {
    const userID = socket.handshake.auth.userID;
    try {
      //1. Broadcast buzz state to everyone else
      socket.broadcast.to(_id).emit("game:buzzed", { state: "buzz", answer: "", username: socket.handshake.auth.username, date: new Date() });
      //2. update room data
      const roomBuzzing = await Room.findById(_id);
      const temp = roomBuzzing.users.get(userID);
      temp.buzzed = true;
      roomBuzzing.users.set(userID, temp);
      await roomBuzzing.save();
    } catch (error) {
      console.error(error);
      socket.emit("error", new AppError(error.toString(), "socket"));
    }
  };

  const gameAnswering = async ({ currentAnswer, _id }) => {
    try {
      //1. Emit User Input Live to Everyone Else!
      const userID = socket.handshake.auth.userID;
      socket.broadcast.to(_id).emit("game:answering", { state: "buzz", answer: currentAnswer, username: socket.handshake.auth.username, date: new Date() });
    } catch (error) {
      console.error(error);
    }
  };

  const checkAnswer = async (userAnswer, correctAnswers) => {
    //Try and be as accurate as possible
    correctAnswers.forEach((correctAnswer) => {
      if (correctAnswer.toLowerCase() == userAnswer.toLowerCase()) {
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
    const correct = checkAnswer(answer, room.questions[currentQuestionIndex].answers);
    //3. Continue based on correctness
    if (correct == true) {
      //A. emit user answer and then acceptable, correct answers
      // socket.emit("game:correct", answer);
      io.to(room._id.toString()).emit("game:correct", { state: "correct", answer: answer, username: socket.handshake.auth.username, date: new Date() });
      io.to(room._id.toString()).emit("game:actualAnswer", room.questions[currentQuestionIndex].answers);
      //B. update scoreboard
      let updatedUsersMap = room.users.get(userID);
      updatedUsersMap.score = room.users.get(userID).score + 1;
      room.users.set(userID, updatedUsersMap);
      const updatedRoom = await room.save();
      io.to(updatedRoom._id.toString()).emit("room:update", updatedRoom.users);
      //C. emit new quesiton
      await newQuestion(updatedRoom); //this is mongoose document object
    } else {
      // socket.emit("game:wrong", answer);
      io.to(room._id.toString()).emit("game:wrong", { state: "wrong", answer: answer, username: socket.handshake.auth.username, date: new Date() });
      //Check if everyone has buzzed or not
      let allAnswered = true;
      room.users.forEach((value, key) => {
        console.log(value);
        if (!value.buzzed) {
          allAnswered = false;
          return;
        }
      });

      //A. Emit correct answer
      if (allAnswered) {
        io.to(room._id.toString()).emit("game:actualAnswer", room.questions[currentQuestionIndex].answers);
        await setTimeout(async function () {}, 2000);
        await newQuestion(room);
      } else {
        //only reset buzz for those who have not buzzed this round yet!
        // for (let [userID, userState] of room.users) {
        //   if (userState.buzzed = false) {
        //   }
        // }
        socket.broadcast.to(room._id.toString()).emit("game:resetBuzz");
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
    //1. Reset all buzz states
    for (let [userID, userState] of room.users) {
      let newUserState = userState;
      newUserState.buzzed = false;
      room.users.set(userID, newUserState);
    }
    await room.save();
    io.to(room._id.toString()).emit("game:resetBuzz");
    //1. Send new question data! In the future, do this in small chunks, for now just do chunks on client-side
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
