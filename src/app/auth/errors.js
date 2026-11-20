import { AppError } from "../../pkg/error/error.js";

export const userNotFound = new AppError("user not found", 404);
export const userAlreadyExists = new AppError("user already exists", 409);
export const invalidCredentials = new AppError("invalid credentials", 401);
