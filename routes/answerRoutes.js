const express = require("express");
const Answer = require("../models/AnswerModel");
const Question = require("../models/questionModel");
const {
  sendAnswer,
  getAnswers,
  getOneAnswer,
  updateAnswer,
  deleteAnswer,
} = require("../controllers/answersController");

const router = express.Router();

router.post("/", sendAnswer);

router.get("/", getAnswers);

router.get("/:id", getOneAnswer);

router.put("/:id", updateAnswer);

router.delete("/:id", deleteAnswer);

module.exports = router;
