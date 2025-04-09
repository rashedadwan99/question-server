const express = require("express");
const {
  getUserAnswers,
  submitAnswers,
  checkIfSubmitted,
  getAllUserIdentifiers,
} = require("../controllers/UserAnswerController");
const { auth } = require("../middleware/auth");
const router = express.Router();

router.post("/submit", submitAnswers);
router.get("/allAnswers", getUserAnswers);
router.get("/", auth, getAllUserIdentifiers);
router.get("/check", checkIfSubmitted);

module.exports = router;
