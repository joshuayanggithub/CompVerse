const mongoose = require("mongoose");
const express = require("express");
const questionController = require("../controllers/questionController");

const router = new express.Router(); //use current route

router.route("").get(questionController.randomQuestion);
router.route("/:questionID").get(questionController.checkAnswer);

module.exports = router;
