const Request = require("../models/requestModel");

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
