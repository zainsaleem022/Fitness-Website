import React, { useState } from "react";

import { Button } from "@mui/material";

import AddExerciseData from "./AddExerciseData";

const GoalSettingData = ({ day }) => {
  const [showForm, setShowForm] = useState(false);

  const handleAddClick = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div>
      <h3>{day}</h3>
      <Button onClick={handleAddClick}>Add</Button>
      {showForm && (
        <AddExerciseData onClose={handleCloseForm} dayOfWeek={day} />
      )}
    </div>
  );
};

export default GoalSettingData;
