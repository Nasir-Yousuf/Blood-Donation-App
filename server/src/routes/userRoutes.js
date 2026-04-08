const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController"); // 1. IMPORT AUTH CONTROLLER
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// --- AUTHENTICATION ROUTES ---
// 2. ADD REGISTER AND LOGIN ROUTES HERE
router.post("/register", authController.register);
router.post("/login", authController.login);

// --- PROFILE ROUTES ---
router.get(
  "/me",
  authMiddleware.protect,
  userController.getMe,
  userController.getUser,
);
router.patch("/updateMe", authMiddleware.protect, userController.updateMe);

// --- GEOSPATIAL ROUTE ---
router.get(
  "/donors-within/:distance/center/:latlng",
  // authMiddleware.protect, // (Optional: Only logged in users can search donors)
  userController.getClosestDonors,
);

// --- GENERAL CRUD ROUTES ---
router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
