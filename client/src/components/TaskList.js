import React, { useState, useEffect } from "react";
import Task from "./task";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);
      setError(null);

      // Attempt to retrieve the userId from localStorage
      const userId = localStorage.getItem("userId");

      if (!userId) {
        // Handle the case where userId is not found in localStorage (user not logged in)
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/tasks/user/${userId}`);
        if (!response.ok) {
          throw new Error(`Error fetching tasks: ${response.statusText}`);
        }
        const data = await response.json();
        setTasks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []); // No dependencies, so this effect runs once on component mount

  if (isLoading) {
    return <p>Loading tasks...</p>;
  }

  if (error) {
    return <p>Error fetching tasks: {error}</p>;
  }

  return (
    <div>
      {tasks.length > 0 ? (
        tasks.map((task) => <Task key={task._id} task={task} />)
      ) : (
        <p>No tasks available</p>
      )}
    </div>
  );
};

export default TaskList;
