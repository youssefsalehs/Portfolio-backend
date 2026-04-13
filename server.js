const express = require("express");
const app = express();
const helmet = require("helmet");
const hpp = require("hpp");
const cors = require("cors");
require("dotenv").config();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(hpp());
app.get("/", (req, res) => {
  res.send("Welcome To My Portfolio Backend 😶‍🌫️");
});

app.use((req, res) => {
  res.status(404).send("Route not found");
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`app running on ${port}`);
});
