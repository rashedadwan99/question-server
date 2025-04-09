const express = require("express");
const Answer = require("../models/AnswerModel");
const Question = require("../models/questionModel");
const {
  sendAnswer,
  getUserAnswers,
  getOneAnswer,
  updateAnswer,
  deleteAnswer,
} = require("../controllers/answersController");

const router = express.Router();

router.post("/", sendAnswer);

router.get("/", getUserAnswers);

router.get("/:id", getOneAnswer);

router.put("/:id", updateAnswer);

router.delete("/:id", deleteAnswer);

module.exports = router;
