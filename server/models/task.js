const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, // assuming your User model uses MongoDB's default ObjectId
    required: true,
    ref: "User", // This should match the name of your user model
  },
});

const Task = mongoose.model("Task", TaskSchema);
module.exports = Task;
