const path = require("path");
const express = require("express");

const app = express();

app.use(express.static(path.join(__dirname, "public"))); //set static folder to public

app.get("/", (req, res) => {
  res.send("Hello world");
});

module.exports = app;
