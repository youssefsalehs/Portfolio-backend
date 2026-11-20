import "./lib/db/mongoose.js";
import express from "express";
import helmet from "helmet";
import router from "./route.js";
import { env } from "./lib/config/env.js";
import globalErrorHandler from "./pkg/error/error.handler.js";
import cors from "cors";
import hpp from "hpp";
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  env.frontend.url,
];
export function createApp() {
  const app = express();
  app.use(
    cors({
      origin: [...allowedOrigins],
      credentials: true,
    }),
  );
  app.use(helmet());
  app.use(express.json());
  app.use(hpp());
  app.get("/", (req, res) => {
    res.send("Welcome To My Portfolio Backend 😶‍🌫️");
  });
  app.use("/api/v1", router);
  app.use((req, res) => {
    return res.status(404).json({ success: false, message: "route not found" });
  });
  app.use(globalErrorHandler);
  return app;
}
