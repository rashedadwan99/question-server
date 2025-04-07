const mongoose = require("mongoose");

const UserAnswerSchema = new mongoose.Schema(
  {
    universityNumber: { type: String, required: true },
    name: { type: String, required: true },

    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },

    // For multiple choice
    selectedChoice: { type: String },

    // For filling
    filledAnswer: { type: String },

    // For matching
    matchingAnswer: [
      {
        left: { type: String },
        right: { type: String },
      },
    ],

    isCorrect: { type: Boolean },
  },
  { timestamps: true }
);

// Prevent same universityNumber from answering the same question twice
UserAnswerSchema.index({ universityNumber: 1, question: 1 }, { unique: true });

const UserAnswer = mongoose.model("UserAnswer", UserAnswerSchema);
module.exports = UserAnswer;
