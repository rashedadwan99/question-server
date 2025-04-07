const Question = require("../models/questionModel");
const UserAnswer = require("../models/UserAnswer");

const submitAnswer = async (req, res) => {
  try {
    const {
      universityNumber,
      name,
      questionId,
      selectedChoice,
      filledAnswer,
      matchingAnswer,
    } = req.body;

    // Check if this universityNumber already answered the question
    const alreadyAnswered = await UserAnswer.findOne({
      universityNumber,
      question: questionId,
    });
    if (alreadyAnswered) {
      return res.status(400).json({
        message: "You have already submitted an answer for this question.",
      });
    }

    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    let isCorrect = false;

    if (question.type === "multiple" && selectedChoice) {
      isCorrect = question.correctChoice === selectedChoice;
    } else if (question.type === "filling" && filledAnswer) {
      isCorrect =
        question.correctAnswer.trim().toLowerCase() ===
        filledAnswer.trim().toLowerCase();
    } else if (question.type === "matching" && matchingAnswer?.length) {
      const correctPairs = question.matchingPairs || [];
      isCorrect = matchingAnswer.every((pair, idx) => {
        return (
          pair.left === correctPairs[idx]?.left &&
          pair.right === correctPairs[idx]?.right
        );
      });
    }

    const newAnswer = new UserAnswer({
      universityNumber,
      name,
      question: questionId,
      selectedChoice,
      filledAnswer,
      matchingAnswer,
      isCorrect,
    });

    await newAnswer.save();
    res
      .status(201)
      .json({ message: "Answer submitted successfully", isCorrect });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Duplicate submission not allowed." });
    }
    res.status(500).json({ error: error.message });
  }
};
const getAnswers = async (req, res) => {
  try {
    const { universityNumber, questionId } = req.query;

    const query = {};
    if (universityNumber) query.universityNumber = universityNumber;
    if (questionId) query.question = questionId;

    const answers = await UserAnswer.find(query).populate("question");
    res.json(answers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  submitAnswer,
  getAnswers,
};
