import jwt from "jsonwebtoken";
import User from "../../app/auth/auth.model.js";
import { env } from "../config/env.js";
import { AppError } from "../../pkg/error/error.js";
const protect = async (req, res, next) => {
  try {
    let token;
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1]?.trim();
    }

    if (!token) {
      return next(new AppError("Not logged in, token missing", 401));
    }

    const decoded = jwt.verify(token, env.jwt.secret);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return next(new AppError("User no longer exists", 401));
    }

    req.user = user;
    return next();
  } catch (error) {
    return next(error);
  }
};
export default protect;
