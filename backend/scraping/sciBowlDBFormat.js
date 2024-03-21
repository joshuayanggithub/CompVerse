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
  const multipleChoices = await Question.find({ competition: "Science Bowl", questionType: "Multiple Choice" });
  await multipleChoices.forEach(async function (item, index) {
    const answerString = multipleChoices[index].answers[0]; // "W) sadfjkasdf"
    const letterAnswer = answerString.substring(0, 1);
    const stringAnswer = answerString.substring(3, answerString.length);
    multipleChoices[index].answers = [letterAnswer, stringAnswer];
    await multipleChoices[index].save();
  });
  console.log(multipleChoices);
};

const formatFRQ = async () => {
  //THIS WILL NEVER BE PREFECT
  //E.G. CANOLA OIL (ACCEPT: CANOLA)
  const frq = await Question.find({ competition: "Science Bowl", questionType: "Short Answer" });
  await frq.forEach(async function (item, index) {
    const answerString = frq[index].answers[0]; // "CANOLA OIL (ACCEPT: CANOLA)" and "CANOLA OIL (DO NOT ACCEPT: CANOLA)" Semicolon cases are too hard!!!
    //2 POLAR NUCLEI (ACCEPT: 2 OR BOTH POLAR NUCLEI or POLAR NUCLEI) (DO NOT ACCEPT: POLAR NUCLEUS)
    if (frq[index].questionCategory[0] != "MATH" && answerString.toLowerCase().includes("(accept") && !answerString.includes(";")) {
      const leftParenIndex = answerString.toLowerCase().indexOf("(accept");
      frq[index].answers = [answerString.substring(0, leftParenIndex - 1)];

      const regExp = /\(([^)]+)\)/g;
      let matches = answerString.match(regExp);
      if (matches == null) {
      } else {
        matches.forEach((match) => {
          let formatted = match.substring(8, match.length - 1);
          if (formatted[0] == " ") {
            formatted = formatted.substring(1, formatted.length);
          }
          frq[index].answers.push(formatted);
        });
      }

      console.log(answerString);
      console.log(frq[index].answers);
      await frq[index].save();
    }
  });
  // console.log(frq);
  process.exit();
};

formatFRQ();
