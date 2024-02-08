const mongoose = require("mongoose");
const { Schema } = mongoose;

//each schema maps to a MongoDB collection
const questionSchema = new Schema({
  year: Date, //possibly only one year
  questionAuthor: String, //maybe optional
  competition: {
    type: String,
    required: [true, "Must have a competition type!"],
  },
  questionSource: {
    type: String,
    required: [true, "Must have a source; Don't plagiarize!"],
  },
  questionCategory: {
    type: String,
    required: [true, "Must have a category!"],
  },
  questionType: {
    type: String,
    required: [true, "Must have a quesiton type"],
  },
  question: {
    type: String,
    required: [true, "Must have a question type!"],
  },
  answer: {
    type: String,
    required: [true, "Must have an answer!"],
  },
  answerDescription: [String],
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
