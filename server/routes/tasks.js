const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Task = require("../models/task");

// POST route for creating a task
router.post("/tasks/add", async (req, res) => {
  const { title, description, user } = req.body;
  try {
    const newTask = new Task({ title, description });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: "Failed to create task", error: error });
  }
});

// Replace ':userId' with the actual user ID from the logged-in user
router.get("/user/:userId", async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.params.userId });
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Failed to fetch tasks. Please try again." });
  }
});

module.exports = router;
