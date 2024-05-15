import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import AddExerciseData from "./AddExerciseData";
import ExerciseEntry from "./ExerciseEntry";

const GoalSettingData = ({ day }) => {
  const [showForm, setShowForm] = useState(false);
  const [exerciseData, setExerciseData] = useState([]);

  useEffect(() => {
    fetchExerciseData();
  }, [day]); // Trigger fetch when day changes

  const fetchExerciseData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/bfit/goalSetting?dayOfWeek=${day}`);
      if (response.ok) {
        const data = await response.json();
        setExerciseData(data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleAddClick = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleAdd = () => {
    // Call fetchExerciseData to refresh the data after add
    fetchExerciseData();
  };

  const handleDelete = () => {
    // Call fetchExerciseData to refresh the data after delete
    fetchExerciseData();
  };

  const handleUpdate = () => {
    // Call fetchExerciseData to refresh the data after update
    fetchExerciseData();
  };

  // Filter exercises for the specific day
  console.log(exerciseData);
  const exercisesForDay = exerciseData.filter(exercise => exercise.dayOfWeek === day);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h3 style={{ marginRight: "1rem" }}>{day}</h3>
        <Button onClick={handleAddClick}>Add</Button>
      </div>
      {showForm && <AddExerciseData onClose={handleCloseForm} dayOfWeek={day} onAdd={handleAdd} existingExercises={exercisesForDay} />}
      {exercisesForDay.length > 0 && (
        <div>
          {exercisesForDay.map((exercise, index) => (
            <ExerciseEntry key={index} exercise={exercise} existingExercises={exercisesForDay}
            onDelete={handleDelete} 
            onUpdate={handleUpdate} />
          ))}
        </div>
      )}
    </div>
  );
};

export default GoalSettingData;
