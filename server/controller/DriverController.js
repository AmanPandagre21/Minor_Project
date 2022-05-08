const crypto = require("crypto");
const Driver = require("../models/driverModel");
const ErrorHandler = require("../utils/errorHandler");
const {
  generateHashpassword,
  compareHashpassword,
} = require("../services/password-services");
const { generateTokens } = require("../services/token-services");
const {
  generateResetPasswordHash,
  generateHash,
} = require("../services/hash-services");
const Features = require("../utils/Features");
const sendEmail = require("../utils/sendEmail");
const cloudinary = require("cloudinary");

exports.register = async (req, res, next) => {
  const { name, email, phone, password, confirmpassword, avatar, city } =
    req.body;
  if (
    !name &&
    !email &&
    !phone &&
    !password &&
    !confirmpassword &&
    !avatar &&
    !city
  ) {
    return next(new ErrorHandler("All fields are required", 400));
  }

  if (password !== confirmpassword) {
    return next(
      new ErrorHandler("Password and Confirm Password are not same", 400)
    );
  }
  try {
    const myCloud = await cloudinary.v2.uploader.upload(avatar, {
      folder: "WheelzStake/driver/avatar",
      width: 200,
      crop: "scale",
    });

    const hashPassword = await generateHashpassword(password);

    const driverData = await Driver.create({
      name,
      email,
      phone,
      city,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
      password: hashPassword,
      isDriverActivated: true,
    });

    const { accessToken } = await generateTokens({ _id: driverData._id });

    res.cookie("accessDToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    res.status(200).json({ success: true, auth: true, driverData });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// exports.activateDriver = async (req, res, next) => {
//   try {
//     const { city } = req.body;

//     if (!city) {
//       return next(new ErrorHandler("All fields are required", 400));
//     }
//     // take angecy details
//     const driver = await Driver.findById(req.driver._id);

//     if (!driver) {
//       return next(new ErrorHandler("Driver not Found", 404));
//     }

//     driver.city = city;
//     driver.isDriverActivated = true;

//     await driver.save();

//     res.status(200).json({ success: true, driver });
//   } catch (error) {
//     return next(new ErrorHandler(error.message, 500));
//   }
// };

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler("All fields are required", 400));
    }

    const driver = await Driver.findOne({ email }).select("+password");

    if (!driver) {
      return next(new ErrorHandler("Invalid Email or Passwords", 400));
    }

    const verify = await compareHashpassword(driver.password, password);

    if (!verify) {
      return next(new ErrorHandler("Invalid Email or Password", 400));
    }

    const { accessToken } = await generateTokens({ _id: driver._id });

    res.cookie("accessDToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    res.status(202).json({ success: true, auth: true, driver });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

exports.profile = async (req, res, next) => {
  try {
    const driverDetails = await Driver.findOne({ _id: req.driver._id });

    if (!driverDetails) {
      return next(new ErrorHandler("Cannot fetched Data", 404));
    }

    res.status(200).json({ success: true, driverDetails });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

exports.drivers = async (req, res, next) => {
  try {
    const resultPerPage = 2;
    // filteration searching and pagination
    const driverFeature = new Features(
      Driver.find({ isDriverVerified: true }),
      req.query
    )
      .filter()
      .pagination(resultPerPage);

    const drivers = await driverFeature.query;

    if (!drivers) {
      return next(new ErrorHandler("Cannot fetched Data", 404));
    }

    res.status(200).json({ success: true, drivers });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

exports.logout = async (req, res, next) => {
  try {
    res.clearCookie("accessDToken");

    res.status(200).json({ success: true, driver: null, auth: false });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// exports.updateProfile
exports.updateProfile = async (req, res, next) => {
  try {
    const newDriverData = {
      name: req.body.name,
      phone: req.body.phone,
      city: req.body.city,
    };

    if (req.body.avatar !== "") {
      const driver = await Driver.findById(req.driver._id);

      if (!driver) {
        return next(new ErrorHandler("driver not found", 404));
      }
      const imageID = driver.avatar.public_id;

      await cloudinary.v2.uploader.destroy(imageID);

      const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "WheelzStake/driver/avatar",
        width: 200,
        crop: "scale",
      });

      newDriverData.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }

    const driver = await Driver.findByIdAndUpdate(
      req.driver._id,
      newDriverData
    );

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

exports.updatePassword = async (req, res, next) => {
  try {
    const driver = await Driver.findById(req.driver._id).select("+password");

    const { oldPassword, password, confirmpassword } = req.body;

    if (!oldPassword && !password && !confirmpassword) {
      return next(new ErrorHandler("All fields are required", 400));
    }

    const isMatched = await compareHashpassword(driver.password, oldPassword);

    if (!isMatched) {
      return next(new ErrorHandler("Current Password is not Correct", 400));
    }

    if (password !== confirmpassword) {
      return next(
        new ErrorHandler("New Password and Confirm Password are not same", 400)
      );
    }

    const hashNewPassword = await generateHashpassword(password);

    driver.password = hashNewPassword;

    driver.save();

    const { accessToken } = await generateTokens({ _id: driver._id });

    res.cookie("accessDToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    res.status(202).json({ success: true, auth: true, driver });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

exports.forgotPassword = async (req, res, next) => {
  const driver = await Driver.findOne({ email: req.body.email });

  if (!driver) {
    return next(new ErrorHandler("Driver Not Found", 404));
  }

  const token = crypto.randomBytes(20).toString("hex");

  const resetpasstoken = await generateResetPasswordHash(token);
  const expiresTime = Date.now() + 5 * 60 * 1000;

  driver.resetPasswordToken = resetpasstoken;
  driver.resetPasswordExpire = expiresTime;

  await driver.save({ validateBeforeSave: false });

  // const resetPasswordUrl = `${req.protocol}://${req.get(
  //   "host"
  // )}/api/v1/driver/password/reset/${token}`;

  const resetPasswordUrl = `${process.env.FRONT_URI}/driver/password/reset/${token}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: driver.email,
      subject: "WheelZStack Password Recovery Mail",
      message,
    });

    // FURTHER REMOVE THE TOKEN IN RES.JSON
    res.status(200).json({
      success: true,
      message: `Email sent to ${driver.email} successfully`,
      token,
    });
  } catch (e) {
    driver.resetPasswordToken = undefined;
    driver.resetPasswordExpire = undefined;

    await driver.save();

    return next(new ErrorHandler(e.message, 500));
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const token = req.params.token;

    const resetPasswordToken = await generateResetPasswordHash(token);

    const driver = await Driver.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!driver) {
      return next(
        new ErrorHandler("Invalid Token or Token has been expired", 404)
      );
    }

    if (req.body.password !== req.body.confirmpassword) {
      return next(
        new ErrorHandler("Password and Confirm Password not matched")
      );
    }

    const hashPassword = await generateHashpassword(req.body.password);

    driver.password = hashPassword;
    driver.resetPasswordToken = undefined;
    driver.resetPasswordExpire = undefined;

    await driver.save();

    const { accessToken } = await generateTokens({ _id: driver._id });

    res.cookie("accessDToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    res.status(202).json({
      success: true,
      message: "Password change successfully",
      auth: true,
      driver,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
