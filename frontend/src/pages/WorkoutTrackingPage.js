import React from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import BfitNavbar from "../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";

const WorkoutTracking = () => {
  const [goals, setGoals] = useState([]);

  // Fetch goals from the backend when the component mounts
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await axios.get("/api/goals"); // Adjust the endpoint accordingly
        setGoals(response.data.goals);
      } catch (error) {
        console.error("Error fetching goals:", error);
      }
    };

    fetchGoals();
  }, []);

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    // Update the corresponding goal's sets or reps value in the state
    const updatedGoals = goals.map((goal, i) =>
      i === index ? { ...goal, [name]: value } : goal
    );
    setGoals(updatedGoals);
  };

  const handleSubmit = async () => {
    try {
      // Send the updated goals to the backend
      await axios.post("/api/goals/update", { goals }); // Adjust the endpoint accordingly
      // Optionally, you can show a success message or perform any other actions upon successful submission
    } catch (error) {
      console.error("Error updating goals:", error);
    }
  };

  return (
    <>
      <div>WorkoutTrackingPage</div>
      {goals.map((goal, index) => (
        <Card key={index} variant="outlined">
          <CardContent>
            <Typography variant="h5" component="h2">
              {goal.exercise}
            </Typography>
            <TextField
              name="sets"
              label="Sets"
              value={goal.sets}
              onChange={(event) => handleInputChange(event, index)}
            />
            <TextField
              name="reps"
              label="Reps"
              value={goal.reps}
              onChange={(event) => handleInputChange(event, index)}
            />
          </CardContent>
        </Card>
      ))}
      <Button onClick={handleSubmit} variant="contained" color="primary">
        Submit
      </Button>
    </>
  );
};

export default WorkoutTracking;
