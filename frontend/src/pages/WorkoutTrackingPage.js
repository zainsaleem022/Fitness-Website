import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import axios from "axios";

const WorkoutTracking = () => {
  const [goalExercises, setGoalExercises] = useState([]);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/bfit/workoutTracking"
        ); // Adjust the endpoint accordingly
        setGoalExercises(response.data); // Assuming response.data is an array of exercises
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    };

    fetchExercises();
  }, []);

  return (
    <>
      <div>WorkoutTrackingPage</div>
      {goalExercises.map((goalExercises, index) => (
        <Card key={index} variant="outlined">
          <CardContent>
            <Typography variant="h5" component="h2">
              {goalExercises.exercise}
            </Typography>
            <TextField
              name="sets"
              label="Sets"
              value={goalExercises.sets}
              readOnly // Make it read-only if you don't want users to edit
            />
            <TextField
              name="reps"
              label="Reps"
              value={goalExercises.reps}
              readOnly // Make it read-only if you don't want users to edit
            />
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default WorkoutTracking;
