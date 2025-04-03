const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    type: {
      type: String,
      enum: ["simple", "matching", "filling"], // Add 'filling' as a type
      required: true,
    },
    answers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Answer",
      },
    ],
    matchingPairs: [
      {
        left: { type: String, required: false }, // Only for matching
        right: { type: String, required: false },
      },
    ],
    correctAnswer: {
      type: String,
      required: function () {
        return this.type === "filling";
      },
    }, // Only for filling questions
  },
  {
    timestamps: true,
  }
);

const Question = mongoose.model("Question", QuestionSchema);
module.exports = Question;
