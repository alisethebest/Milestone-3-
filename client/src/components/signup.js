import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  let navigate = useNavigate();

  const isValidEmail = (email) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}]))$/;
    return re.test(String(email).toLowerCase());
  };

  const isValidPassword = (password) => {
    // Example: Check if password length is more than 6
    return password.length > 6;
  };

  const handleSubmit = async (e) => {
    console.log("handleSubmit called");
    e.preventDefault();
    console.log("Form submitted", { username, password });

    if (!isValidEmail(username)) {
      setErrorMessage("Invalid email format");
      return;
    }

    if (!isValidPassword(password)) {
      setErrorMessage("Password is too short");
      return;
    }

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: username, password }),
      });

      if (response.ok) {
        // Option: Navigate to the login page or automatically log the user in
        navigate("/login"); // For now, navigating to the login page
      } else {
        const data = await response.json();
        setErrorMessage("Signup failed: " + data.error);
      }
    } catch (error) {
      setErrorMessage("An error occurred: " + error.message);
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="signup-button">
          Sign Up
        </button>
        <p className="login-link">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default SignUp;
