import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Box,
  CardMedia,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import rickshaw from "../assets/images/rickshaw.jpeg";
import singlelegpress from "../assets/images/singlelegpress.jpeg";
import landmine from "../assets/images/landmine.jpeg";
import weighted from "../assets/images/weighted.jpeg";
import tbar from "../assets/images/tbar.jpeg";
import palmdown from "../assets/images/palmdown.jpeg";
import atlas from "../assets/images/atlas.jpeg";
import dumb from "../assets/images/dumb.jpeg";
import clean from "../assets/images/clean.jpeg";
import hammer from "../assets/images/hammer.jpeg";

const imageMap = {
  "Rickshaw Carry": rickshaw,
  "Single-Leg Press": singlelegpress,
  "Landmine twist": landmine,
  "Weighted pull-up": weighted,
  "T-Bar Row with Handle": tbar,
  "Palms-down wrist curl over bench": palmdown,
  "Atlas Stones": atlas,
  "Dumbbell front raise to lateral raise": dumb,
  "Clean from Blocks": clean,
  "Incline Hammer Curls": hammer,
};

const getDifficultyColor = (difficulty) => {
  switch (difficulty.toLowerCase()) {
    case "beginner":
      return "green";
    case "intermediate":
      return "orange";
    case "advanced":
      return "red";
    default:
      return "gray";
  }
};

const formatDifficulty = (difficulty) => {
  return difficulty.toLowerCase() === "intermediate" ? "medium" : difficulty;
};

const truncateName = (name) => {
  const words = name.split(" ");
  return words.length > 4 ? words.slice(0, 3).join(" ") : name;
};

const ExerciseLibrary = () => {
  const [exercises, setExercises] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get(
          "https://api.api-ninjas.com/v1/exercises",
          {
            headers: {
              "X-Api-Key": "fm5P+qr07nI12K1hQjQjrw==wKT0AocQPVu4HVgy",
            },
          }
        );
        console.log(response.data); // Log the response data
        setExercises(response.data.slice(0, 10)); // Get at least 10 exercises
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    };

    fetchExercises();
  }, []);

  const filteredExercises = exercises.filter((exercise) =>
    exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddToFavorites = (exercise) => {
    setFavorites((prevFavorites) => [...prevFavorites, exercise]);
  };

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Exercise Library
        </Typography>
        <TextField
          label="Search Exercises"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>
      <Grid container spacing={4}>
        {filteredExercises.map((exercise) => (
          <Grid item xs={12} sm={6} md={4} key={exercise.name}>
            <Card>
              <Box
                sx={{
                  position: "relative",
                  paddingTop: "56.25%" /* 16:9 aspect ratio */,
                }}
              >
                <CardMedia
                  component="img"
                  image={
                    imageMap[exercise.name] || "https://via.placeholder.com/150"
                  }
                  alt={exercise.name}
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    variant="h6"
                    component="div"
                    gutterBottom
                    sx={{ fontWeight: "bold" }}
                  >
                    {truncateName(exercise.name)}
                  </Typography>
                  <IconButton
                    color="primary"
                    aria-label="add to favorites"
                    onClick={() => handleAddToFavorites(exercise)}
                    sx={{ boxShadow: 3 }}
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      <Typography component="span" sx={{ fontWeight: "bold" }}>
                        Type:
                      </Typography>{" "}
                      {exercise.type}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      <Typography component="span" sx={{ fontWeight: "bold" }}>
                        Muscle:
                      </Typography>{" "}
                      {exercise.muscle}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      <Typography component="span" sx={{ fontWeight: "bold" }}>
                        Equipment:
                      </Typography>{" "}
                      {exercise.equipment}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      <Typography component="span" sx={{ fontWeight: "bold" }}>
                        Difficulty:
                      </Typography>{" "}
                      <span
                        style={{
                          backgroundColor: getDifficultyColor(
                            exercise.difficulty
                          ),
                          color: "white",
                          padding: "2px 4px",
                          borderRadius: "4px",
                        }}
                      >
                        {formatDifficulty(exercise.difficulty)}
                      </span>
                    </Typography>
                  </Grid>
                </Grid>
                <Typography variant="body2" color="text.secondary" mt={1}>
                  <Typography component="span" sx={{ fontWeight: "bold" }}>
                    Instructions:
                  </Typography>{" "}
                  {exercise.instructions.split(". ")[0]}.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ExerciseLibrary;
