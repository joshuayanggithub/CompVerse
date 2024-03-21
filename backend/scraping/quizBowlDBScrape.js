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
  const res = await fetch("https://qbreader.org/api/query?questionType=tossup&maxReturnLength=10000");
  const quizBowlQuestions = await res.json();
  const tossups = quizBowlQuestions["tossups"]["questionArray"];
  // const bonuses = quizBowlQuestions["bonuses"]["questionArray"];
  // console.log(tossups, bonuses);

  let formattedQuestions = [];

  // console.log(Object.values(sciBowlQuestions["questions"]));

  for (const k in Object.keys(tossups)) {
    let question = tossups[k];
    // console.log(question);
    let formattedQuestion = {};

    formattedQuestion["competition"] = "Quiz Bowl";
    formattedQuestion["questionSource"] = question.setName;
    formattedQuestion["questionCategory"] = [question.category, question.subcategory];
    formattedQuestion["questionType"] = question.type;
    formattedQuestion["question"] = question.question;
    formattedQuestion["difficulty"] = question.difficulty;

    // if (question.answer.includes("[")) {
    //   formattedQuestion["answers"] = [question.answer.substring(0, question.answer.indexOf("[") - 1), question.answer.substring(question.answer.indexOf("[") + 1, question.answer.length - 1)];
    // } else {
    //   formattedQuestion["answers"] = [question.answer];
    // }

    formattedQuestion["answers"] = [question.answer]; //lets format later

    formattedQuestions.push(formattedQuestion);
  }

  console.log(formattedQuestions);
  try {
    let response = await Question.insertMany(formattedQuestions);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
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

//node scraping/quizBowlDBScrape.js --import

/*
{
    "_id": "63bba672874e0ef7dd7b22c2",
    "question": "These objects are often underlain by Röthlisberger or Nye channels. In one form, their movement is almost entirely controlled by Glen’s Flow Law. Warm ones can also move by enhanced creep, ploughing, and regelation, and both types can experience hydraulic jacking. Many of these objects experience quasi-regular surge cycles, where their movement speed can increase a thousand-fold. These objects create a range of characteristic landforms, including kames, eskers and drumlins. For 10 points, name this class of objects found in mountainous and polar regions around the world, made entirely of ice.", ---> question
    "formatted_answer": "<b><u>Glacier</u></b>s (accept <b><u>Ice Streams</u></b>; do not accept “Ice Sheets”)",
    "answer": "Glaciers (accept Ice Streams; do not accept “Ice Sheets”)", ----> answer
    "category": "Science", ---> category[0]
    "subcategory": "Other Science", ---> category[1]
    "packet": {
        "_id": "63bba672874e0ef7dd7b22be",
        "name": "05 - Ostentatious Hydromancy",
        "number": 5
    },
    "set": {
        "_id": "63bba672874e0ef7dd7b2218",
        "name": "2014 Oxford Open",
        "year": 2014,
        "standard": true
    },
    "setName": "2014 Oxford Open", ----> questionSource
    "type": "tossup", ----> questionType
    "packetNumber": 5,
    "questionNumber": 4,
    "createdAt": "2023-01-09T05:30:26.927Z",
    "updatedAt": "2023-04-09T06:00:05.528Z",
    "difficulty": 8, ---> difficulty
    "setYear": 2014,
    "packetName": "05 - Ostentatious Hydromancy",
    "set_id": "63bba672874e0ef7dd7b2218",
    "packet_id": "63bba672874e0ef7dd7b22be",
    "alternate_subcategory": "Earth Science",
    "number": 4
}
*/
