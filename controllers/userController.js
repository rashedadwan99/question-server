const User = require("../models/userModel");
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
    } else {
      const hashedPassword = await hashPassword(password);
      user = new User({
        email,
        name,
        password: hashedPassword,
        api_token: generateToken(),
      });
      await user.save();
      res.status(200).send({
        name,
        email,
        api_token: user.api_token,
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
    if (!user) {
      return res.status(400).send({
        message: "Invalid email or password",
      });
    }
    if (user) {
      const isValidPassword = await isValidPasswordHandler(password, user);
      if (!isValidPassword) {
        return res.status(400).send({
          message: "Invalid email or password",
        });
      }
      return res.status(200).send({
        api_token: user.api_token,
        name: user.name,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserProfile = async (req, res) => {
  const { api_token } = req.query;
  try {
    const user = await User.findOne({ api_token });
    if (!user) {
      return res.status(401).send({
        message: "Invalid Token",
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
module.exports = { registerUser, loginUser, getUserProfile };
