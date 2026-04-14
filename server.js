const express = require("express");
const app = express();
const helmet = require("helmet");
const hpp = require("hpp");
const cors = require("cors");
require("dotenv").config();
const authRoute = require("./routes/user.route");
const connectdb = require("./config/mongodb");
const projectsRoute = require("./routes/project.route");

app.use(cors());
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
