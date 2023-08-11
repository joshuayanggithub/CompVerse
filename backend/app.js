const express = require("express");

const app = express();

module.exports = app;

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});
