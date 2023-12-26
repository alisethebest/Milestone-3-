import React, { useState } from "react";
import '../styles/AddTaskForm.css';

function AddTaskForm({ onTasksUpdate }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      setError("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    try {
     const response = await fetch("/api/add", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify({ title, description }),
     });


      if (response.ok) {
        setTitle("");
        setDescription("");
        setError("");
        await onTasksUpdate(); // Refresh the task list
      } else {
        setError("Failed to add task. Please try again.");
      }
    } catch (error) {
      setError("An error occurred: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-task-form-container">
      <form onSubmit={handleSubmit} className="add-task-form">
        {error && <p className="error">{error}</p>}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="task-input"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="task-textarea"
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
