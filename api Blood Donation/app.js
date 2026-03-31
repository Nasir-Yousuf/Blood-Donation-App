const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const userRoutes = require("./src/routes/userRoutes");
const requestRoutes = require("./src/routes/requestRoutes");

const app = express();

app.use(express.json());

// if (process.env.NODE_ENV === "development") {
app.use(morgan("dev"));
// }

const testRouter = express.Router();

const testSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, "You have to put your name in there"],
  },
  createdAt: {
    type: String,
    default: () => new Date(),
  },
});

const Test = mongoose.model("Test", testSchema);

const getAllTest = async (req, res) => {
  const test = await Test.find();
  res.status(200).json({
    name: "You are the real hero",
    test: { test },
  });
};

const createTest = async (req, res) => {
  const newTest = await Test.create(req.body);

  res.status(201).json({
    newTest: {
      newTest,
    },
  });
};
const getTestById = async (req, res) => {
  const testById = await Test.findById(req.params.id);

  res.status(200).json({
    data: {
      testById,
    },
  });
};
testRouter.route("/hallo").get(getAllTest).post(createTest);
testRouter.route("/hallo/:id").get(getTestById);

// VERSIONING ✅
app.use("/", testRouter);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/requests", requestRoutes);

module.exports = app;
// api Blood Donation/src/routes/userRoutes.js
