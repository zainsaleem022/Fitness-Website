import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Stack,
  styled,
  LinearProgress,
  Avatar,
} from "@mui/material";
import { linearProgressClasses } from "@mui/material";
import exTrackingIcon from "../assets/icons/exercise.png";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));

const GoalExerciseCard = ({ exercise, handleChildData }) => {
  const [trackingSets, setTrackingSets] = useState(0);
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [totalWeightLifted, setTotalWeightLifted] = useState(0);

  useEffect(() => {
    const totalWeight = parseInt(reps) * parseInt(weight) || 0;
    setTotalWeightLifted(totalWeightLifted + totalWeight);
  }, [trackingSets]);

  useEffect(() => {
    const data = {
      exercise: exercise.exercise, // Exercise name
      weight: totalWeightLifted, // Weight
      sets: trackingSets, // Tracking sets
      reps: reps, // Reps from exercise object
      dayOfWeek: exercise.dayOfWeek, // Day of the week from exercise object
      type_: "track", // Type of exercise
    };
    handleChildData(data);
  }, [trackingSets, totalWeightLifted, reps]);

  const handleIncrementSets = () => {
    if (weight.trim() === "" || reps.trim() === "") {
      alert("Please enter weight and reps before incrementing sets.");
    } else {
      setTrackingSets(trackingSets + 1);
    }
  };

  const handleReset = () => {
    setTrackingSets(0);
    setWeight("");
    setReps("");
    setTotalWeightLifted(0);
  };

  const isExerciseCompleted = trackingSets === exercise.sets;
  const isGoalAchieved = totalWeightLifted > parseInt(exercise.weight);

  const progress = (trackingSets / exercise.sets) * 100;

  return (
    <Card
      variant="outlined"
      style={{ marginBottom: "1rem", display: "inline-block" }}
    >
      <CardContent>
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
            alt={exercise.exercise}
            style={{
              width: 50,
              height: 50,
              marginRight: 10,
              backgroundColor: "orange",
            }}
          />

          <Typography variant="h5" component="h2" style={{ marginLeft: 8 }}>
            {exercise.exercise}
          </Typography>
        </div>
        <TextField
          name="sets"
          label="Sets"
          value={exercise.sets}
          style={{ marginTop: "1rem" }}
          readOnly
        />
        <TextField
          name="reps"
          label="Reps"
          value={exercise.reps}
          style={{ marginTop: "1rem" }}
          readOnly
        />
        <TextField
          name="weight"
          label="Weight"
          style={{ marginTop: "1rem" }}
          value={exercise.weight}
          readOnly
        />
        <Typography variant="h6" gutterBottom style={{ marginTop: "1rem" }}>
          Track Exercise:
        </Typography>
        <TextField
          name="trackingWeight"
          label="Enter Weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          fullWidth
        />
        <TextField
          name="trackingReps"
          label="Enter Reps"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
          fullWidth
        />
        {!isExerciseCompleted && (
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "1rem" }}
            onClick={handleIncrementSets}
          >
            Sets +1
          </Button>
        )}
        {isExerciseCompleted && (
          <Typography
            variant="body1"
            gutterBottom
            style={{ marginTop: "1rem" }}
          >
            Exercise Completed
          </Typography>
        )}
        {isGoalAchieved && (
          <Typography
            variant="body1"
            gutterBottom
            style={{ marginTop: "1rem", color: "green" }}
          >
            Great! You lifted more weight than your goal.
          </Typography>
        )}
        <Typography variant="body1" gutterBottom style={{ marginTop: "1rem" }}>
          Tracking Sets: {trackingSets}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Total Weight Lifted: {totalWeightLifted} lbs
        </Typography>
        <Stack spacing={2} sx={{ flexGrow: 1 }}>
          <BorderLinearProgress variant="determinate" value={progress} />
        </Stack>
        <Button
          variant="outlined"
          color="error"
          style={{ marginTop: "1rem" }} // Set text color to black
          onClick={handleReset}
        >
          Reset
        </Button>
      </CardContent>
    </Card>
  );
};

export default GoalExerciseCard;
