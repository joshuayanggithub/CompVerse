const mongoose = require("mongoose");
const express = require("express");
const questionController = require("../controllers/roomController");

const router = new express.Router();

router.route("/room").post(questionController.createRoom);

module.exports = router;
