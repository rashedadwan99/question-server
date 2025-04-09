const User = require("../models/userModel");

const auth = async (req, res, next) => {
  try {
    const apiToken = req.query.api_token;
    if (!apiToken) {
      return res
        .status(401)
        .send({ message: "Access denied. No token provided." });
    }

    const user = await User.findOne({ api_token: apiToken });
    if (!user) {
      return res.status(401).send({ message: "Invalid token." });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(500).send({ message: "Internal server error." });
  }
};

module.exports = { auth };
