import React from "react";
import "./App.css";
import TaskList from "./components/TaskList";
import AddTaskForm from "./components/AddTaskForm";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>My Task Manager</h1>
      </header>
      <AddTaskForm />
      <TaskList />
    </div>
  );
}

export default App;
