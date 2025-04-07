const express = require("express");
const {
  submitAnswer,
  getAnswers,
} = require("../controllers/UserAnswerController");
const router = express.Router();

router.post("/submit", submitAnswer);
router.get("/user/:userId", getAnswers);

module.exports = router;
