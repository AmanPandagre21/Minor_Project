const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },

    phone: {
      type: Number,
      required: [true, "Please enter a Phone Number"],
    },

    email: {
      type: String,
      required: false,
      // unique: [true, "Email already exists"],
      validate: [validator.isEmail, "Please Enter a valid Email"],
    },

    avatar: {
      public_id: String,
      url: String,
    },

    activated: { type: Boolean, required: false, default: false },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
  }
);

module.exports = mongoose.model("User", userSchema);
