import { createApp } from "./app.js";
import http from "node:http";
import { env } from "./lib/config/env.js";
import { logger } from "./pkg/logger/logger.js";
import mongoose from "mongoose";
const PORT = env.port;
const app = createApp();
const server = http.createServer(app);
function shutdown() {
  logger.info("shutting down");
  server.close(async () => {
    await mongoose.disconnect();
    process.exit(0);
  });
}
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
server.listen(PORT, () => {
  logger.log(`app running on ${PORT}`);
});

export default app;
