import React, { useState } from "react";
import "../styles/AddTaskForm.css"; // Make sure this path is correct

function AddTaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      setError("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      // Log the data being sent in the POST request
      console.log("Task Data:", { title, description });

      // Call the onAdd function to add the task
      await onAdd({ title, description });

      setTitle("");
      setDescription("");
    } catch (err) {
      setError("Failed to add task. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-task-form-container">
      {" "}
      {/* Add the container class here */}
      <form onSubmit={handleSubmit} className="add-task-form">
        {" "}
        {/* Add the form class if needed */}
        {error && <p className="error">{error}</p>}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="task-input" // Add classes for individual elements if needed
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="task-textarea" // Add classes for individual elements if needed
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="task-submit-button"
        >
          {isSubmitting ? "Adding..." : "Add Task"}
        </button>
      </form>
    </div>
  );
}

export default AddTaskForm;
