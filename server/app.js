const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const userRoutes = require("./src/routes/userRoutes");
const requestRoutes = require("./src/routes/requestRoutes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/requests", requestRoutes);

// 🚨 FIXED: Global Error Handler (MUST have all 4 parameters: err, req, res, next)
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  res.status(err.statusCode).json({
    status: "error",
    message: err.message,
  });
});

module.exports = app;
