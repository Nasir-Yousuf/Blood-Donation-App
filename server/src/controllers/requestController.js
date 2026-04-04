const Request = require("../models/requestModel");
const User = require("../models/userModel");

// CREATE REQUEST
exports.createRequest = async (req, res) => {
  try {
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

// GET ALL REQUESTS
exports.getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find().populate("createdBy");
    res.status(200).json({
      status: "success",
      results: requests.length,
      data: { requests },
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

// DELETE REQUEST (🔥 SECURE: Only the creator can delete their post)
exports.deleteRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    // Check if the logged-in user is the one who created this request
    if (request.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        status: "fail",
        message: "Unauthorized: You can only delete your own requests.",
      });
    }

    await Request.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

// UPDATE REQUEST
exports.updateRequest = async (req, res) => {
  try {
    const request = await Request.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: { request },
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

// ACCEPT REQUEST
exports.acceptRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);

    if (!request) return res.status(404).json({ message: "Request not found" });
    if (request.status !== "pending")
      return res.status(400).json({
        message: "This request has already been accepted or fulfilled.",
      });

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

// FULFILL REQUEST
exports.fulfillRequest = async (req, res) => {
  try {
    const { donorId } = req.body;

    const donor = await User.findById(donorId);
    if (!donor) return res.status(404).json({ message: "Donor not found" });

    const cooldownDays = donor.gender === "female" ? 120 : 90;
    const nextAvailable = new Date(
      Date.now() + cooldownDays * 24 * 60 * 60 * 1000,
    );

    await User.findByIdAndUpdate(donorId, {
      nextAvailableDate: nextAvailable,
      isAvailable: false,
    });

    const request = await Request.findByIdAndUpdate(
      req.params.id,
      { status: "fulfilled", assignedDonor: donorId },
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

// GET NEARBY REQUESTS
exports.getNearbyRequests = async (req, res) => {
  try {
    const { distance } = req.params;
    const [lng, lat] = req.user.location.coordinates;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const radiusInMeters = distance * 1000;

    const nearbyRequests = await Request.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)],
          },
          distanceField: "distance",
          maxDistance: radiusInMeters,
          query: { status: "pending" },
          spherical: true,
          distanceMultiplier: 0.001,
        },
      },
      { $sort: { priorityValue: 1, distance: 1 } },
      { $skip: skip },
      { $limit: limit },
      {
        $lookup: {
          from: "users",
          localField: "createdBy",
          foreignField: "_id",
          as: "creatorInfo",
        },
      },
      { $unwind: "$creatorInfo" },
      {
        $project: {
          patientName: 1,
          bloodType: 1,
          urgency: 1,
          priorityValue: 1,
          contactNumber: 1,
          status: 1,
          location: 1,
          hospitalName: 1,
          hospitalAddress: 1,
          caseDetails: 1,
          distance: 1,
          createdAt: 1,
          "creatorInfo.name": 1,
          "creatorInfo.mobileNumber": 1,
        },
      },
    ]);

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

// GET PUBLIC NEARBY REQUESTS (🔥 UPDATED to expose createdBy ID)
exports.getPublicNearbyRequests = async (req, res) => {
  try {
    const { lat, lng, urgency, bloodType, maxDistance } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const matchQuery = { status: "pending" };

    if (urgency) matchQuery.urgency = urgency;
    if (bloodType) matchQuery.bloodType = decodeURIComponent(bloodType);

    let pipeline = [];

    if (lat && lng && lat !== "undefined" && lng !== "undefined") {
      const geoNearStage = {
        near: {
          type: "Point",
          coordinates: [parseFloat(lng), parseFloat(lat)],
        },
        distanceField: "distance",
        query: matchQuery,
        spherical: true,
        distanceMultiplier: 0.001,
      };
      if (maxDistance)
        geoNearStage.maxDistance = parseFloat(maxDistance) * 1000;

      pipeline.push({ $geoNear: geoNearStage });
      pipeline.push({ $sort: { priorityValue: 1, distance: 1 } });
    } else {
      pipeline.push({ $match: matchQuery });
      pipeline.push({ $sort: { priorityValue: 1, createdAt: -1 } });
    }

    pipeline.push(
      { $skip: skip },
      { $limit: limit },
      {
        $lookup: {
          from: "users",
          localField: "createdBy",
          foreignField: "_id",
          as: "creatorInfo",
        },
      },
      { $unwind: { path: "$creatorInfo", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          patientName: 1,
          bloodType: 1,
          urgency: 1,
          priorityValue: 1,
          contactNumber: 1,
          status: 1,
          location: 1,
          hospitalName: 1,
          hospitalAddress: 1,
          caseDetails: 1,
          distance: 1,
          createdAt: 1,
          createdBy: 1, // <--- 🔥 WE NOW SEND THIS SO THE FRONTEND CAN HIDE THE BUTTON
          "creatorInfo.name": 1,
          "creatorInfo.mobileNumber": 1,
        },
      },
    );

    const requests = await Request.aggregate(pipeline);

    res.status(200).json({
      status: "success",
      results: requests.length,
      page,
      data: { requests },
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

// GET MY CREATED REQUESTS
exports.getMyCreatedRequests = async (req, res) => {
  try {
    const myRequests = await Request.find({ createdBy: req.user._id })
      .populate("assignedDonor", "name mobileNumber bloodType")
      .sort("-createdAt");

    res.status(200).json({
      status: "success",
      results: myRequests.length,
      data: { requests: myRequests },
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

// GET MY ACCEPTED REQUESTS
exports.getMyAcceptedRequests = async (req, res) => {
  try {
    const myDonations = await Request.find({ assignedDonor: req.user._id })
      .populate("createdBy", "name mobileNumber location")
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
