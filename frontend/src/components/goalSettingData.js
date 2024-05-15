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
      <div style={{ display: "flex", alignItems: "center" }}>
        <h3 style={{ marginRight: "1rem" }}>{day}</h3>
        <Button onClick={handleAddClick}>Add</Button>
      </div>
      {showForm && <AddExerciseData onClose={handleCloseForm} dayOfWeek={day} />}
    </div>
  );
};

export default GoalSettingData;
