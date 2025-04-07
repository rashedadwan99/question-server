const User = require("../models/userModel");

const auth = async (req, res, next) => {
  try {
    const apiToken = req.query.api_token;
    if (!apiToken) {
      return res
        .status(401)
        .send({ message: "access denied. No token provided." });
    }
    const user = await User.findOne({
      api_token: apiToken,
    });
    req.user = user;

    next();
  } catch (error) {}
};
module.exports = { auth };
