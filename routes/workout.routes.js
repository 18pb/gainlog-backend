const express = require("express");
const router = express.Router();
const Workout = require("../models/workout.model");
const authMiddleware = require("../middleware/auth.middleware");

// sab routes protected hain
router.use(authMiddleware);

router.post("/workouts", async (req, res) => {
  const { title, date, details } = req.body;
  try {
    const workout = await Workout.findOne({ date, userId: req.userId });
    if (workout) {
      return res.status(500).json({
        message: "This date already has some workout planned",
      });
    }
    const newWorkout = await Workout.create({
      title,
      date,
      details,
      userId: req.userId,
    });
    res.status(200).json({
      message: `${title} workout planned for ${date} successfully`,
      data: newWorkout,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/workouts", async (req, res) => {
  const { month, title } = req.query;
  let filter = { userId: req.userId };
  if (title) filter.title = title;
  if (month) {
    const start = new Date(`${month}-01`);
    const end = new Date(start);
    end.setMonth(end.getMonth() + 1);
    filter.date = { $gte: start, $lt: end };
  }
  try {
    const data = await Workout.find(filter);
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/workouts/:id", async (req, res) => {
  try {
    const workout = await Workout.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });
    if (!workout) {
      return res.status(404).json({ message: "Entry not found" });
    }
    res.status(200).json({ message: "Entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch("/workouts/:id", async (req, res) => {
  try {
    const updatedWorkout = await Workout.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true },
    );
    res.status(200).json({
      message: "Entry modified successfully",
      updatedWorkout,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
