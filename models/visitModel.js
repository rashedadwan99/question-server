// models/Visit.js
const mongoose = require("mongoose");

const visitSchema = new mongoose.Schema(
  {
    ipAddress: String,
    userAgent: String,
    visitedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Visit", visitSchema);
