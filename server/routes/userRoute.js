const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

// import controlers
const {
  sendOTP,
  verifyOTP,
  refresh,
  activateUser,
  profile,
  logout,
  updateProfile,
  addContacts,
  showContacts,
} = require("../controller/User");

/* ------- USER ROUTES ---------*/

router.route("/send-otp").post(sendOTP);

router.route("/verify-otp").post(verifyOTP);

router.route("/activate-user").post(authMiddleware, activateUser);

router.route("/me").get(authMiddleware, profile);

router.route("/update-profile").put(authMiddleware, updateProfile);

router.route("/add-contacts").post(authMiddleware, addContacts);

router.route("/show-contacts").get(authMiddleware, showContacts);

router.route("/logout").get(authMiddleware, logout);

router.route("/refresh").get(refresh);

module.exports = router;
