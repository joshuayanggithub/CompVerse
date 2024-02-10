const mongoose = require("mongoose");
const User = require("../models/usersModel");

exports.updateUsername = async (req, res, next) => {
  const user = await User.updateOne({ userID: req.params.userID });

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
};
