import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignUp({ onSignUp }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Implement the signup logic here
    // This could involve sending a request to your backend server
    // and handling the response
    const success = await onSignUp(username, password); // This should be an async call to your backend
    if (success) {
      navigate("/login"); // Navigate to the login page upon successful signup
    } else {
      // Handle signup failure (e.g., display an error message)
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
    </div>
  );
}

export default SignUp;
