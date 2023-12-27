const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Task = require("../models/task");

// POST route for creating a task
router.post("/add", async (req, res) => {
  const { title, description, user } = req.body;
  if (!title || !description || !user) {
    return res.status(400).json({ error: "Missing task details" });
  }

  try {
    const newTask = new Task({ title, description, user });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Failed to create task. Please try again." });
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
