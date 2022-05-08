const { verifyAccessToken } = require("../services/token-services");
const ErrorHandler = require("../utils/errorHandler");

module.exports = async function (req, res, next) {
  try {
    const { accessTAToken } = req.cookies;

    if (!accessTAToken) {
      throw new Error();
    }

    const agency = await verifyAccessToken(accessTAToken);

    if (!agency) {
      throw new Error();
    }

    req.agency = agency;

    next();
  } catch (error) {
    return next(new ErrorHandler("Please Login First..", 500));
  }
};
