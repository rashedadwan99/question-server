const Question = require("../models/questionModel");
const UserAnswer = require("../models/UserAnswer");

const submitAnswers = async (req, res) => {
  try {
    const payload = req.body;

    if (!Array.isArray(payload) || payload.length < 2) {
      return res.status(400).json({ message: "Invalid submission format." });
    }

    const { name, universityNumber } = payload[0];

    // Check if the user has already submitted any answers
    const alreadySubmitted = await UserAnswer.findOne({ universityNumber });
    if (alreadySubmitted) {
      return res
        .status(400)
        .json({ message: "You have already submitted your answers." });
    }

    const results = [];

    for (let i = 1; i < payload.length; i++) {
      const answer = payload[i];
      const question = await Question.findById(answer.questionId);
      if (!question) continue;

      let isCorrect = false;

      if (question.type === "multiple" && answer.selectedChoice) {
        isCorrect = question.correctChoice === answer.selectedChoice;
      } else if (question.type === "filling" && answer.filledAnswer) {
        isCorrect =
          question.correctAnswer.trim().toLowerCase() ===
          answer.filledAnswer.trim().toLowerCase();
      } else if (
        question.type === "matching" &&
        answer.matchingAnswer?.length
      ) {
        const correctPairs = question.matchingPairs || [];
        isCorrect = answer.matchingAnswer.every((pair, idx) => {
          return (
            pair.left === correctPairs[idx]?.left &&
            pair.right === correctPairs[idx]?.right
          );
        });
      }

      const newAnswer = new UserAnswer({
        universityNumber,
        name,
        question: question._id,
        selectedChoice: answer.selectedChoice,
        filledAnswer: answer.filledAnswer,
        matchingAnswer: answer.matchingAnswer,
        isCorrect,
      });

      await newAnswer.save();
      results.push({ questionId: question._id, isCorrect });
    }

    res.status(201).json({
      message: "All answers submitted successfully.",
      results,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserAnswers = async (req, res) => {
  try {
    const { universityNumber } = req.query;

    const query = {};
    if (universityNumber) query.universityNumber = universityNumber;

    const answers = await UserAnswer.find(query).populate("question");
    res.json(answers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const checkIfSubmitted = async (req, res) => {
  try {
    const { universityNumber } = req.query;

    const alreadyAnswered = await UserAnswer.findOne({
      universityNumber,
    });
    if (alreadyAnswered) {
      return res.status(400).json({
        message: "The exam was submitted by this student.",
      });
    }
    res.status(200);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getAllUserIdentifiers = async (req, res) => {
  try {
    const identifiers = await UserAnswer.aggregate([
      {
        $group: {
          _id: "$universityNumber",
          name: { $first: "$name" },
        },
      },
      {
        $project: {
          _id: 0,
          universityNumber: "$_id",
          name: 1,
        },
      },
    ]);

    res.status(200).json(identifiers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  submitAnswers,
  checkIfSubmitted,
  getUserAnswers,
  getAllUserIdentifiers,
};
