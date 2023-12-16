const express = require("express");
const router = express.Router();
const Task = require("../models/task");

// POST route for creating a task
router.post("/tasks", async (req, res) => {
  const { userId, title, description, deadline, priority } = req.body; // Destructure required fields from body

  try {
    const newTask = new Task({
      title,
      description,
      deadline,
      priority,
      user: userId // Set the user field with the provided userId
    });
    await newTask.save();
    res.status(201).send(newTask);
  } catch (error) {
    res.status(400).send(error);
  }
});

// GET route to fetch tasks for a specific user
router.get("/tasks/user/:userId", async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.params.userId });
    res.json(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
});


module.exports = router;
