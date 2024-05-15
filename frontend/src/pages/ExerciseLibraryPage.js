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
} from "@mui/material";
import rickshaw from "../images/rickshaw.jpeg";
import singlelegpress from "../images/singlelegpress.jpeg";
import landmine from "../images/landmine.jpeg";
import weighted from "../images/weighted.jpeg";
import tbar from "../images/tbar.jpeg";
import palmdown from "../images/palmdown.jpeg";
import atlas from "../images/atlas.jpeg";
import dumb from "../images/dumb.jpeg";

const imageMap = {
  "Rickshaw Carry": rickshaw,
  "Single-Leg Press": singlelegpress,
  "Landmine twist": landmine,
  "Weighted pull-up": weighted,
  "T-Bar Row with Handle": tbar,
  "Palms-down wrist curl over bench": palmdown,
  "Atlas Stones": atlas,
  "Dumbbell front raise to lateral raise": dumb,
  // 'Wide-grip barbell curl': exercise2,
  // 'EZ-bar spider curl': exercise3,
  // Map other exercise names to images
};

const ExerciseLibrary = () => {
  const [exercises, setExercises] = useState([]);
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
              <CardMedia
                component="img"
                height="140"
                image={
                  imageMap[exercise.name] || "https://via.placeholder.com/150"
                }
                alt={exercise.name}
                sx={{ objectFit: "contain" }}
              />
              <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                  {exercise.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Type:</strong> {exercise.type}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Muscle:</strong> {exercise.muscle}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Equipment:</strong> {exercise.equipment}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Difficulty:</strong> {exercise.difficulty}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  <strong>Instructions:</strong>{" "}
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
