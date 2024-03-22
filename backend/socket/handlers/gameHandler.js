const mongoose = require("mongoose");
const { Room, roomUserSchema } = require("../../models/roomsModel");
const { User } = require("../../models/usersModel");
const { Question } = require("../../models/questionsModel");
const AppError = require("../../utils/AppError");

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = async (socket, io) => {
  const gameBuzz = async (_id) => {
    const userID = socket.handshake.auth.userID;
    try {
      //1. Broadcast buzz state to everyone else, and stop question stagger for everybody!
      socket.broadcast.to(_id).emit("game:buzzed", { state: "buzz", answer: "", username: socket.handshake.auth.username, date: new Date() });
      io.to(_id).emit("game:pauseQuestion");
      //2. Update room data of users to reflect updated buzz state
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
      //1. Emit User Input Live to Everyone Including Yourself!
      const userID = socket.handshake.auth.userID;
      socket.to(_id).emit("game:answering", { state: "buzz", answer: currentAnswer, username: socket.handshake.auth.username, date: new Date() });
    } catch (error) {
      console.error(error);
    }
  };

  const checkAnswer = (userAnswer, correctAnswers) => {
    //Simple check algorithm
    let correctness = false;
    correctAnswers.forEach((correctAnswer) => {
      if (correctAnswer.toLowerCase().replaceAll(" ", "") == userAnswer.toLowerCase().replaceAll(" ", "")) {
        correctness = true;
        return true;
      }
    });
    return correctness;
  };

  const gameAnswer = async (answer) => {
    //1. Fetch User and Room Object from database
    const userID = socket.handshake.auth.userID;
    const userAnswering = await User.findOne({ userID: userID });
    const room = await Room.findOne({ _id: userAnswering.room });
    //1. Check User Answer with correct answer stored in room object's questions list
    const currentQuestionIndex = room.questionsStartTime.length - 1;
    const correct = checkAnswer(answer, room.questions[currentQuestionIndex].answers);
    //2A. If Correct
    if (correct == true) {
      //1. emit that user answer is correct, followed by all accepted answers
      io.to(room._id.toString()).emit("game:correct", { state: "correct", answer: answer, username: socket.handshake.auth.username, date: new Date() });
      io.to(room._id.toString()).emit("game:actualAnswer", room.questions[currentQuestionIndex].answers);
      //2. update scoreboard in rooms database
      let updatedUser = room.users.get(userID);
      updatedUser.score = room.users.get(userID).score + 1;
      room.users.set(userID, updatedUser);
      const updatedRoom = await room.save();
      //3. emit updated scoreboard
      io.to(updatedRoom._id.toString()).emit("room:update", updatedRoom.users);
      //4. emit new quesiton after a slight delay
      await timeout(1000);
      await newQuestion(updatedRoom); //this is mongoose document object
    } else {
      //1. emit that user answer is wrong
      io.to(room._id.toString()).emit("game:wrong", { state: "wrong", answer: answer, username: socket.handshake.auth.username, date: new Date() });
      //2. Check if everyone has buzzed or not
      let allAnswered = true;
      room.users.forEach((value, key) => {
        if (!value.buzzed) {
          allAnswered = false;
          return;
        }
      });
      //2A. If everyone has buzzed
      if (allAnswered) {
        //1. emit all accepted answers
        io.to(room._id.toString()).emit("game:actualAnswer", room.questions[currentQuestionIndex].answers);
        //2. emit new question data
        await timeout(1000);
        await newQuestion(room);
      } else {
        //only reset buzz for those who have not buzzed this round yet!
        for (let [userID, userState] of room.users) {
          if ((userState.buzzed = false)) {
            io.to(userID).emit("game:resetBuzz");
          }
        }
        io.to(room._id.toString()).emit("game:resumeQuestion");
        // socket.broadcast.to(room._id.toString()).emit("game:resetBuzz");
      }
    }
  };

  const newQuestion = async (room) => {
    try {
      //0. Pre-conditions to check if room is done
      const currentQuestionIndex = room.questionsStartTime.length;
      if (currentQuestionIndex > 0 && currentQuestionIndex == room.questions.length) {
        //make sure room has not started yet either...
        await gameEnd(room);
        return;
      }
      await timeout(500);
      //1. Reset all buzz states
      for (let [userID, userState] of room.users) {
        let newUserState = userState;
        newUserState.buzzed = false;
        room.users.set(userID, newUserState);
      }
      //1. Send new question data! In the future, no need to emit in chunks, it will be so annoying to do so
      io.to(room._id.toString()).emit("game:newQuestion", {
        questionText: room.questions[currentQuestionIndex].question,
        questionNumber: currentQuestionIndex + 1,
        questionCategories: room.questions[currentQuestionIndex].questionCategory,
        questionType: room.questions[currentQuestionIndex].questionType,
      });
      //2. start question timer immediately
      room.questionsStartTime.push(new Date()); //start officially now;
      await room.save();
    } catch (error) {
      console.error(error);
    }
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
