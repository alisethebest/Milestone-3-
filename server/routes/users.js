const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/user");

// User registration
router.post("/signup", async (req, res) => {
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create a new user instance with the hashed password
    const newUser = new User({
      ...req.body,
      password: hashedPassword,
    });

    // Save the new user to the database
    await newUser.save();

    // Send a success response
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    // Handle errors (e.g., duplicate email)
    res.status(400).json({ error: error.message });
  }
});

// User login
router.post("/login", async (req, res) => {
  try {
    // Find the user by email
    const user = await User.findOne({ email: req.body.email });

    // Check if user exists and the password is correct
    if (user && (await bcrypt.compare(req.body.password, user.password))) {
      // Create a token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      // Send the token to the client
      res.status(200).json({ userId: user._id, token });
    } else {
      // Handle invalid credentials
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    // Handle server errors
    res.status(500).json({ error: error.message });
  }
});

router.use("/user/profile", authenticateToken);

// User profile
router.get("/user/profile", async (req, res) => {
  try {
    // Assuming the middleware adds the user's ID to the request object
    const user = await User.findById(req.user.id);
    if (!user) retu;
    res.json({
      name: user.name,
      email: user.email,
      // add other user details you want to return
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
