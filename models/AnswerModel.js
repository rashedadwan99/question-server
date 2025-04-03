const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
    isCorrect: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Answer = mongoose.model("Answer", AnswerSchema);
module.exports = Answer;
