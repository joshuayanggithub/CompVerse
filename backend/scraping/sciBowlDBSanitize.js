const mongoose = require("mongoose");
const dotenv = require("dotenv");

const { Question } = require("../models/questionsModel");

dotenv.config({ path: "./config.env" });

let DB_Connection_String = process.env.DATABASE_STRING;
DB_Connection_String = DB_Connection_String.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);
DB_Connection_String = DB_Connection_String.replace("<DATABASE_NAME>", "db");

try {
  mongoose.connect(DB_Connection_String);
} catch (error) {
  console.log("MongoDB Connection Failed...");
}

const formatMCQ = async () => {
  const multipleChoices = await Question.find({ questionType: "Multiple Choice" });
  await multipleChoices.forEach(async function (item, index) {
    const answerString = multipleChoices[index].answers[0]; // "W) sadfjkasdf"
    const letterAnswer = answerString.substring(0, 1);
    const stringAnswer = answerString.substring(3, answerString.length);
    multipleChoices[index].answers = [letterAnswer, stringAnswer];
    await multipleChoices[index].save();
  });
  console.log(multipleChoices);
};

formatMCQ();
