import React, { useState } from "react";
import { TextField, Button, Card, CardContent } from "@mui/material";

const AddExerciseData = ({ onClose, dayOfWeek }) => {
  const [exercise, setExercise] = useState("");
  const [weight, setWeight] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");

  const isFormFilled = exercise !== "" && weight !== "" && sets !== "" && reps !== "";

  const handleSubmit = () => {
    if (isFormFilled) {
      // Here you can send the data to MongoDB
      alert("Data added successfully");
      onClose(); // Close the form
    } else {
      alert("Please fill all fields");
    }

  };
  
  return (
    <Card>
      <CardContent>
        <div style={{ marginBottom: 16 }}>
          <TextField
            label="Exercise Name"
            value={exercise}
            onChange={(e) => setExercise(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <TextField
            label="Weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <TextField
            label="Sets"
            value={sets}
            onChange={(e) => setSets(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <TextField
            label="Reps"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
          />
        </div>
        <div>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Add
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AddExerciseData;
