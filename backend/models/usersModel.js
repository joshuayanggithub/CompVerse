const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    userID: {
      type: Schema.Types.UUID,
      required: "Must have uniuqe UUID",
      unique: true,
    },
    username: {
      type: String,
      required: "Must have valid, unique username",
      unique: true,
    },
    email: String,
    problemsSolved: { type: Number, default: 0 },
    gamesWon: { type: Number, default: 0 },
    matchesPlayer: { type: Number, default: 0 },
    online: { type: Boolean, default: false },
    rating: { type: Map, of: Number }, //map of different competitions
  },
  {
    toObject: { virtuals: true }, //save virtuals after query i.e. findOne
    toJSON: { virtuals: true },
    timestamps: { createdAt: "userCreationDate" }, //mongoose handles createdAt and updatedAt; use custom name
  }
);

userSchema.virtual("userIDString").get(function () {
  return this.userID.toString();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
