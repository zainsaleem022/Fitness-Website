import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import BfitNavbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ExerciseLibrary from "./pages/ExerciseLibraryPage";
import GoalSetting from "./pages/GoalSettingPage";
import WorkoutTrackingPage from "./pages/WorkoutTrackingPage";
import AboutUsPage from "./pages/AboutUsPage";

const App = () => {
  return (
    <Router>
      <div>
        {/* <BfitNavbar /> */}
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/exerciseLibrary" component={ExerciseLibrary} />
          <Route path="/goalSetting" component={GoalSetting} />
          <Route path="/workoutTracking" component={WorkoutTrackingPage} />
          <Route path="/about" component={AboutUsPage} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
