require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("Task Manager Backend is running");
});

app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

module.exports = app;