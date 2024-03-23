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
    matchesPlayed: { type: Number, default: 0 },
    online: { type: Boolean, default: false },
    room: { type: Schema.Types.ObjectId },
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

userSchema.virtual("starRating").get(function () {
  let score = this.problemsSolved + this.gamesWon * 5;
  if (score >= 200) {
    return 5;
  } else if (score >= 100) {
    return 4;
  } else if (score >= 50) {
    return 3;
  } else if (score >= 20) {
    return 2;
  } else {
    return 1;
  }
});

const User = mongoose.model("User", userSchema);

module.exports = { User, userSchema };
