const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to the home page!");
});

router.get("/workoutTracking", (req, res) => {
  res.send("This is the workout tracking page.");
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
  workouts.push({ exercise, weight, sets, reps, dayOfWeek });
  res.send("Workout added successfully.");
});

module.exports = router;
