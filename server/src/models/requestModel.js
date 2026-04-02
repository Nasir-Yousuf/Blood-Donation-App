const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    patientName: {
      type: String,
      required: true,
    },
    bloodType: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    urgency: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    contactNumber: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "fulfilled"],
      default: "pending",
    },
    assignedDonor: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      default: null, // Starts as null until someone accepts
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

requestSchema.index({ location: "2dsphere" });

const Request = mongoose.model("Request", requestSchema);

module.exports = Request;
