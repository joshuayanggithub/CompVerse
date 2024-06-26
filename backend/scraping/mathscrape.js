const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");

const { Question } = require("../models/questionsModel");

dotenv.config();

let DB_Connection_String = process.env.DATABASE_STRING;
DB_Connection_String = DB_Connection_String.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);
DB_Connection_String = DB_Connection_String.replace("<DATABASE_NAME>", "db");

try {
  mongoose.connect(DB_Connection_String);
} catch (error) {
  console.log("MongoDB Connection Failed...");
}

const questions = JSON.parse(fs.readFileSync("./backend/scraping/2023_MathCount_Chapter.json", "utf8"));

for (k in questions) {
  let question = questions[k];
  let formatted = {};
  formatted.question = question.question;
  formatted.questionType = "Short Answer";
  formatted.answers = [question.answer];
  formatted.questionSource = "2023 Chapter";
  formatted.competition = "Mathcounts";
  formatted.questionCategory = ["Countdown"];
  Question.create(formatted);
}
