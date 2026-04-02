const Request = require("../models/requestModel");
const User = require("../models/userModel");

// CREATE REQUEST
exports.createRequest = async (req, res) => {
  const request = await Request.create(req.body);

  res.status(201).json({
    status: "success",
    data: { request },
  });
};

// GET ALL REQUESTS
exports.getAllRequests = async (req, res) => {
  const requests = await Request.find().populate("createdBy");

  res.status(200).json({
    status: "success",
    results: requests.length,
    data: { requests },
  });
};

exports.deleteRequest = async (req, res) => {
  await Request.findByIdAndDelete(req.params.id);

  res.status(201).json({
    status: "success",
    data: null,
  });
};

exports.updateRequest = async (req, res) => {
  const request = await Request.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    data: { request },
  });
};

// PATCH /api/v1/requests/:id/fulfill
exports.fulfillRequest = async (req, res) => {
  try {
    const { donorId } = req.body; // The ID of the donor who gave blood

    const donor = await User.findById(donorId);
    if (!donor) return res.status(404).json({ message: "Donor not found" });

    // 1. Calculate the cooldown period
    // 90 days for men, 120 days for women/other
    const cooldownDays = donor.gender === "female" ? 120 : 90;

    // Calculate future date in milliseconds
    const nextAvailable = new Date(
      Date.now() + cooldownDays * 24 * 60 * 60 * 1000,
    );

    // 2. Update the Donor
    await User.findByIdAndUpdate(donorId, {
      nextAvailableDate: nextAvailable,
      isAvailable: false, // Optional: You can keep this or just rely on nextAvailableDate
    });

    // 3. Update the Request
    const request = await Request.findByIdAndUpdate(
      req.params.id,
      {
        status: "fulfilled",
        assignedDonor: donorId,
      },
      { new: true },
    );

    res.status(200).json({
      status: "success",
      message: `Request fulfilled. Donor is on cooldown until ${nextAvailable.toDateString()}`,
      data: { request },
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

exports.createRequest = async (req, res) => {
  try {
    // Attach the logged-in user's ID to the request body
    req.body.createdBy = req.user._id;

    const request = await Request.create(req.body);

    res.status(201).json({
      status: "success",
      data: { request },
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

// GET /api/v1/requests/nearby/:distance
exports.getNearbyRequests = async (req, res) => {
  try {
    const { distance } = req.params;

    // Grab the logged-in donor's coordinates
    const [lng, lat] = req.user.location.coordinates;
    const radius = distance / 6378; // Convert km to radians

    const nearbyRequests = await Request.find({
      status: "pending", // Only show requests that haven't been accepted yet
      location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
    }).populate("createdBy", "name mobileNumber"); // Pull in the requester's contact info

    res.status(200).json({
      status: "success",
      results: nearbyRequests.length,
      data: { requests: nearbyRequests },
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

// PATCH /api/v1/requests/:id/accept
exports.acceptRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);

    if (!request) return res.status(404).json({ message: "Request not found" });
    if (request.status !== "pending")
      return res.status(400).json({
        message: "This request has already been accepted or fulfilled.",
      });

    // Update the request status and assign the logged-in donor
    request.status = "accepted";
    request.assignedDonor = req.user._id;
    await request.save();

    res.status(200).json({
      status: "success",
      message:
        "You have accepted this request. Please contact the recipient immediately.",
      data: { request },
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

// GET /api/v1/requests/nearby/:distance?page=1&limit=20
exports.getNearbyRequests = async (req, res) => {
  try {
    const { distance } = req.params;

    // Grab the logged-in donor's coordinates
    const [lng, lat] = req.user.location.coordinates;

    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const radiusInMeters = distance * 1000;

    const nearbyRequests = await Request.find({
      status: "pending",
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)],
          },
          $maxDistance: radiusInMeters,
        },
      },
    })
      .populate("createdBy", "name mobileNumber")
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      status: "success",
      results: nearbyRequests.length,
      page,
      data: { requests: nearbyRequests },
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

// GET /api/v1/requests/my-requests (For the Recipient)
// Shows requests the logged-in user has created
exports.getMyCreatedRequests = async (req, res) => {
  try {
    const myRequests = await Request.find({ createdBy: req.user._id })
      .populate("assignedDonor", "name mobileNumber bloodType") // Pulls in donor info if accepted
      .sort("-createdAt"); // Sorts newest to oldest

    res.status(200).json({
      status: "success",
      results: myRequests.length,
      data: { requests: myRequests },
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

// GET /api/v1/requests/my-donations (For the Donor)
// Shows requests the logged-in user has accepted
exports.getMyAcceptedRequests = async (req, res) => {
  try {
    const myDonations = await Request.find({ assignedDonor: req.user._id })
      .populate("createdBy", "name mobileNumber location") // Pulls in recipient info
      .sort("-createdAt");

    res.status(200).json({
      status: "success",
      results: myDonations.length,
      data: { requests: myDonations },
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};
