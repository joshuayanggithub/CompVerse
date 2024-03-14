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

const importData = async () => {
  const res = await fetch("https://qbreader.org/api/query");
  const quizBowlQuestions = await res.json();
  const tossups = quizBowlQuestions["tossups"]["questionArray"];
  const bonuses = quizBowlQuestions["bonuses"]["questionArray"];

  console.log(tossups, bonuses);

  let formattedSciBowlQuestions = [];

  // console.log(Object.values(sciBowlQuestions["questions"]));

  // for (const k in Object.keys(sciBowlQuestions["questions"])) {
  //   let question = sciBowlQuestions["questions"][k];
  //   // console.log(question);
  //   let formattedQuestion = {};

  //   formattedQuestion["competition"] = "Science Bowl";
  //   formattedQuestion["questionSource"] = question.source;
  //   formattedQuestion["questionCategory"] = question.category;
  //   formattedQuestion["questionType"] = question.bonus_format;
  //   formattedQuestion["question"] = question.bonus_question;
  //   formattedQuestion["answers"] = [question.bonus_answer];

  //   let formattedQuestion2 = {};

  //   formattedQuestion2["competition"] = "Science Bowl";
  //   formattedQuestion2["questionSource"] = question.source;
  //   formattedQuestion2["questionCategory"] = question.category;
  //   formattedQuestion2["questionType"] = question.tossup_format;
  //   formattedQuestion2["question"] = question.tossup_question;
  //   formattedQuestion2["answers"] = [question.tossup_answer];

  //   formattedSciBowlQuestions.push(formattedQuestion);
  //   formattedSciBowlQuestions.push(formattedQuestion2);
  // }

  // // console.log(formattedSciBowlQuestions);
  // try {
  //   let response = await Question.insertMany(formattedSciBowlQuestions);
  //   console.log(response);
  // } catch (error) {
  //   console.log(error);
  // }
  process.exit();
};

const deleteData = async () => {
  try {
    let response = await Question.deleteMany();
    console.log("data successfully deleted");
    console.log(response);
  } catch {
    console.log("error");
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  //node path [argument value]
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}

/*
"bonus_answer": "Newton", ->  answer
"bonus_format": "Short Answer" -> questionType
"bonus_question": "What is the SI unit of force?", -> question
"category": "PHYSICS", ->  questionCategory
"id": 5196,
"search_vector": "'forc':16 'kg':9 'kilogram':8 'mass':7 'metric':4 'newton':17 'si':13 'unit':5,14",
"source": "16Exchange-Stuy-Physics", -> questionSource 
"tossup_answer": "Kilogram (kg)", -> answer
"tossup_format": "Short Answer", -> questionType
"tossup_question": "What is the metric unit for mass?", -> question
*/
