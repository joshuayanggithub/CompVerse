const mongoose = require("mongoose");
const { Schema } = mongoose;

const roomSchema = new Schema({
  roomName: { type: String, required: true },
  // roomSettings: { type: Schema.Types.ObjectId, ref: "User" },
  users: { type: Array },
  started: { type: Boolean, default: false },
  ongoing: { type: Boolean, default: true },
  scoreBoard: { type: Array },
  // problemList: [{ type: Schema.Types.ObjectId, ref: "Problem" }],
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
