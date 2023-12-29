const express = require("express");
const router = express.Router();
const Task = require("../models/task");
const authenticateToken = require("./users");

// POST route for creating a task
router.post("/tasks/add", authenticateToken, async (req, res) => {
  const { title, description } = req.body;
  try {
    const newTask = new Task({ title, description, user: req.user.userId });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: "Failed to create task", error: error });
  }
});

// Route for fetching tasks for the authenticated user
router.get("/tasks", authenticateToken, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.userId });
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Failed to fetch tasks. Please try again." });
  }
});

module.exports = router;
