const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    type: {
      type: String,
      enum: ["multiple", "matching", "filling"],
      required: true,
    },

    // For multiple choice questions
    choices: [
      {
        text: { type: String, required: false },
      },
    ],
    correctChoice: {
      type: String,
      required: function () {
        return this.type === "multiple";
      },
    },

    // For matching questions
    matchingPairs: [
      {
        left: { type: String, required: false },
        right: { type: String, required: false },
      },
    ],

    // For filling questions
    correctAnswer: {
      type: String,
      required: function () {
        return this.type === "filling";
      },
    },
  },
  {
    timestamps: true,
  }
);

const Question = mongoose.model("Question", QuestionSchema);
module.exports = Question;
