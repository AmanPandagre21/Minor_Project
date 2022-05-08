const mongoose = require("mongoose");
const validator = require("validator");

const TravelAgenciesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter Your Travel Agency name"],
    },

    email: {
      type: String,
      required: true,
      unique: [true, "Email already exists"],
      validate: [validator.isEmail, "Please Enter a valid Email"],
    },

    phone: { type: Number, required: [true, "Please enter a Phone Number"] },

    password: { type: String, required: true, select: false },

    avatar: {
      public_id: String,
      url: String,
    },

    state: { type: String },
    city: { type: String },
    address: { type: String },
    pincode: { type: Number },
    isAgencyActivated: { type: Boolean, required: true, default: false },

    // isAgencyVerified: { type: Boolean, required: true, default: false },
    // owner: {
    //   name: {
    //     type: String,
    //     required: [true, "Please enter Your Travel Agency name"],
    //   },

    //   email: {
    //     type: String,
    //     required: false,
    //     unique: [true, "Email already exists"],
    //     validate: [validator.isEmail, "Please Enter a valid Email"],
    //   },

    //   phone: { type: Number, required: [true, "Please enter a Phone Number"] },

    //   avatar: {
    //     public_id: String,
    //     url: String,
    //   },
    // },

    carsAndDrivers: [
      {
        cars: {
          carName: String,
          carType: String,
          ac: Boolean,
          seats: Number,
          bags: String,
          pricePerKm: Number,
          fuelType: String,
          carImage: {
            public_id: String,
            url: String,
          },
        },
        driver: {
          driverName: String,
          email: String,
          phone: Number,
          driverAvatar: {
            public_id: String,
            url: String,
          },
        },
      },
    ],

    reviews: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],

    ratings: {
      type: Number,
      default: 0,
    },

    carAttachers: [
      {
        attacgerId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "CarAttacher",
        },
        status: String,
      },
    ],

    // driver: [{ type: mongoose.Schema.Types.ObjectId, ref: "Driver" }],

    // users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    role: { type: String, default: "travelAgency" },
    resetPasswordToken: String,
    resetPasswordTokeExpires: Date,
  },
  {
    timestamps: true,
    toJSON: { getters: true },
  }
);

module.exports = mongoose.model("TravelAgency", TravelAgenciesSchema);
