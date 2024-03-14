const mongoose = require("mongoose");
const { Schema } = mongoose;

//each schema maps to a MongoDB collection
const questionSchema = new Schema({
  year: Date, //possibly only one year
  questionAuthor: String, //maybe optional
  competition: {
    //mathcounts, science bowl, QuizBowl
    type: String,
    required: [true, "Must have a competition type!"],
  },
  questionSource: {
    //e.g. Set 1
    type: String,
    required: [true, "Must have a source; Don't plagiarize!"],
  },
  questionCategory: {
    //math, history
    type: String,
  },
  questionType: {
    //short answer or multiple choice
    type: String,
    required: [true, "Must have a quesiton type"],
  },
  question: {
    //question string itself
    type: String,
    required: [true, "Must have a question type!"],
  },
  answers: {
    //aray of possible answers
    type: [String],
    required: [true, "Must have an answer!"],
  },
  answerDescription: [String],
});

const Question = mongoose.model("Question", questionSchema);

module.exports = { Question, questionSchema };
