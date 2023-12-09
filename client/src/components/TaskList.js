import React, { useState, useEffect } from "react";
import Task from "./task";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    // Simulated mock data (replace with your own mock data)
    const mockData = [
      { id: 1, title: "Task 1", description: "Description for Task 1" },
      { id: 2, title: "Task 2", description: "Description for Task 2" },
      { id: 3, title: "Task 3", description: "Description for Task 3" },
    ];

    // Simulate a delay to mimic an API request
    setTimeout(() => {
      setTasks(mockData);
      setIsLoading(false);
    }, 1000); // Adjust the delay as needed
  }, []);

  if (isLoading) {
    return <p>Loading tasks...</p>;
  }

  if (error) {
    return <p>Error fetching tasks: {error}</p>;
  }

  return (
    <div>
      {tasks.length > 0 ? (
        tasks.map((task) => <Task key={task.id} task={task} />)
      ) : (
        <p>No tasks available</p>
      )}
    </div>
  );
};

export default TaskList;
