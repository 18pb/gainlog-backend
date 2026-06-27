const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const workoutRoutes = require("./routes/workout.routes");
const connectDB = require("./db");
app.use(express.json());
app.use(cors());
connectDB();
app.get("/", (req, res) => {
  res.send("GainLog API Running");
});
app.use("/api", workoutRoutes);
app.listen(process.env.PORT, () => {
  console.log(`Server listening at port: ${process.env.PORT}`);
});
