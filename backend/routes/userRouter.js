const express = require("express");
const userController = require("../controllers/userController");

const router = new express.Router(); //use current route

router.route("").post(userController.createUser).get(userController.getAllUsers);

router.route("/username").get(userController.checkUsername);

router.route("/user-stats").get(userController.getUserStats);

router.route("/:userID").get(userController.getUser).patch(userController.updateUsername);

module.exports = router;
