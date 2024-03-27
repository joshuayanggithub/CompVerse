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
      //Broadcast "buzz-in" event from user, and pause question immediately
      socket.broadcast.to(_id).emit("game:buzzed", { state: "buzz", answer: "", username: socket.handshake.auth.username, date: new Date() });
      io.to(_id).emit("game:pauseQuestion");
      //Synchronize state of users in room with MongoDB db
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
      //Emit user input "answering" attempt live to all users
      const userID = socket.handshake.auth.userID;
      socket.to(_id).emit("game:answering", { state: "buzz", answer: currentAnswer, username: socket.handshake.auth.username, date: new Date() });
    } catch (error) {
      console.error(error);
    }
  };

  const checkAnswer = (userAnswer, correctAnswers) => {
    let correctness = false;
    correctAnswers.forEach((correctAnswer) => {
      if (correctAnswer.toLowerCase().replaceAll(" ", "") == userAnswer.toLowerCase().replaceAll(" ", "")) {
        correctness = true;
        return true;
      }
    });
    return correctness;
  };

  const gameNoAnswer = async () => {
    //Fetch user and room from database
    const userID = socket.handshake.auth.userID;
    const userAnswering = await User.findOne({ userID: userID });
    let roomGhosted = await Room.findOne({ _id: userAnswering.room });
    const currentQuestionIndex = roomGhosted.questionsStartTime.length - 1;
    //Synchronize state of users in room with MongoDB db
    const userGhosted = roomGhosted.users.get(userID);
    userGhosted.answered = true;
    roomGhosted.users.set(userID, userGhosted);
    roomGhosted = await roomGhosted.save();
  };

  const gameAnswer = async (answer, answerStartTime) => {
    try {
      //Fetch user and room object from database
      console.log(answer, answerStartTime);
      const userID = socket.handshake.auth.userID;
      const userAnswering = await User.findOne({ userID: userID });
      const room = await Room.findOne({ _id: userAnswering.room });
      //Check User Answer with correct answer stored in room object's questions list
      const currentQuestionIndex = room.questionsStartTime.length - 1;
      console.log(answerStartTime, room.questionsStartTime[room.questionsStartTime.length - 1]);
      if (answerStartTime < room.questionsStartTime[room.questionsStartTime.length - 1]) return;
      const correct = checkAnswer(answer, room.questions[currentQuestionIndex].answers);
      //2A. If Correct
      console.log(correct);
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
        io.to(room._id.toString()).emit("room:update");
        //5. Update User Stats for problems solved correctly
        userAnswering.problemsSolved = userAnswering.problemsSolved + 1;
        await userAnswering.save();
        //4. emit new quesiton after a slight delay
        await timeout(1000);
        await newQuestion(updatedRoom); //this is mongoose document object
      } else {
        //1. emit that user answer is wrong
        io.to(room._id.toString()).emit("game:wrong", { state: "wrong", answer: answer, username: socket.handshake.auth.username, date: new Date() });
        //2. Update that user has answered
        let updatedUser = room.users.get(userID);
        updatedUser.answered = true;
        room.users.set(userID, updatedUser);
        const updatedRoom = await room.save();
        //3. Check if everyone has answered or not
        let allAnswered = true;
        updatedRoom.users.forEach((user, key) => {
          if (!user.answered) {
            allAnswered = false;
            return;
          }
        });
        //2A. If everyone has answered
        if (allAnswered) {
          //1. emit all accepted answers
          io.to(updatedRoom._id.toString()).emit("game:actualAnswer", updatedRoom.questions[currentQuestionIndex].answers);
          //2. emit new question data
          await timeout(1000);
          await newQuestion(updatedRoom);
        } else {
          //only reset buzz for those who have not buzzed this round yet!
          for (let [userID, userState] of updatedRoom.users) {
            if (!userState.buzzed) {
              io.to(userID.toString()).emit("game:resetBuzz");
            }
          }
          io.to(updatedRoom._id.toString()).emit("game:resumeQuestion");
          // socket.broadcast.to(room._id.toString()).emit("game:resetBuzz");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const doneQuestion = async (room, originalIndex) => {
    try {
      // console.log(delayedRoom._id);
      let delayedRoom = await Room.findOne({ _id: room._id });
      const currentQuestionIndex = delayedRoom.questionsStartTime.length - 1;
      if (currentQuestionIndex != originalIndex) {
        console.log(currentQuestionIndex, originalIndex);
        return;
      }
      io.to(room._id.toString()).emit("game:doneQuestion");
      await timeout(3000);
      delayedRoom = await Room.findOne({ _id: delayedRoom._id });
      //2. Check if everyone has buzzed or not
      console.log(delayedRoom.users);
      let allAnswered = true;
      delayedRoom.users.forEach((user, key) => {
        if (!user.answered) {
          allAnswered = false;
          return;
        }
      });
      //2A. If everyone has buzzed
      if (allAnswered) {
        //1. emit all accepted answers
        io.to(delayedRoom._id.toString()).emit("game:actualAnswer", delayedRoom.questions[currentQuestionIndex].answers);
        //2. emit new question data
        await timeout(1000);
        await newQuestion(delayedRoom);
      }
    } catch (error) {
      console.error(error);
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
      io.to(room._id.toString()).emit("room:update");
      for (let [userID, userState] of room.users) {
        let newUserState = userState;
        newUserState.buzzed = false;
        newUserState.answered = false;
        room.users.set(userID, newUserState);
      }
      //1. Send new question data! In the future, need to emit in chunks, it will be so annoying to do so
      io.to(room._id.toString()).emit("game:newQuestion", {
        questionText: room.questions[currentQuestionIndex].question,
        questionNumber: currentQuestionIndex + 1,
        questionCategories: room.questions[currentQuestionIndex].questionCategory,
        questionType: room.questions[currentQuestionIndex].questionType,
      });
      //2. start question timer immediately
      room.questionsStartTime.push(new Date()); //start officially now;c
      await room.save();
      await setTimeout(
        function () {
          doneQuestion(room, currentQuestionIndex);
        },
        room.timePerQuestion * 1000,
        room,
        currentQuestionIndex
      );
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
    //3. Update User Stats - No issue with race events, since stats wont interfere with anything
    let userWon = { userID: "", score: -1 };
    for (let [userID, userState] of room.users) {
      //update matches played for all users
      const userToUpdate = await User.findOne({ userID });
      userToUpdate.matchesPlayed = userToUpdate.matchesPlayed + 1;
      await userToUpdate.save();
      //find the user who won with max score
      if (userState.score > userWon.score) {
        userWon = { userID: userID, score: userState.score };
      }
    }
    //update user who won only when there are multiple users by the end of the game
    if (room.users?.size > 1 && userWon.score != -1 && userWon.userID != "") {
      const userToUpdate = await User.findOne({ userID: userWon.userID });
      userToUpdate.gamesWon = userToUpdate.gamesWon + 1;
      await userToUpdate.save();
    }
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
  socket.on("game:noAnswer", gameNoAnswer); //basically gameAnswer but without anything
  socket.on("game:answering", gameAnswering);
  socket.on("game:buzz", gameBuzz);
  socket.on("game:start", startGame);
  socket.on("game:question", currentQuestion);
};
