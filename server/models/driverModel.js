const mongoose = require("mongoose");
const validator = require("validator");

const driverSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: {
      type: String,
      required: true,
      unique: [true, "Email already exists"],
      validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    avatar: { public_id: String, url: String },
    phone: { type: Number },
    city: String,
    password: { type: String, required: true, select: false },
    isDriverActivated: { type: Boolean, required: true, default: false },
    // isDriverVerified: { type: Boolean, required: true, default: false },
    // registration_certificate: { type: String, required: true, default: null },
    // license: { type: String, required: true, default: null },
    // panCard: { type: String, required: true, default: null },
    // reviews: [
    //   {
    //     user: {
    //       type: mongoose.Schema.ObjectId,
    //       ref: "User",
    //       required: true,
    //     },
    //     name: {
    //       type: String,
    //       required: true,
    //     },
    //     rating: {
    //       type: Number,
    //       required: true,
    //     },
    //     comment: {
    //       type: String,
    //       required: true,
    //     },
    //   },
    // ],

    // trvelAgencies: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "TravelAgency",
    //     status: { type: Boolean, default: "false" },
    //   },
    // ],

    role: { type: String, default: "Driver" },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
    toJSON: { getters: true },
  }
);

module.exports = mongoose.model("Driver", driverSchema);
