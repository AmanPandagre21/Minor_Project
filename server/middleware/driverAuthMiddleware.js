const { verifyAccessToken } = require("../services/token-services");
const ErrorHandler = require("../utils/errorHandler");

module.exports = async function (req, res, next) {
  try {
    const { accessDToken } = req.cookies;

    if (!accessDToken) {
      throw new Error();
    }
    const driverData = await verifyAccessToken(accessDToken);

    if (!driverData) {
      throw new Error();
    }

    req.driver = driverData;
    next();
  } catch (error) {
    return next(new ErrorHandler("Invalid Token", 401));
  }
};
