const mongoose = require("mongoose");
const { userSchema } = require("./usersModel");
const { questionSchema } = require("./questionsModel");
const { Schema } = mongoose;

const opts = { toJSON: { virtuals: true } };

//rooms -> room:join, room:leave, room:disconnect, room:create, room:buzz, room:answer,
const roomUserSchema = new Schema({
  username: { type: String, required: true },
  score: { type: Number, required: true },
  buzzed: { type: Boolean, required: true },
  answered: { type: Boolean, required: true },
  join: { type: Date, required: true },
});

const roomSchema = new Schema(
  {
    roomName: { type: String, required: true },
    // roomSettings: { type: Schema.Types.ObjectId, ref: "User" },
    users: {
      type: Map, //MAP HAS TO HAVE KEY STRING
      of: roomUserSchema,
      //    of: { username: { type: String, required: true }, score: { type: Number, required: true }, buzzed: { type: Boolean, required: true }, join: { type: Date, required: true } },
      required: true,
    }, //userIDString -> {username, score, buzzed, answered}
    roomLeader: { type: Schema.Types.UUID, required: true },
    gameLength: { type: Number, required: true },
    timePerQuestion: { type: Number, required: true },
    questions: { type: [questionSchema], required: false }, //separate request should fill in questions
    questionsStartTime: { type: [Date], required: false }, //
    competition: { type: String, required: true },
    started: { type: Boolean, default: false },
    ongoing: { type: Boolean, default: true },
  },
  opts
);

roomSchema.virtual("roomLeaderString").get(function () {
  return this.roomLeader.toString();
});
const Room = mongoose.model("Room", roomSchema);

module.exports = { Room, roomUserSchema, roomSchema };
