const express = require("express");
const router = express.Router();
const User = require("../models/user"); // Assuming you have a User model

router.post("/users", async (req, res) => {
  try {
    // Create a new user using the User model and req.body
    const newUser = new User(req.body);
    // Save the new user to the database
    await newUser.save();
    // Send back the new user
    res.status(201).json(newUser);
  } catch (error) {
    // If an error occurs, send back a 400 error
    res.status(400).json({ error: error.message });
  }
});


module.exports = router;
