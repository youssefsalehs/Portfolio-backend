const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const signup = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "user already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    newUser.password = undefined;
    return res.status(201).json({
      status: "success",
      user: newUser,
    });
  } catch (error) {
    return res.status(400).json({
      status: "Failed",
      message: error.message,
    });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "user doesn't exists" });
    }
    const isCorrect = await bcrypt.compare(password, user.password);
    if (!isCorrect) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = generateToken(user._id);
    return res.status(200).json({
      status: "success",
      user: { username: user.username, email: user.email },
      token,
    });
  } catch (error) {
    return res.status(400).json({
      status: "Failed",
      message: error.message,
    });
  }
};
module.exports = { signup, login };
