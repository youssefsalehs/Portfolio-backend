import * as authRepo from "./auth.repo.js";
import { userAlreadyExists, userNotFound } from "./errors.js";
import { compareHash, generateToken, hashPassword } from "./utilis.js";
export const signup = async (email, username, password) => {
  const user = await authRepo.findUserByEmail(email);
  if (user) {
    throw userAlreadyExists;
  }
  const hashedPassword = await hashPassword(password);
  const newUser = await authRepo.createUser(email, username, hashedPassword);
  newUser.password = undefined;

  return user;
};
export const login = async (email, password) => {
  const user = await authRepo.findUserByEmail(email);
  if (!user) {
    throw userNotFound;
  }
  const isCorrect = await compareHash(password, user.password);
  if (!isCorrect) {
    throw invalidCredentials;
  }
  const token = generateToken({ id: user._id });
  return { user, token };
};
