import { Router } from "express";
import authRoute from "./app/auth/auth.route.js";
import projectRoute from "./app/project/project.route.js";
const router = Router();

router.use("/auth", authRoute);
router.use("/projects", projectRoute);

export default router;
