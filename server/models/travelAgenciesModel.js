const mongoose = require("mongoose");
const validator = require("validator");

const TravelAgenciesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter Your Travel Agency name"],
  },

  email: {
    type: String,
    required: false,
    unique: [true, "Email already exists"],
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },

  phone: { type: Number, required: [true, "Please enter a Phone Number"] },

  password: {
    type: String,
    required: true,
    minLength: [8, "Password must be 8 characters"],
    validate: [
      validator.isAlphanumeric,
      "Password must contain numbers and alphabet",
    ],
  },

  whatsapp: {
    type: Number,
    required: [true, "Please enter a Whatsapp Number"],
  },

  state: { type: String, required: [true, "Please enter State"] },

  city: { type: String, required: [true, "Please enter City"] },

  address: { type: String, required: [true, "Please enter address"] },

  pincode: { type: Number, required: [true, "Please enter Pincode"] },

  isAgencyVerified: { type: Boolean, required: true, default: false },

  avatar: {
    public_id: String,
    url: String,
  },

  owner: {
    name: {
      type: String,
      required: [true, "Please enter Your Travel Agency name"],
    },

    email: {
      type: String,
      required: false,
      unique: [true, "Email already exists"],
      validate: [validator.isEmail, "Please Enter a valid Email"],
    },

    phone: { type: Number, required: [true, "Please enter a Phone Number"] },

    avatar: {
      public_id: String,
      url: String,
    },
  },

  // carAttachers: [
  //   {
  //     name:{type:String, required:true}
  //     carAttacher: { type: mongoose.Schema.Types.ObjectId, ref: "CarAttacher" },
  //   },
  // ],

  // drivers: [
  //   {
  //     name:{type:String, required:true}
  //     driver: { type: mongoose.Schema.Types.ObjectId, ref: "Driver" },
  //   },
  // ],

  documnets: {
    ownerAadhar: { type: String },
    licenses: { type: String },
    registration: { type: String },
  },

  // cars: [
  //   {
  //     name: { type: String, required: true },
  //   },
  // ],
});

module.exports = mongoose.model("TravelAgency", TravelAgenciesSchema);
