// controllers/visitController.js
const Visit = require("../models/visitModel");

exports.trackVisit = async (req, res) => {
  try {
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const userAgent = req.headers["user-agent"];

    // Save the visit to DB
    const newVisit = new Visit({ ipAddress: ip, userAgent });
    await newVisit.save();

    res.status(200).json({ message: "Visit tracked." });
  } catch (error) {
    console.error("Error tracking visit:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getStats = async (req, res) => {
  try {
    const totalVisits = await Visit.countDocuments();
    const uniqueVisitors = await Visit.distinct("ipAddress");

    res.status(200).json({
      totalVisits,
      uniqueVisitors: uniqueVisitors.length,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching stats" });
  }
};
