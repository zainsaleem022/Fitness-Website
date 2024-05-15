import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography } from "@mui/material";
import GoalExerciseCard from "../components/GoalExerciseCard";

const WorkoutTracking = () => {
  const [goalExercises, setGoalExercises] = useState([]);
  const [currentDay, setCurrentDay] = useState("");

  useEffect(() => {
    
    const fetchExercises = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/bfit/workoutTracking"
        ); // Adjust the endpoint accordingly
        setGoalExercises(response.data); // Assuming response.data is an array of exercises
        setCurrentDay(getCurrentDay()); // Set the current day
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    };

    fetchExercises();
  }, []);

  const getCurrentDay = () => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const currentDate = new Date();
    const currentDayIndex = currentDate.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
    return daysOfWeek[currentDayIndex];
  };

  const exercisesOfDay = goalExercises.filter(
    (exercise) => exercise.dayOfWeek === currentDay
  );

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        Track Your Workout
      </Typography>
      <Typography variant="h4" gutterBottom>
        Today's Workout Goal
      </Typography>
      <Typography variant="h6" gutterBottom>
        Day: {currentDay}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Exercises:
      </Typography>
      {exercisesOfDay.map((exercise, index) => (
        <GoalExerciseCard key={index} exercise={exercise} />
      ))}
    </div>
  );
};

export default WorkoutTracking;
