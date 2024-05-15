const express = require("express");
const router = express.Router();
const Workout = require("../models/WorkOutModel");
const ExcerciseLib=require("../models/ExcerciseLibraryModel") // Import the Workout model

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

router.post("/favorites", async (req, res) => {
  try {
    const exercise = new ExcerciseLib(req.body);
    console.log(exercise);
    await exercise.save();
    res.status(201).send(exercise);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get favorite exercises
router.get("/favorites", async (req, res) => {
  try {
    const exercises = await ExcerciseLib.find();
    res.status(200).send(exercises);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/favorites/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await ExcerciseLib.findByIdAndDelete(id);
    res.status(200).send({ message: "Exercise deleted successfully" });
  } catch (error) {
    console.error("Error deleting exercise:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

module.exports = router;
