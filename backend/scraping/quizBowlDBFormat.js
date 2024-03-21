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

const formatFRQ = async () => {
  //THIS WILL NEVER BE PREFECT
  //E.G. (ortho)phosphate [accept P O43– [“P O 4, 3 minus”] or P O4–3 [“P O 4 minus 3”]]
  const frq = await Question.find({ competition: "Quiz Bowl" });
  await frq.forEach(async function (item, index) {
    const answerString = frq[index].answers[0];

    if (answerString.indexOf(" [") != -1) {
      frq[index].answers = [answerString.substring(0, answerString.indexOf(" ["))];

      const regExp = /\[([^)]+)\]/g;
      let matches = answerString.match(regExp);
      if (matches == null) {
      } else {
        // console.log(matches);
        matches.forEach((match) => {
          if (match.includes("[or")) {
            frq[index].answers.push(match.substring(4, match.length - 1));
          } else if (match.includes("[accept")) {
            frq[index].answers.push(match.substring(8, match.length - 1));
          } else {
            frq[index].answers.push(match.substring(1, match.length - 1));
          }
        });

        await frq[index].save();
      }
    }
  });
  // console.log(frq);
};

formatFRQ().then((foo) => process.exit());
