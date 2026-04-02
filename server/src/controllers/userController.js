const User = require("../models/userModel");

// GET ALL USERS
exports.getAllUsers = async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    status: "success",
    results: users.length,
    data: { users },
  });
};

// GET SINGLE USER
exports.getUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user)
    return res.status(404).json({ status: "fail", message: "User not found" });

  res.status(200).json({
    status: "success",
    data: { user },
  });
};

// CREATE USER
exports.createUser = async (req, res) => {
  const newUser = await User.create(req.body);

  res.status(201).json({
    status: "success",
    data: { user: newUser },
  });
};

// UPDATE USER
exports.updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: { user },
  });
};

// DELETE USER
exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: "success",
    data: null,
  });
};

// Implementing location based filtering
// GET /api/v1/users/donors-within/:distance/center/:latlng
exports.getClosestDonors = async (req, res) => {
  try {
    const { distance, latlng } = req.params;
    const [lat, lng] = latlng.split(",");

    // MongoDB expects radius in radians (distance divided by radius of the Earth)
    // Earth radius = 3,963 miles or 6,378 km
    const radius = distance / 6378;

    if (!lat || !lng) {
      return res.status(400).json({
        message: "Please provide latitude and longitude in the format lat,lng.",
      });
    }

    const closestDonors = await User.find({
      location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
      role: "donor",
      isAvailable: true,
      // You could also add: bloodType: req.query.bloodType here
    });

    res.status(200).json({
      status: "success",
      results: closestDonors.length,
      data: { donors: closestDonors },
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

    // Pagination variables
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20; // Default to 20
    const skip = (page - 1) * limit; // Calculates how many documents to skip

    // $near requires distance in METERS, not radians
    const radiusInMeters = distance * 1000;

    if (!lat || !lng) {
      return res
        .status(400)
        .json({ message: "Please provide latitude and longitude." });
    }

    // Build the query object
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

    // Optional: If the frontend sends a specific blood type in the query (?bloodType=A+)
    if (req.query.bloodType) {
      query.bloodType = req.query.bloodType;
    }

    // Execute query with pagination
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

// Helper function to filter out fields we don't want updated
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

// GET /api/v1/users/me (To populate the frontend form)
exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
  // This will pass the ID to your existing getUser controller!
};

// PATCH /api/v1/users/updateMe (To save the changes)
exports.updateMe = async (req, res) => {
  try {
    // 1. Create error if user POSTs password data here
    if (req.body.password) {
      return res.status(400).json({
        message:
          "This route is not for password updates. Please use /updateMyPassword.",
      });
    }

    // 2. Filter out unwanted fields names that are not allowed to be updated
    // We only allow name, email, mobileNumber, location, and isAvailable
    const filteredBody = filterObj(
      req.body,
      "name",
      "email",
      "mobileNumber",
      "location",
      "isAvailable",
    );

    // 3. Update user document
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
      data: {
        user: updatedUser,
      },
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};
