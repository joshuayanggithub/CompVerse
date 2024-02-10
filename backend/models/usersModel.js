const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    userID: Schema.Types.UUID,
    username: { type: String, required: "Must have valid username" },
    email: String,
    problemsSolved: { type: Number, default: 0 },
    gamesWon: { type: Number, default: 0 },
    matchesPlayer: { type: Number, default: 0 },
    rating: { type: Map, of: Number }, //map of different competitions
  },
  {
    timestamps: { createdAt: "userCreationDate" }, //mongoose handles createdAt and updatedAt; use custom name
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
