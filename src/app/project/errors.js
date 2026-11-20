import { AppError } from "../../pkg/error/error.js";

export const projectAlreadyExists = new AppError("project already exists", 409);
export const projectNotFound = new AppError("project not found", 404);
export const projectExistsWithExactLink = new AppError(
  "Another project already uses this link",
  409,
);
