const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  userID: Number,
  username: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
