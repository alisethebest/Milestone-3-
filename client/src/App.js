import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import TaskList from "./components/TaskList";
import AddTaskForm from "./components/AddTaskForm";
import Task from "./components/task";
import "./App.css";
import Login from "./components/login";
import SignUp from "./components/signup";

function Home() {
  let navigate = useNavigate();

  function handleGetStartedClick() {
    navigate("/login");
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
  const [navOpen, setNavOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  const handleLogin = (username, password) => {
    // TODO: Implement login logic
    // On successful login, set isLoggedIn to true
    setIsLoggedIn(true); // Placeholder for demonstration
  };

  const handleSignUp = (username, password) => {
    // TODO: Implement sign-up logic
  };

  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <nav className="navbar">
            <button onClick={toggleNav} className="hamburger">
              ☰
            </button>
            <div className={`nav-links ${navOpen ? "show" : ""}`}>
              <Link
                to="/"
                className="nav-link"
                onClick={() => setNavOpen(false)}
              >
                Home
              </Link>
              {isLoggedIn ? (
                <>
                  <Link
                    to="/tasks"
                    className="nav-link"
                    onClick={() => setNavOpen(false)}
                  >
                    Task List
                  </Link>
                  <Link
                    to="/add-task"
                    className="nav-link"
                    onClick={() => setNavOpen(false)}
                  >
                    Add Task
                  </Link>
                  {/* Add a Logout link or button here */}
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="nav-link"
                    onClick={() => setNavOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="nav-link"
                    onClick={() => setNavOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/add-task" element={<AddTaskForm />} />
          <Route path="/task/:id" element={<Task />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<SignUp onSignUp={handleSignUp} />} />
        </Routes>
        <footer className="app-footer">Frank Cervantes</footer>
      </div>
    </Router>
  );
}

export default App;
