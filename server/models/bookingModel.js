const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    pickupPoint: { type: String, required: true },
    destination: { type: String, required: true },
    pickupDate: { type: Date },
    dropDate: { type: Date },
    pickupTime: Date,
    dropTime: Date,
    tripType: { type: String },
    taxPrice: { type: Number, default: 800 },
    totalPrice: { type: Number, required: true },
    paymentInfo: {
      transactionId: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        required: true,
      },
    },
    paidAt: {
      type: Date,
      required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    agency: {
      agencyId: { type: mongoose.Schema.Types.ObjectId, ref: "TravelAgency" },
      carId: { type: mongoose.Schema.Types.ObjectId, ref: "TravelAgency" },
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
  }
);

module.exports = mongoose.model("Booking", BookingSchema);
