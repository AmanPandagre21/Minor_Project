const { verifyAccessToken } = require("../services/token-services");
const ErrorHandler = require("../utils/errorHandler");

module.exports = async function (req, res, next) {
  try {
    const { accessCAToken } = req.cookies;

    if (!accessCAToken) {
      throw new Error();
    }
    const carAttacherData = await verifyAccessToken(accessCAToken);

    if (!carAttacherData) {
      throw new Error();
    }

    req.carAttacher = carAttacherData;
    next();
  } catch (error) {
    return next(new ErrorHandler("Please Login..", 401));
  }
};
