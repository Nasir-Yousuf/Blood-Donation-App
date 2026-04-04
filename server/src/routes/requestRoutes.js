const express = require("express");
const requestController = require("../controllers/requestController");
const authMiddleware = require("../middlewares/authMiddleware"); // 1. IMPORT MIDDLEWARE

const router = express.Router();

// Put these ABOVE router.route("/:id") or router.route("/")

// 🚨 NEW PUBLIC ROUTE ADDED HERE (No authMiddleware)
router.get("/nearby-public/", requestController.getPublicNearbyRequests);

router.get(
  "/my-requests",
  authMiddleware.protect,
  requestController.getMyCreatedRequests,
);
router.get(
  "/my-donations",
  authMiddleware.protect,
  requestController.getMyAcceptedRequests,
);
router.get(
  "/nearby/:distance",
  authMiddleware.protect,
  requestController.getNearbyRequests,
);

router
  .route("/")
  .get(requestController.getAllRequests) // You can leave this unprotected if you want anyone to see all requests
  .post(authMiddleware.protect, requestController.createRequest); // 2. PROTECT THIS ROUTE

router
  .route("/:id")
  .delete(authMiddleware.protect, requestController.deleteRequest)
  .patch(authMiddleware.protect, requestController.updateRequest);

router.patch(
  "/:id/accept",
  authMiddleware.protect,
  requestController.acceptRequest,
);

module.exports = router;
