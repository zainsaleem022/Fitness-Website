const express = require("express");
const {
  notFound,
  errorHandler,
} = require("./middleware/errorHandlerMiddleware");
const userRoutes = require("./routes/userRoutes");
const { connectDB } = require("./database");

// Load environment variables from .env file
require("dotenv").config();
// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); //to accept JSON data

// Routes
app.use("/", userRoutes);

// Error handling middleware
//app.use(notFound);
//app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
