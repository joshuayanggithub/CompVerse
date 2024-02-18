const mongoose = require("mongoose");
const Room = require("../models/roomsModel");
const User = require("../models/usersModel");

exports.createRoom = async (req, res, next) => {
  const userID = req.query.userID; //actual user MUST HAVE CREATED ROOM
  try {
    const user = await User.exists({ userID });
    if (user == null) throw new Error("UserID Does not Exist!");
    let roomData = req.body;
    // console.log(roomData);
    roomData.users = [];
    roomData.users.push(userID);
    const room = await Room.create(roomData);
    res.status(200).json({
      status: "success",
      data: {
        room,
      },
    });
  } catch (error) {
    // console.error(error);
    res.status(400).json({
      status: "fail",
      data: { error: error.message },
    });
  }
};

exports.getAllRooms = async (req, res, next) => {
  //should only get all rooms that are active
  try {
    const rooms = await Room.find({ ongoing: true });
    res.status(200).json({
      status: "success",
      data: {
        rooms,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      data: { error },
    });
  }
};

exports.getRoom = async (req, res, next) => {
  try {
    const room = await Room.find({ _id: req.params.roomID });
    res.status(200).json({
      status: "success",
      data: {
        room,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      data: { error },
    });
  }
};
