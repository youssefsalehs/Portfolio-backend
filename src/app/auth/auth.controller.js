import { validate } from "../../lib/validation/validation.js";
import { loginDto, registerDto } from "./auth.dto.js";
import User from "./auth.model.js";
import * as userService from "./auth.service.js";
export const signup = async (req, res, next) => {
  try {
    const data = validate(registerDto, req.body);
    const { email, username, password } = data;
    const user = await userService.signup(email, username, password);
    return res.status(201).json({
      status: "success",
      user,
    });
  } catch (error) {
    return next(error);
  }
};
export const login = async (req, res, next) => {
  try {
    const data = validate(loginDto, req.body);
    const { email, password } = data;
    const { user, token } = await userService.login(email, password);
    return res.status(200).json({
      status: "success",
      user: { username: user.username, email: user.email },
      token,
    });
  } catch (error) {
    return next(error);
  }
};
