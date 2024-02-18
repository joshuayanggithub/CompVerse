const mongoose = require("mongoose");
const Question = require("../models/questionsModel");

exports.randomQuestion = async (req, res, next) => {
  console.log(req.query);
  try {
    const randQuestion = await Question.find({
      competition: req.query.competition,
    });
    res.status(200).json({
      status: "success",
      data: {
        randQuestion,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      data: error,
    });
  }
};

exports.checkAnswer = async (req, res, next) => {
  const userAnswerString = req.query.answer;
  let questionAnswerString = await Question.findById(req.params.questionID);
  if (req.query.questionType == "Multiple Choice") {
    questionAnswerString = questionAnswerString["answer"][0].toLowerCase();
  }
  let correct = questionAnswerString == userAnswerString;
  res.status(200).json({
    status: "success",
    data: {
      correct,
    },
  });
};
