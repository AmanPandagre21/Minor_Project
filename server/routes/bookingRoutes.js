const express = require("express");
const {
  createBooking,
  getSingleBooking,
} = require("../controller/BookingController");
const router = express.Router();
const agencyMiddleware = require("../middleware/agencyMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

router.route("/new").post(authMiddleware, createBooking);

router.route("/:id").get(authMiddleware, getSingleBooking);

module.exports = router;
