const { User } = require("../models/userModel");
const generateToken = require("../utils/token");
const { hashPassword, isValidPasswordHandler } = require("../utils/hashing");
const registerUser = async (req, res) => {
  const { email, password, name } = req.query;
  try {
    let user = await User.findOne({ email });
    if (user) {
      res.status(400).send({
        message: "the user is already exists",
      });
      const hashedPassword = await hashPassword(password);
      user = new User({
        email,
        name,
        password: hashedPassword,
        api_token: generateToken(),
      });
      await User.save();
      res.status(200).send({
        name,
        email,
        api_token,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const loginUser = async (req, res) => {
  const { email, password } = req.query;
  try {
    let user = await User.findOne({ email });
    const isValidPassword = await isValidPasswordHandler(password, user);
    if (!user || !isValidPassword) {
      return res.status(400).send({
        message: "Invalid email or password",
      });
    }
    return res.status(200).send({
      api_token: user.api_token,
      name: user.name,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = { registerUser, loginUser };
