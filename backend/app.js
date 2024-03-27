const path = require("path");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRouter = require("./routes/userRouter");
const roomRouter = require("./routes/roomRouter");
const questionRouter = require("./routes/questionRouter");
const dotenv = require("dotenv");

const app = express();

dotenv.config();

app.use(express.json()); // <==== parse request body as JSON
app.use(cors());
// app.use(express.static(path.join(__dirname, "public"))); //set static folder to public

app.use("/api/user", userRouter);
app.use("/api/question", questionRouter);
app.use("/api/room", roomRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html")));
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

module.exports = app;
