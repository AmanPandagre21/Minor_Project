const express = require("express");
const route = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  processPayment,
  sendStripeApiKey,
} = require("../controller/PaymentController");

router.route("/payment/process").post(authMiddleware, processPayment);

router.route("/stripeapikey").post(authMiddleware, sendStripeApiKey);

module.exports = router;
