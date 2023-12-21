const express = require("express");
const mongoose = require("mongoose"); // Make sure to require mongoose
const router = express.Router();
const Task = require("../models/task");

// POST route for creating a task
router.post("/tasks", async (req, res) => {
  const { userId, title, description, deadline, priority } = req.body;

  try {
    const newTask = new Task({
      title,
      description,
      deadline,
      priority,
      user: userId,
    });
    await newTask.save();
    res.status(201).send(newTask);
  } catch (error) {
    res.status(400).send(error);
  }
});

// GET route to fetch tasks for a specific user
router.get("/tasks/user/:userId", async (req, res) => {
  console.log("Requested User ID:", req.params.userId); // Log the User ID from the URL
  try {
    const validUserId = mongoose.Types.ObjectId.isValid(req.params.userId);
    console.log("Is User ID valid?", validUserId); // Log the validity of the User ID
    if (!validUserId) {
      return res.status(400).send("Invalid user ID format");
    }
    const tasks = await Task.find({ user: req.params.userId });
    console.log("Tasks found:", tasks); // Log the tasks found
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error); // Log any errors
    res.status(500).send(error);
  }
});

module.exports = router;
