const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "User must have a name"] },
    email: {
      type: String,
      required: [true, "User must have an email"],
      unique: true,
    },
    mobileNumber: {
      type: String,
      required: [true, "User must have a mobile number"],
    },
    password: {
      type: String,
      required: [true, "User must have a password"],
      select: false,
    },
    role: {
      type: String,
      enum: ["donor", "requester", "admin"],
      default: "donor",
    },
    bloodType: { type: String, required: true },
    location: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number], required: true }, // [longitude, latitude]
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: [
        true,
        "User must specify their gender for donation cooldown calculations",
      ],
    },
    nextAvailableDate: {
      type: Date,
      default: Date.now,
    },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true },
);

// CRITICAL FOR LOCATION SEARCH: Add a 2dsphere index
userSchema.index({ location: "2dsphere" });

// Hash password before saving to the database
userSchema.pre("save", async function (next) {
  // If password is not modified, skip hashing and move to the next middleware
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 12);
});

// Method to check if passwords match during login
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
