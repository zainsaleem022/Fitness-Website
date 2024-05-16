import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Button } from "@mui/material";
import GoalExerciseCard from "../components/GoalExerciseCard";
import exTrackingIcon from "../assets/icons/exTrackingIcon.png";

const WorkoutTracking = () => {
  const [goalExercises, setGoalExercises] = useState([]);
  const [currentDay, setCurrentDay] = useState("");
  const [childData, setChildData] = useState([]);
  const [trackedExercises, setTrackedExercises] = useState([]);

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

  const handleSaveProgress = async () => {
    // Filter trackedExercises to only include exercises with type_ as "track"
    const filteredExercises = trackedExercises.filter(
      (exercise) => exercise.type_ === "track"
    );

    try {
      // Send a POST request with the filtered trackedExercises data
      await axios.post("http://localhost:5000/bfit/workoutTracking", {
        trackedExercises: filteredExercises,
      });
      console.log("Progress saved successfully!");
    } catch (error) {
      console.error("Error saving progress:", error);
    }
  };

  const handleChildData = (data) => {
    console.log(data.exercise);
    var newReps = parseInt(data.reps);
    const updatedTrackedExercises = trackedExercises.map((exercise) => {
      if (exercise.exercise === data.exercise) {
        return {
          ...exercise,
          sets: data.sets,
          reps: newReps,
          weight: data.weight,
          type_: "track",
        };
      }
      return exercise; // Return the original exercise if no match
    });

    console.log(updatedTrackedExercises);

    setTrackedExercises(updatedTrackedExercises); // Update the trackedExercises state
  };

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

  useEffect(() => {
    // Update trackedExercises when exercisesOfDay changes
    setTrackedExercises(exercisesOfDay);
  }, [exercisesOfDay]);

  return (
    <div
      style={{
        // display: "flex",
        // flexDirection: "column",
        // width: "50%",
        textAlign: "center",
        // justify: "center",
        marginTop: "2rem",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center", // Fix typo: use "justifyContent" instead of "justifyItems"
          marginBottom: "1rem", // Add margin bottom to create space between elements
        }}
      >
        <img
          src={exTrackingIcon}
          style={{
            width: 100,
            height: 100,
            marginRight: 10,
            backgroundColor: "orange",
          }}
        />
        <Typography variant="h4" gutterBottom>
          Track Your Workout
        </Typography>
      </div>
      <Typography variant="h6" gutterBottom>
        Day: {currentDay}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Exercises:
      </Typography>
      {exercisesOfDay.map((exercise, index) => (
        <GoalExerciseCard
          key={index}
          exercise={exercise}
          handleChildData={handleChildData}
        />
      ))}
      <Button
        variant="contained"
        color="primary"
        onClick={handleSaveProgress}
        style={{ marginTop: "3rem" }}
      >
        Save Progress
      </Button>
    </div>
  );
};

export default WorkoutTracking;
