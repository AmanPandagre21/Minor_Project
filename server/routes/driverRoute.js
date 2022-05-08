const express = require("express");
const router = express.Router();
const driverAuthMiddleware = require("../middleware/driverAuthMiddleware");
const {
  login,
  updateProfile,
  register,
  profile,
  drivers,
  logout,
  updatePassword,
  forgotPassword,
  resetPassword,
} = require("../controller/DriverController");

router.route("/login").post(login);

router.route("/register").post(register);

// router.route("/activate-driver").post(driverAuthMiddleware, activateDriver);

router.route("/profile").get(driverAuthMiddleware, profile);

router.route("/drivers").get(drivers);

router.route("/change-password").put(driverAuthMiddleware, updatePassword);

router.route("/me/update-me").put(driverAuthMiddleware, updateProfile);

router.route("/logout").get(driverAuthMiddleware, logout);

router.route("/forgot-password").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

module.exports = router;
