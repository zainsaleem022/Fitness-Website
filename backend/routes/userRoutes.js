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

router.get("/goalSetting", async (req, res) => {
  try {
    // Fetch all workout documents where type_ is "goal"
    const workouts = await Workout.find({ type_: "goal" });
    res.json(workouts);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("An error occurred while fetching workout data.");
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

router.post("/goalSetting", async (req, res) => {
  try {
    const { exercise, weight, sets, reps, dayOfWeek } = req.body;
    
    // Create a new workout document
    const newWorkout = new Workout({
      exercise,
      weight,
      sets,
      reps,
      dayOfWeek,
      type_: "goal", // Assuming it's a "goal" type
    });

    // Save the workout data to the database
    await newWorkout.save();
    res.send("Workout added successfully.");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("An error occurred while adding workout data.");
  }
});

router.put("/goalSetting/:id", async (req, res) => {

  try {
    const { id } = req.params;
    const { exercise, weight, sets, reps, dayOfWeek } = req.body;

    // Find the workout document by ID and update it
    const updatedWorkout = await Workout.findByIdAndUpdate(id, {
      exercise,
      weight,
      sets,
      reps,
      dayOfWeek,
    });

    // Check if the document was found and updated
    if (!updatedWorkout) {
      return res.status(404).send("Exercise not found");
    }
    res.send("Exercise updated successfully");
  } catch (error) {
    console.error("Error updating exercise:", error);
    res.status(500).send("An error occurred while updating exercise");
  }
});


router.delete("/goalSetting/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // Find the workout document by ID and delete it
    await Workout.findByIdAndDelete(id);

    res.send("Workout deleted successfully.");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("An error occurred while deleting workout data.");
  }
});

module.exports = router;
