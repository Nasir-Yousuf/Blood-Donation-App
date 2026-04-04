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
    urgency: {
      type: String,
      enum: ["High", "Critical", "Life-Threatening"],
      default: "High",
    },
    priorityValue: {
      type: Number,
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
      default: null,
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
    hospitalName: {
      type: String,
      required: [true, "Please provide the hospital or clinic name"],
    },
    hospitalAddress: {
      type: String,
      required: [true, "Please provide the exact hospital address"],
    },
    caseDetails: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

requestSchema.index({ location: "2dsphere" });

// 🚨 FIXED HOOK: Used 'async' so Mongoose handles it automatically without needing next()
requestSchema.pre("save", async function () {
  const priorityMap = {
    "Life-Threatening": 1,
    Critical: 2,
    High: 3,
  };

  // Assign the number based on the selected string
  this.priorityValue = priorityMap[this.urgency] || 3;
});

const Request = mongoose.model("Request", requestSchema);

module.exports = Request;
