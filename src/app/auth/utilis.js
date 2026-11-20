import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../../lib/config/env.js";
export async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

export async function compareHash(password, hashedPassword) {
  const isCorrect = await bcrypt.compare(password, hashedPassword);
  return isCorrect;
}

export const generateToken = (payload) => {
  return jwt.sign(payload, env.jwt.secret, { expiresIn: "1hr" });
};
