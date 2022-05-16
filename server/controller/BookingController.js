const Booking = require("../models/bookingModel");
const ErrorHandler = require("../utils/errorHandler");

exports.createBooking = async (req, res, next) => {
  try {
    const {
      pickupPoint,
      destination,
      pikupDate,
      pickupTime,
      dropDate,
      tripType,
      taxPrice,
      totalPrice,
      paymentInfo,
      agency,
    } = req.body;

    if (tripType === "round trip");

    const booking = await Booking.create({
      pickupPoint,
      destination,
      pikupDate,
      pickupTime,
      dropDate,
      tripType,
      taxPrice,
      totalPrice,
      paymentInfo,
      paidAt: Date.now(),
      user: req.user._id,
      agency,
    });

    res.status(200).json({
      success: true,
      booking,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

exports.getSingleBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id).populate(
      "agency.agencyId",
      "name email phone"
    );

    if (!booking)
      return next(new ErrorHandler("Booking not found with these id."));

    res.status(200).json({ success: true, booking });
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
};

exports.myBookings = async (req, res, next) => {
  try {
    const booking = await Booking.find({ user: req.user._id });

    res.status(200).json({ success: true, booking });
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
};

exports.agencyBooking = async (req, res, next) => {
  try {
    const booking = await Booking.find({
      agency: { agencyId: req.agency._id },
    });

    res.status(200).json({ success: true, booking });
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
};
