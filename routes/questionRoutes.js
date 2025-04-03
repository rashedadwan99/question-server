const express = require("express");
const Question = require("../models/questionModel");
const {
  sendQuestion,
  getQuestions,
  getSingleQuestion,
  updateQuestion,
  deleteQuestion,
} = require("../controllers/questionsController");

const router = express.Router();

router.post("/", sendQuestion);

router.get("/", getQuestions);

router.get("/:id", getSingleQuestion);

router.put("/:id", updateQuestion);

router.delete("/:id", deleteQuestion);

module.exports = router;
