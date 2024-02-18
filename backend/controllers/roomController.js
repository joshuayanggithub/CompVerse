const mongoose = require("mongoose");
const Room = require("../models/roomsModel");

exports.createRoom = async (req, res, next) => {
  try {
    const room = await Room.create(req.body);
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
