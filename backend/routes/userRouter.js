const express = require("express");
const usersController = require("../controllers/usersController");

const router = new express.Router({ mergeParams: true });

router.route("/:userID").patch(usersController.updateUsername);

module.exports = router;
