const express = require("express");
const {
  notFound,
  errorHandler,
} = require("./middleware/errorHandlerMiddleware");
const userRoutes = require("./routes/userRoutes");
const { connectDB } = require("./database");
const Workout = require("./models/WorkOutModel"); // Import the Workout model

// Load environment variables from .env file
require("dotenv").config();
// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); //to accept JSON data

// // Define dummy data
// const dummyWorkouts = [
//   {
//     exercise: "Push-ups",
//     weight: 0, // If it's bodyweight exercise, weight could be 0
//     sets: 3,
//     reps: 15,
//     dayOfWeek: "Monday",
//     type_: "goal", // or "goal" depending on your scenario
//   },
//   {
//     exercise: "Squats",
//     weight: 50, // If using weights, specify the weight
//     sets: 4,
//     reps: 12,
//     dayOfWeek: "Monday",
//     type_: "goal",
//   },
//   {
//     exercise: "Pull-ups",
//     weight: 10, // If it's bodyweight exercise, weight could be 0
//     sets: 3,
//     reps: 15,
//     dayOfWeek: "Wednesday",
//     type_: "goal", // or "goal" depending on your scenario
//   },
//   {
//     exercise: "Weighted-Squats",
//     weight: 10, // If using weights, specify the weight
//     sets: 4,
//     reps: 12,
//     dayOfWeek: "Wednesday",
//     type_: "goal",
//   },
//   // Add more dummy data as needed
// ];

// // Function to insert dummy data into the database
// const insertDummyData = async () => {
//   try {
//     // Clear existing data (optional)
//     await Workout.deleteMany({});

//     // Insert dummy data
//     await Workout.insertMany(dummyWorkouts);

//     console.log("Dummy data inserted successfully");
//   } catch (error) {
//     console.error("Error inserting dummy data:", error);
//   }
// };

// // Call the function to insert dummy data
// insertDummyData();

// Routes
app.use("/bfit", userRoutes);

// Error handling middleware
//app.use(notFound);
//app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
