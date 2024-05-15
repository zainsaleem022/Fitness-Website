import React from "react";
import GoalSettingData from "../components/goalSettingData";
const GoalSetting = () => {
  return (
    <div>
      <GoalSettingData day="Monday" />
      <GoalSettingData day="Tuesday" />
      <GoalSettingData day="Wednesday" />
    </div>
  );
};
export default GoalSetting;
