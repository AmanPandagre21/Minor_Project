const User = require("../models/userModel");
const { verifyAccessToken } = require("../services/token-services");
const ErrorHandler = require("../utils/errorHandler");

module.exports = async function (req, res, next) {
  try {
    const { accessToken } = req.cookies;

    if (!accessToken) {
      throw new Error();
    }
    const userData = await verifyAccessToken(accessToken);

    if (!userData) {
      throw new Error();
    }

    req.user = await User.findById(userData._id);
    next();
  } catch (error) {
    return next(new ErrorHandler("Invalid Token", 401));
  }
};
