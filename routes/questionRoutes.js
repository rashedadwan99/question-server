const express = require("express");
const Question = require("../models/questionModel");
const {
  sendQuestion,
  getQuestions,
  getSingleQuestion,
  updateQuestion,
  deleteQuestion,
} = require("../controllers/questionsController");
const { auth } = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, sendQuestion);

router.get("/", auth, getQuestions);

router.get("/:id", auth, getSingleQuestion);

router.put("/:id", auth, updateQuestion);

router.delete("/:id", auth, deleteQuestion);

module.exports = router;
