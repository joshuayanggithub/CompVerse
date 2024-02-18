const path = require("path");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRouter = require("./routes/userRouter");
const questionRouter = require("./routes/questionRouter");

const app = express();

app.use(express.json()); // <==== parse request body as JSON
app.use(cors());
app.use(express.static(path.join(__dirname, "public"))); //set static folder to public

app.use("/api/user", userRouter);
app.use("/api/question", questionRouter);

module.exports = app;
