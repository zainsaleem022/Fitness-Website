import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
} from "@mui/material";

function WorkoutCard({ workout }) {
  const [reps, setReps] = useState(0);

  const handleIncrementSets = () => {
    // Implement your logic to increment sets
  };

  const handleRepsChange = (event) => {
    setReps(parseInt(event.target.value, 10));
  };

  const handleSaveWorkout = () => {
    // Implement your logic to save the workout
    // You can calculate the work done using reps and sets
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{workout.exercise}</Typography>
        <Typography>Weight: {workout.weight}</Typography>
        <Typography>Sets: {workout.sets}</Typography>
        <Typography>Reps: {workout.reps}</Typography>
        <Typography>Day of Week: {workout.dayOfWeek}</Typography>
        <Button onClick={handleIncrementSets}>+1</Button>
        <TextField
          label="Reps"
          type="number"
          value={reps}
          onChange={handleRepsChange}
          inputProps={{ min: 0 }}
        />
        <Button onClick={handleSaveWorkout}>Save Workout</Button>
      </CardContent>
    </Card>
  );
}

export default WorkoutCard;
