const express = require("express");
const { registerUser, loginUser } = require("../controllers/userController");
const router = express.Router();
router.route("/register").get(registerUser);
router.route("/login").get(loginUser);
module.exports = router;
