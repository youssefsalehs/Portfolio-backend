import User from "./auth.model.js";

export async function createUser(email, username, password) {
  return await User.create({
    email,
    username,
    password,
  });
}

export async function findUserByEmail(email) {
  return await User.findOne({ email });
}
