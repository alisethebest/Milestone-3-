const express = require("express");
const router = express.Router();
const Task = require("../models/task");

// POST route for creating a task
router.post("/tasks", async (req, res) => {
  try {
    const newTask = new Task(req.body);
    await newTask.save();
    res.status(201).send(newTask);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
