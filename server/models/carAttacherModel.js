const mongoose = require("mongoose");
const validator = require("validator");

const carAttacherSchema = new mongoose.Schema(
  {
    ower_name: { type: String },
    email: {
      type: String,
      required: true,
      unique: [true, "Email already exists"],
      validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    avatar: { public_id: String, url: String },
    state: String,
    city: String,
    phone: { type: Number },
    password: { type: String, required: true, select: false },
    isAttacherActivated: { type: Boolean, required: true, default: false },
    // driver: {
    //   name: String,
    //   email: String,
    //   phone: String,
    //   driverAvatar: {
    //     public_id: String,
    //     url: String,
    //   },
    // },
    carDetails: [
      {
        carName: String,
        carType: String,
        ac: Boolean,
        bags: String,
        seats: Number,
        pricePerKm: Number,
        fuelType: String,
        withDriver: { type: String, default: "withoutDriver" },
        carImage: {
          public_id: String,
          url: String,
        },
      },
    ],

    travelAgencies: [
      {
        agencyId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "TravelAgency",
        },
        status: String,
      },
    ],

    role: { type: String, default: "carAttacher" },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    // isAttacherVerified: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
  }
);

module.exports = mongoose.model("CarAttacher", carAttacherSchema);
