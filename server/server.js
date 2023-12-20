require("dotenv").config();
const express = require("express");
const app = express();
const taskRoutes = require("./routes/tasks");
const mongoose = require("mongoose");
const userRoutes = require("./routes/users");

app.use(express.json());
app.use("/api", taskRoutes);
app.use("/api", userRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
