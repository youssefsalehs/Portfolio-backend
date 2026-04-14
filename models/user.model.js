const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  username: {
    type: String,
    min: 6,
    max: 65,
    required: [true, "username is required"],
    unique: true,
  },
  password: {
    type: String,
    min: 6,
    max: 65,
    required: [true, "Password is required"],
    unique: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
