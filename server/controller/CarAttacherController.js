const CarAttacher = require("../models/carAttacherModel");
const TravelAgency = require("../models/travelAgenciesModel");
const ErrorHandler = require("../utils/errorHandler");
const crypto = require("crypto");

const {
  generateHashpassword,
  compareHashpassword,
} = require("../services/password-services");
const { generateTokens } = require("../services/token-services");
const {
  generateResetPasswordHash,
  generateHash,
} = require("../services/hash-services");
const sendEmail = require("../utils/sendEmail");
const cloudinary = require("cloudinary");

exports.registration = async (req, res, next) => {
  const { name, email, phone, password, confirmpassword, avatar } = req.body;
  if (!name && !email && !phone && !password && !confirmpassword && !avatar) {
    return next(new ErrorHandler("All fields are required", 400));
  }

  if (password !== confirmpassword) {
    return next(
      new ErrorHandler("Password and Confirm Password are not same", 400)
    );
  }
  try {
    const myCloud = await cloudinary.v2.uploader.upload(avatar, {
      folder: "WheelzStake/attacher/avatar",
      width: 200,
      crop: "scale",
    });

    const hashPassword = await generateHashpassword(password);

    const carAttacherData = await CarAttacher.create({
      name,
      email,
      phone,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
      password: hashPassword,
    });

    const { accessToken } = await generateTokens({ _id: carAttacherData._id });

    res.cookie("accessCAToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    res.status(200).json({ success: true, auth: true, carAttacherData });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

exports.activateCarAttacher = async (req, res, next) => {
  try {
    const { city, state } = req.body;
    const {
      carName,
      carType,
      ac,
      bags,
      pricePerKm,
      fuelType,
      carImage,
      seats,
    } = req.body;
    // const { driverName, driverEmail, driverPhone, driverAvatar } =
    //   req.body.driver;

    if (
      !city &&
      !fuelType &&
      !pricePerKm &&
      !bags &&
      !ac &&
      !seats &&
      !carType &&
      !carName &&
      !state &&
      !carImage
    ) {
      return next(new ErrorHandler("All fields are required", 400));
    }

    // const myCloud = await cloudinary.v2.uploader.upload(driverAvatar, {
    //   folder: "WheelzStake/attacher/driver",
    //   width: 200,
    //   crop: "scale",
    // });

    // take angecy details
    const carAttacher = await CarAttacher.findById(req.carAttacher._id);

    if (!carAttacher) {
      return next(new ErrorHandler("Driver not Found", 404));
    }

    const myCloudcar = await cloudinary.v2.uploader.upload(carImage, {
      folder: "WheelzStake/attacher/car",
      width: 200,
      crop: "scale",
    });

    carAttacher.city = city;
    carAttacher.state = state;

    carAttacher.isAttacherActivated = true;
    const data = {
      carName,
      carType,
      ac,
      seats,
      bags,
      pricePerKm,
      fuelType,
      carImage: {
        public_id: myCloudcar.public_id,
        url: myCloudcar.secure_url,
      },
    };

    carAttacher.carDetails.push(data);

    await carAttacher.save();

    res.status(200).json({ success: true, carAttacher });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler("All fields are required", 400));
    }

    const carAttacher = await CarAttacher.findOne({ email }).select(
      "+password"
    );

    if (!carAttacher) {
      return next(new ErrorHandler("Invalid Email or Passwords", 400));
    }

    const verify = await compareHashpassword(carAttacher.password, password);

    if (!verify) {
      return next(new ErrorHandler("Invalid Email or Password", 400));
    }

    const { accessToken } = await generateTokens({ _id: carAttacher._id });

    res.cookie("accessCAToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    res.status(202).json({ success: true, auth: true, carAttacher });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

exports.profile = async (req, res, next) => {
  try {
    const attacherDetails = await CarAttacher.findOne({
      _id: req.carAttacher._id,
    });

    if (!attacherDetails) {
      return next(new ErrorHandler("Cannot fetched Data", 404));
    }

    res.status(200).json({ success: true, attacherDetails });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

exports.getAllAttachers = async (req, res, next) => {
  try {
    const resultPerPage = 2;
    // filteration searching and pagination
    const carattacherFeature = new Features(
      CarAttacher.find({ isAttacherVerified: true }),
      req.query
    )
      .filter()
      .pagination(resultPerPage);

    const attachers = await carattacherFeature.query;

    if (!attachers) {
      return next(new ErrorHandler("Cannot fetched Data", 404));
    }

    res.status(200).json({ success: true, attachers });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

exports.logout = async (req, res, next) => {
  try {
    res.clearCookie("accessCAToken");

    res.status(200).json({ success: true, carAttacher: null, auth: false });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

exports.updatePassword = async (req, res, next) => {
  try {
    const attacher = await CarAttacher.findById(req.carAttacher._id).select(
      "+password"
    );

    const { oldPassword, password, confirmpassword } = req.body;

    if (!oldPassword && !password && !confirmpassword) {
      return next(new ErrorHandler("All fields are required", 400));
    }

    const isMatched = await compareHashpassword(attacher.password, oldPassword);

    if (!isMatched) {
      return next(new ErrorHandler("Current Password is not Correct", 400));
    }

    if (password !== confirmpassword) {
      return next(
        new ErrorHandler("New Password and Confirm Password are not same", 400)
      );
    }

    const hashNewPassword = await generateHashpassword(password);

    attacher.password = hashNewPassword;

    attacher.save();

    const { accessToken } = await generateTokens({ _id: attacher._id });

    res.cookie("accessCAToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    res.status(202).json({ success: true, auth: true, attacher });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

exports.forgotPassword = async (req, res, next) => {
  const attacher = await CarAttacher.findOne({ email: req.body.email });

  if (!attacher) {
    return next(new ErrorHandler("Car Attacher Not Found", 404));
  }

  const token = crypto.randomBytes(20).toString("hex");

  const resetpasstoken = await generateResetPasswordHash(token);
  const expiresTime = Date.now() + 5 * 60 * 1000;

  attacher.resetPasswordToken = resetpasstoken;
  attacher.resetPasswordExpire = expiresTime;

  await attacher.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/car/password/reset/${token}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: attacher.email,
      subject: "WheelZStack Password Recovery Mail",
      message,
    });

    // FURTHER REMOVE THE TOKEN IN RES.JSON
    res.status(200).json({
      success: true,
      message: `Email sent to ${attacher.email} successfully`,
      token,
    });
  } catch (e) {
    attacher.resetPasswordToken = undefined;
    attacher.rsesetPasswordExpire = undefined;

    await attacher.save();

    return next(new ErrorHandler(e.message, 500));
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const token = req.params.token;

    const resetPasswordToken = await generateResetPasswordHash(token);

    const attacher = await CarAttacher.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!attacher) {
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

    attacher.password = hashPassword;
    attacher.resetPasswordToken = undefined;
    attacher.resetPasswordExpire = undefined;

    await attacher.save();

    const { accessToken } = await generateTokens({ _id: attacher._id });

    res.cookie("accessCAToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    res.status(202).json({ success: true, auth: true, attacher });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

exports.addCars = async (req, res, next) => {
  try {
    const {
      carName,
      carType,
      ac,
      bags,
      seats,
      pricePerKm,
      fuelType,
      carImage,
      withDriver,
    } = req.body;

    if (
      !carName &&
      !carType &&
      !ac &&
      !bags &&
      !seats &&
      !pricePerKm &&
      !fuelType &&
      !carImage &&
      !withDriver
    ) {
      return next(new ErrorHandler("please fill all fields", 400));
    }

    const car = await CarAttacher.findById(req.carAttacher._id);

    const myCloudcar = await cloudinary.v2.uploader.upload(carImage, {
      folder: "WheelzStake/attacher/car",
      width: 200,
      crop: "scale",
    });

    const data = {
      carName,
      carType,
      ac,
      seats,
      bags,
      pricePerKm,
      fuelType,
      carImage: {
        public_id: myCloudcar.public_id,
        url: myCloudcar.secure_url,
      },
    };

    car.carDetails.push(data);

    await car.save();

    res.status(200).json({
      success: true,
      message: "Car Added Successfully",
      car,
    });
  } catch (e) {
    return next(new ErrorHandler(e.message, 500));
  }
};

exports.updateCarDetails = async (req, res, next) => {
  try {
    const cars = await CarAttacher.findById(req.carAttacher._id).populate(
      "carDetails"
    );

    const carId = req.params.id;
    const index = cars.carDetails.findIndex((ele) => ele.id === carId);

    if (index === -1) {
      return next(new ErrorHandler("Car not found", 400));
    }

    if (!cars) {
      return next(new ErrorHandler("Car Not Found", 400));
    }
    const {
      carName,
      carType,
      ac,
      bags,
      pricePerKm,
      fuelType,
      seats,
      carImage,
    } = req.body.carDetails;

    cars.carDetails[index].carName = carName;
    cars.carDetails[index].carType = carType;
    cars.carDetails[index].ac = ac;
    cars.carDetails[index].seats = seats;
    cars.carDetails[index].bags = bags;
    cars.carDetails[index].pricePerKm = pricePerKm;
    cars.carDetails[index].fuelType = fuelType;

    if (carImage !== "") {
      const imageID = cars.carDetails[index].carImage.public_id;

      await cloudinary.v2.uploader.destroy(imageID);

      const myCloud = cloudinary.v2.uploader.upload(carImage, {
        folder: "WheelzStake/attacher/car",
        width: 200,
        crop: "scale",
      });

      cars.carDetails[index].carImage = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }

    await cars.save();

    res.status(200).json({ success: true, cars });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

exports.deleteCar = async (req, res, next) => {
  try {
    const car = await CarAttacher.findById(req.carAttacher._id);
    const index = car.carDetails.findIndex((ele) => ele.id == req.params.id);

    if (index === -1) {
      return next(new ErrorHandler("Car not found", 400));
    }

    const imageID = car.carDetails[index].carImage.public_id;
    await cloudinary.v2.uploader.destroy(imageID);

    car.carDetails.splice(index, 1);

    await car.save();

    res
      .status(200)
      .json({ success: true, message: "Car Deleted Successfully" });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

exports.sendRequestToAgency = async (req, res, next) => {
  try {
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// exports.updateDriverDetails = async (req, res, next) => {
//   try {
//     const driver = await CarAttacher.findById(req.carAttacher._id).populate(
//       "driver"
//     );

//     if (!driver) {
//       return next(new ErrorHandler("User Not Found", 400));
//     }
//     const { name, email, phone } = req.body.driver;

//     driver.driver.name = name;
//     driver.driver.email = email;
//     driver.driver.phone = phone;

//     await driver.save();

//     res.status(200).json({ success: true, driver });
//   } catch (error) {
//     return next(new ErrorHandler(error.message, 500));
//   }
// };

// send request to agency for car attachment

// exports.sendRequestToAgency = async (req, res, next) => {
//   //get id of attacher
//   //get id and fetch details for travel agency
//   //check if their already attached or not
//   //
//   try {
//     const attacher = await CarAttacher.findById(req.carAttacher._id);
//     const agency = await TravelAgency.findById(req.params)
//   } catch (error) {
//     return next(new ErrorHandler(error.message, 500));
//   }
// };
