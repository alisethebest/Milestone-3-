const express = require("express");
const app = express();
const taskRoutes = require("./routes/tasks");
const mongoose = require("mongoose");

app.use(express.json()); // for parsing application/json
app.use("/api", taskRoutes);

mongoose
  .connect("your_mongodb_connection_string", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
