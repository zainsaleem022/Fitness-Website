import React from "react";
import GoalSettingData from "../components/goalSettingData";
const GoalSetting = () => {
  return (
    <div>
      <GoalSettingData day="Monday" />
      <GoalSettingData day="Tuesday" />
      <GoalSettingData day="Wednesday" />
      <GoalSettingData day="Thursday" />
      <GoalSettingData day="Friday" />
      <GoalSettingData day="Saturday" />
      <GoalSettingData day="Sunday" />
    </div>
  );
};
export default GoalSetting;
