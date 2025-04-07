const express = require("express");
const questions = require("../routes/questionRoutes");
const users = require("../routes/userRoutes");
const userAnswers = require("../routes/userAnswerRoutes");
module.exports = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use("/uploads", express.static("uploads"));
  app.use("/api/questions", questions);
  app.use("/api/users", users);
  app.use("/api/userAnswers", userAnswers);
};
