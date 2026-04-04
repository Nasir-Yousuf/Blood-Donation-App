const User = require("../models/userModel");

// Helper function for updateMe
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

// 🚨 FIXED: 'next' is now properly in the parameters here!
exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateMe = async (req, res) => {
  try {
    if (req.body.password) {
      return res.status(400).json({
        message: "This route is not for password updates.",
      });
    }

    const filteredBody = filterObj(
      req.body,
      "name",
      "email",
      "mobileNumber",
      "location",
      "isAvailable",
    );

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      filteredBody,
      {
        new: true,
        runValidators: true,
      },
    );

    res.status(200).json({
      status: "success",
      data: { user: updatedUser },
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

// GET /api/v1/users/donors-within/:distance/center/:latlng?page=1&limit=20
exports.getClosestDonors = async (req, res) => {
  try {
    const { distance, latlng } = req.params;
    const [lat, lng] = latlng.split(",");

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const radiusInMeters = distance * 1000;

    if (!lat || !lng) {
      return res
        .status(400)
        .json({ message: "Please provide latitude and longitude." });
    }

    const query = {
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)],
          },
          $maxDistance: radiusInMeters,
        },
      },
      role: "donor",
      isAvailable: true,
    };

    if (req.query.bloodType) {
      query.bloodType = req.query.bloodType;
    }

    const closestDonors = await User.find(query).skip(skip).limit(limit);

    res.status(200).json({
      status: "success",
      results: closestDonors.length,
      page,
      data: { donors: closestDonors },
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

// GET ALL USERS
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "success",
      results: users.length,
      data: { users },
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

// GET SINGLE USER
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user)
      return res
        .status(404)
        .json({ status: "fail", message: "User not found" });

    res.status(200).json({
      status: "success",
      data: { user },
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

// CREATE USER
exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json({
      status: "success",
      data: { user: newUser },
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

// UPDATE USER
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: { user },
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

// DELETE USER
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};
