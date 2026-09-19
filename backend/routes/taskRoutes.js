const express = require("express");
const Task = require("../models/Task");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

// GET all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find({user : req.userId });

    res.json(tasks);
  } catch (error) {
  console.log("FETCH TASK ERROR:", error);

  res.status(500).json({
    message: "Failed to fetch tasks",
    error: error.message,
  });
}
});

// POST new task
router.post("/", async (req, res) => {
  try {
    const newTask = await Task.create({
      title: req.body.title,
      user: req.userId,
    });

    res.status(201).json(newTask);
  } catch (error) {
  console.log("CREATE TASK ERROR:", error);

  res.status(500).json({
    message: "Failed to create task",
    error: error.message,
  });
}
});

// PUT update task
router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findById({_id: req.params.id,
  user: req.userId,});

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

   if(req.body.title !== undefined){
    task.title = req.body.title;
   }

    if (req.body.completed !== undefined) {
      task.completed = req.body.completed;
    }

    await task.save();

    res.json(task);
    
  } catch (error) {
    res.status(500).json({
      message: "Failed to update task",
    });
  }
});

// DELETE task
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete({  _id: req.params.id,
  user: req.userId,});

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete task",
    });
  }
});

module.exports = router;