import React from "react";
import "../styles/task.css";

function Task({ task }) {
  return (
    <div>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      {/* Add more task details here */}
    </div>
  );
}

export default Task;
