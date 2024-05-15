const express = require("express");
const router = express.Router();
const Workout = require("../models/WorkOutModel"); // Import the Workout model

router.get("/", (req, res) => {
  res.send("Welcome to the home page!");
});

router.get("/workoutTracking", async (req, res) => {
  try {
    // Fetch all exercises from the Workout model
    const goalExercises = await Workout.find({ type_: "goal" }); // Assuming you want only goal exercises
    res.status(200).json(goalExercises);
    console.log(goalExercises);
  } catch (error) {
    console.error("Error fetching workout data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/exerciseLibrary", (req, res) => {
  res.send("Explore our exercise library here.");
});

router.get("/goalSetting", (req, res) => {
  res.send("Set your fitness goals here.");
});

router.get("/about", (req, res) => {
  res.send("Learn more about our website.");
});

router.post("/workoutTracking/add", (req, res) => {
  const { exercise, weight, sets, reps, dayOfWeek } = req.body;
  // Here you would typically add the workout data to your database
  workouts.push({exercise, weight, sets, reps, dayOfWeek });
  res.send("Workout added successfully.");
});



module.exports = router;
