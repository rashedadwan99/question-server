// routes/visitRoutes.js
const express = require("express");
const router = express.Router();
const { trackVisit, getStats } = require("../controllers/visitController");

router.post("/track-visit", trackVisit);
router.get("/stats", getStats);

module.exports = router;
