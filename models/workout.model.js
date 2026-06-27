const mongoose = require("mongoose");
const workoutSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  details: [
    {
      name: { type: String, required: true },
      sets: { type: String, required: true },
      reps: { type: String, required: true },
    },
  ],
});
const workout = mongoose.model("workout", workoutSchema);
module.exports = workout;
