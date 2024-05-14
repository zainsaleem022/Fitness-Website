const express = require("express");
const { chats } = require("./data/data");
const dotenv = require("dotenv");
const connectDB = require("./database.js");
const colors = require("colors");
const userRoutes = require("./routes/Routes.js");
const {
  notFound,
  errorHandler,
} = require("./middleware/errorHandlerMiddleware");
