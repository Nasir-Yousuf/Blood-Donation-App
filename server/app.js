const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const userRoutes = require("./src/routes/userRoutes");
const requestRoutes = require("./src/routes/requestRoutes");

const app = express();

// Middlewares
app.use(
  cors({
    origin: "*",
  }),
);
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/requests", requestRoutes);

// 🚨 Global Error Handler
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  res.status(err.statusCode).json({
    status: "error",
    message: err.message,
  });
});

module.exports = app;
