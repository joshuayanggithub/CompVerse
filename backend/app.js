const path = require("path");
const express = require("express");

const app = express();

const userRouter = require("./routes/userRouter");

app.use(express.static(path.join(__dirname, "public"))); //set static folder to public

app.use("/users", userRouter);

module.exports = app;
