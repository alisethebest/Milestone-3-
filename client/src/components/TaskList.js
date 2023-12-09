import React, { useState, useEffect } from "react";
import Task from "./task";

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch tasks from the server
  }, []);

  return (
    <div>
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
}

export default TaskList;
