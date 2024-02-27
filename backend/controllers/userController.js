const mongoose = require("mongoose");
const { User } = require("../models/usersModel");
const { v4: uuidv4 } = require("uuid");
const usernameGenerator = require("unique-username-generator");

exports.updateUsername = async (req, res, next) => {
  //not everybody should be able to update username; validate the user itself with userID (that is available in localStorage)
  try {
    const user = await User.findOne({ userID: req.params.userID });
    user.username = req.body.username;
    const response = await user.save();
    res.status(200).json({
      status: "success",
      data: {
        response,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      data: {
        error,
      },
    });
  }
};

exports.checkUsername = async (req, res, next) => {
  const user = await User.findOne({ username: req.query.username });
  let exists = user != null;
  res.status(200).json({
    status: "success",
    data: {
      exists,
    },
  });
};

exports.getUser = async (req, res, next) => {
  try {
    let user = await User.findOne({ ...req.params, ...req.query });
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      data: {
        error,
      },
    });
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    let users = await User.find(req.query);
    res.status(200).json({
      status: "success",
      data: {
        users,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      data: {
        error,
      },
    });
  }
};

exports.createUser = async (req, res, next) => {
  try {
    if (!req.body.username) req.body.username = usernameGenerator.generateUsername();
    if (!req.body.userID) req.body.userID = uuidv4();
    const user = await User.create(req.body);
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      data: { error },
    });
  }
};

exports.getUserStats = async (req, res, next) => {
  try {
    const stats = await User.aggregate([
      {
        $group: {
          _id: 0,
          problemsSolved: { $sum: "$problemsSolved" },
          gamesPlayed: { $sum: "$gamesPlayed" },
        },
      },
    ]);
    res.status(200).json({
      status: "success",
      data: {
        stats,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      data: {
        error,
      },
    });
  }
};
