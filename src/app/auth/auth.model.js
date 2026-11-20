import { model, Schema } from "mongoose";

const userSchema = new Schema({
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

const User = model("User", userSchema);

export default User;
