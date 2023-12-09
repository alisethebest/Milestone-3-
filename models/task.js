const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  deadline: Date,
  priority: String,
});

const Task = mongoose.model("Task", TaskSchema);
module.exports = Task;
