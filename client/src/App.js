import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import TaskList from "./components/TaskList";
import AddTaskForm from "./components/AddTaskForm";
import Task from "./components/task"; // Make sure this file exists and is correctly exporting the Task component
import "./App.css";

function Home() {
  let navigate = useNavigate();

  function handleGetStartedClick() {
    navigate("/tasks");
  }

  return (
    <main className="app-main">
      <div className="hero">
        <h1 className="hero-title">Welcome to Task Management</h1>
        <p className="hero-subtitle">Your All-in-One Task Solution</p>
        <button
          className="hero-button"
          onClick={handleGetStartedClick}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#DF3C5F"; // Electric Pink on hover
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "var(--primary-color)";
          }}
        >
          Get Started
        </button>
      </div>

      <div className="features">
        <div className="feature">
          <h2 className="feature-title">Effortless Task Management</h2>
          <p className="feature-description">
            Stay organized and boost your productivity effortlessly.
          </p>
        </div>
        <div className="feature">
          <h2 className="feature-title">Real-time Collaboration</h2>
          <p className="feature-description">
            Work seamlessly with your team in real-time.
          </p>
        </div>
        <div className="feature">
          <h2 className="feature-title">Beautifully Designed</h2>
          <p className="feature-description">
            Experience a modern and visually pleasing interface.
          </p>
        </div>
      </div>

      <div className="about">
        <h2 className="about-title">About Us</h2>
        <p className="about-description">
          We are dedicated to simplifying your task management experience. Our
          platform is designed to help you organize your tasks efficiently and
          collaborate seamlessly with your team. We believe that productivity
          should be effortless and enjoyable.
        </p>
      </div>
    </main>
  );
}
function App() {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <nav className="navbar">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/tasks" className="nav-link">
              Task List
            </Link>
            <Link to="/add-task" className="nav-link">
              Add Task
            </Link>
            {/* Adjust the route as needed for your single Task component */}
            <Link to="/task/:id" className="nav-link">
              Task Detail
            </Link>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/add-task" element={<AddTaskForm />} />
          <Route path="/task/:id" element={<Task />} />{" "}
          {/* Ensure this matches your Task component's expectations */}
        </Routes>
        <footer className="app-footer">{/* Footer content */}</footer>
      </div>
    </Router>
  );
}

export default App;
