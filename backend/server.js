require("dotenv").config();

const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
// app.use(express.json());
const express = require("express");

const app = express();

const PORT = process.env.PORT || 5000;


const taskRoutes = require("./routes/taskRoutes");

app.use(express.json());
app.use(cors());


connectDB();

app.get("/", (req, res) => {
    res.send("Task manager Backend is running");
});

app.use("/api/tasks", taskRoutes);

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});