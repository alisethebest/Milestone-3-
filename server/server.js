// Load environment variables from .env file
require("dotenv").config({ path: "./.env" });

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const taskRoutes = require("./routes/tasks");
const userRoutes = require("./routes/users");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", taskRoutes);
app.use("/api", userRoutes);

console.log("MongoDB URI:", process.env.MONGODB_URI);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "..", "client", "build", "index.html")
    );
  });
}

// Define a simple route to test server is working
app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
