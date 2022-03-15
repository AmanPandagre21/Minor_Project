const express = require("express");
const router = express.Router();

/* ------- import controllers ---------*/
const { registration } = require("../controller/TravelAgencies");

/* ------- Travel Agencies ROUTES ---------*/

router.route("/registration").post(registration);
