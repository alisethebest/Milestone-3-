const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Task = require("../models/task");

// POST route for creating a task
router.post("/api/tasks/add", async (req, res) => {
  const { title, description, deadline, priority, user } = req.body; // Extract the fields from the request body

  try {
    // Create a new task
    const newTask = new Task({
      title,
      description,
      deadline,
      priority,
      user,
    });

    // Save the task to the database
    await newTask.save();

    // Log the newly created task
    console.log("New Task Created:", newTask);

    // Send a success response with the newly created task
    res.status(201).json(newTask);
  } catch (error) {
    // Handle errors and send an error response with a meaningful message
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Failed to create task. Please try again." });
  }
});

// GET route to fetch tasks for a specific user
router.get("/api/tasks/user/:userId", async (req, res) => {
  console.log("Requested User ID:", req.params.userId); // Log the User ID from the URL
  try {
    const validUserId = mongoose.Types.ObjectId.isValid(req.params.userId);
    console.log("Is User ID valid?", validUserId); // Log the validity of the User ID
    if (!validUserId) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }
    const tasks = await Task.find({ user: req.params.userId });
    console.log("Tasks found:", tasks); // Log the tasks found
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error); // Log any errors
    res.status(500).json({ error: "Failed to fetch tasks. Please try again." });
  }
});


module.exports = router;