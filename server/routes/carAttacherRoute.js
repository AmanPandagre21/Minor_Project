const express = require("express");
const router = express.Router();
const {
  registration,
  logout,
  profile,
  activateCarAttacher,
  login,
  updatePassword,
  forgotPassword,
  resetPassword,
  updateCarDetails,
  getAllAttachers,
  // updateDriverDetails,
  deleteCar,
  addCars,
} = require("../controller/CarAttacherController");
const carAttacherAuthMiddleware = require("../middleware/carAttacherAuthMiddleware");

router.route("/registration").post(registration);

router.route("/login").post(login);

router.route("/profile").get(carAttacherAuthMiddleware, profile);

router.route("/car-attachers").get(getAllAttachers);

router
  .route("/activate-attacher")
  .put(carAttacherAuthMiddleware, activateCarAttacher);

router.route("/change-password").put(carAttacherAuthMiddleware, updatePassword);

router.route("/cars/add").put(carAttacherAuthMiddleware, addCars);

router
  .route("/cars/:id")
  .put(carAttacherAuthMiddleware, updateCarDetails)
  .delete(carAttacherAuthMiddleware, deleteCar);

// router
//   .route("/driver/:id")
//   .put(carAttacherAuthMiddleware, updateDriverDetails);

router.route("/logout").get(carAttacherAuthMiddleware, logout);

router.route("/forgot-password").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

module.exports = router;
