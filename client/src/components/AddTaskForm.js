import React, { useState } from "react";

function AddTaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Define isSubmitting here
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch("/api/tasks/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      if (response.ok) {
        const data = await response.json();
        // Handle successful task addition, e.g., clear form, update state in parent component
        setTitle("");
        setDescription("");
      } else {
        // Handle server errors here
        setError("Failed to add task. Please try again.");
      }
    } catch (error) {
      setError("An error occurred: " + error.message);
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
