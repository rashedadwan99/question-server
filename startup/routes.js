const express = require("express");
const questions = require("../routes/questionRoutes");
const answers = require("../routes/answerRoutes");
const users = require("../routes/userRoutes");
module.exports = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use("/uploads", express.static("uploads"));
  app.use("/api/questions", questions);
  app.use("/api/answers", answers);
  app.use("/api/users", users);
};
