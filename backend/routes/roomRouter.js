const mongoose = require("mongoose");
const express = require("express");
const roomController = require("../controllers/roomController");

const router = new express.Router();

router.route("").post(roomController.createRoom).get(roomController.getAllRooms);

router.route("/:roomID").get(roomController.getRoom);

module.exports = router;
