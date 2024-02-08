const path = require("path");
const express = require("express");

const app = express();

app.use(express.static(path.join(__dirname, "public"))); //set static folder to public

app.get("/", (req, res) => {
  res.send("App started");
});

module.exports = app;
