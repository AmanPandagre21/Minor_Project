const express = require("express");
const router = express.Router();

/* ------- import controllers ---------*/
const {
  registration,
  logout,
  login,
  showProfile,
  showAllTravelAgencies,
  updatePassword,
  activateTravelAgencies,
  forgotPassword,
  resetPassword,
  addCarAndDriver,
  updateCarAndDriver,
  deleteCarAndDriver,
  createAgencyReview,
  showAgencyProfile,
  updateProfile,
  getAgencyReviews,
} = require("../controller/TravelAgencies");
const agencyMiddleware = require("../middleware/agencyMiddleware");
const store = require("../middleware/multer");
const authMiddleware = require("../middleware/authMiddleware");

/* ------- Travel Agencies ROUTES ---------*/

router.route("/registration").post(registration);

// router.route("/activate_agency").post(agencyMiddleware, activateTravelAgencies);

router.route("/login").post(login);

router.route("/profile").get(agencyMiddleware, showProfile);

router.route("/profile/:id").get(showAgencyProfile);

router.route("/profile/update").put(agencyMiddleware, updateProfile);

router.route("/travel_agencies").get(showAllTravelAgencies);

router.route("/activate-agency").put(agencyMiddleware, activateTravelAgencies);

router.route("/change_password").get(agencyMiddleware, updatePassword);

router.route("/forgot-password").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/add-car").put(agencyMiddleware, addCarAndDriver);

router.route("/reviews").get(getAgencyReviews);

router.route("/review").put(authMiddleware, createAgencyReview);

router
  .route("/cars-and-drivers/:id")
  .put(agencyMiddleware, updateCarAndDriver)
  .delete(agencyMiddleware, deleteCarAndDriver);

router.route("/logout").get(logout);

module.exports = router;
