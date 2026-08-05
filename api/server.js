const express = require("express");
const app = express();
const helmet = require("helmet");
const hpp = require("hpp");
const cors = require("cors");
require("dotenv").config();
const authRoute = require("../routes/user.route.js");
const connectdb = require("../config/mongodb");
const projectsRoute = require("../routes/project.route.js");
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://portfolio-backend-five-ecru.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  }),
);
app.use(helmet());
app.use(express.json());
app.use(hpp());
connectdb();
app.get("/", (req, res) => {
  res.send("Welcome To My Portfolio Backend 😶‍🌫️");
});
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/projects", projectsRoute);
app.use((req, res) => {
  res.status(404).send("Route not found");
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`app running on ${port}`);
});

module.exports = app;
