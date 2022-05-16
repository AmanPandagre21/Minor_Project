const TravelAgency = require("../models/travelAgenciesModel");
const ErrorHandler = require("../utils/errorHandler");
const crypto = require("crypto");
const {
  generateHashpassword,
  compareHashpassword,
} = require("../services/password-services");
const { generateTokens } = require("../services/token-services");
const { generateResetPasswordHash } = require("../services/hash-services");
const path = require("path");
const Features = require("../utils/Features");
const cloudinary = require("cloudinary");

/* -------  Registration ---------*/
exports.registration = async (req, res, next) => {
  try {
    const { name, email, phone, password, confirmpassword, avatar } = req.body;

    if (!name && !email && !phone && !password && !confirmpassword && !avatar) {
      return next(new ErrorHandler("All fields are required", 400));
    }

    const myCloud = await cloudinary.v2.uploader.upload(avatar, {
      folder: "WheelzStake/agency/avatar",
      width: 200,
      crop: "scale",
    });

    if (password !== confirmpassword) {
      return next(
        new ErrorHandler("Password and Confirm Password are not same", 400)
      );
    }

    const hashPassword = await generateHashpassword(password);

    const angencyInfo = await TravelAgency.create({
      name,
      email,
      phone,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
      password: hashPassword,
    });

    const { accessToken } = await generateTokens({ _id: angencyInfo._id });

    res.cookie("accessTAToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    res.status(200).json({ success: true, auth: true, angencyInfo });
  } catch (e) {
    return next(new ErrorHandler(e.message, 500));
  }
};

/* -------  activate travel agencies ---------*/
exports.activateTravelAgencies = async (req, res, next) => {
  try {
    const { state, city, address, pincode } = req.body;

    if (!state && !city && !address && !pincode) {
      return next(new ErrorHandler("All fields are required", 400));
    }
    // take angecy details
    const agency = await TravelAgency.findById(req.agency._id);

    if (!agency) {
      return next(new ErrorHandler("Travel Agency is not Found", 404));
    }

    agency.state = state;
    agency.city = city;
    agency.address = address;
    agency.pincode = pincode;
    agency.isAgencyActivated = true;

    await agency.save();

    res.status(200).json({ success: true, agency });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

/* -------  Login ---------*/
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler("All fields are required", 400));
    }

    const agency = await TravelAgency.findOne({ email }).select("+password");

    if (!agency) {
      return next(new ErrorHandler("Invalid Email or Passwords", 400));
    }

    const verify = await compareHashpassword(agency.password, password);

    if (!verify) {
      return next(new ErrorHandler("Invalid Email or Password", 400));
    }

    const { accessToken } = await generateTokens({ _id: agency._id });

    res.cookie("accessTAToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    res.status(202).json({ success: true, auth: true, agency });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

/* -------  activate travel agencies ---------*/
exports.showProfile = async (req, res, next) => {
  try {
    const agencyDetails = await TravelAgency.findOne({
      _id: req.agency._id,
    }).populate("carAttachers");

    if (!agencyDetails) {
      return next(new ErrorHandler("Cannot fetched Data", 404));
    }

    res.status(200).json({ success: true, agencyDetails });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

/* -------  activate travel agencies ---------*/
exports.showAgencyProfile = async (req, res, next) => {
  try {
    const agencyDetails = await TravelAgency.findOne({
      _id: req.params.id,
    }).populate("carAttachers");

    if (!agencyDetails) {
      return next(new ErrorHandler("Cannot fetched Data", 404));
    }

    res.status(200).json({ success: true, agencyDetails });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

/* -------  Show All travel agencies ---------*/
exports.showAllTravelAgencies = async (req, res, next) => {
  try {
    const resultperpage = 15;

    const agencyFeatures = new Features(TravelAgency.find(), req.query)
      .filter()
      .pagination(resultperpage);

    const agencyDetails = await agencyFeatures.query;

    if (!agencyDetails) {
      return next(new ErrorHandler("Cannot fetched Data", 404));
    }

    res.status(200).json({ success: true, agencyDetails });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

/* -------  update profile of travel agencies ---------*/
exports.updateProfile = async (req, res, next) => {
  try {
    const { state, city, address, pincode, name, avatar, phone } = req.body;

    const data = {
      state,
      city,
      address,
      pincode,
      name,
      phone,
    };

    if (avatar !== "") {
      const agency = await TravelAgency.findById(req.agency._id);
      const imgId = agency.avatar.public_id;
      await cloudinary.v2.uploader.destroy(imgId);

      const myCloud = cloudinary.v2.uploader.upload(avatar, {
        folder: "WheelzStake/agency/avatar",
        width: 200,
        crop: "scale",
      });

      data.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }

    const agency = await User.findByIdAndUpdate(req.agency._id, data, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
    });
  } catch (e) {
    return next(new ErrorHandler(e.message, 500));
  }
};

/* -------  Update password of travel agencies ---------*/
exports.updatePassword = async (req, res, next) => {
  try {
    const { oldpassword, password, confirmpassword } = req.body;

    if (!oldpassword && !password && !confirmpassword) {
      return next(new ErrorHandler("All fields are required", 400));
    }

    const agency = await TravelAgency.findById(req.agency._id).select(
      "+password"
    );

    if (!agency) {
      return next(new ErrorHandler("Travel Agency not found", 404));
    }

    // console.log(oldpassword);
    // console.log(agency.password);

    const check = await compareHashpassword(agency.password, oldpassword);

    if (!check) {
      return next(new ErrorHandler("Invalid Current Password", 400));
    }

    if (password !== confirmpassword) {
      return next(
        new ErrorHandler("Password and Incorrect Password is not matched", 400)
      );
    }

    const hashPass = await generateHashpassword(password);

    agency.password = hashPass;

    await agency.save();

    res
      .status(200)
      .json({ success: true, message: "Password changed Successfully" });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

/* -------  Logout ---------*/
exports.logout = async (req, res, next) => {
  try {
    res.clearCookie("accessTAToken");

    res.status(200).json({
      success: true,
      agency: null,
      auth: false,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

/* -------  Forgot password ---------*/
exports.forgotPassword = async (req, res, next) => {
  const agency = await TravelAgency.findOne({ email: req.body.email });

  if (!agency) {
    return next(new ErrorHandler("Agency Not Found", 404));
  }

  const token = crypto.randomBytes(20).toString("hex");

  const resetpasstoken = await generateResetPasswordHash(token);
  const expiresTime = Date.now() + 5 * 60 * 1000;

  agency.resetPasswordToken = resetpasstoken;
  agency.resetPasswordExpire = expiresTime;

  await agency.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/agency/password/reset/${token}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    // await sendEmail({
    //   email: agency.email,
    //   subject: "WheelZStack Password Recovery Mail",
    //   message,
    // });

    // FURTHER REMOVE THE TOKEN IN RES.JSON
    res.status(200).json({
      success: true,
      message: `Email sent to ${agency.email} successfully`,
      token,
    });
  } catch (e) {
    agency.resetPasswordToken = undefined;
    agency.resetPasswordExpire = undefined;

    await agency.save();

    return next(new ErrorHandler(e.message, 500));
  }
};

/* -------  reset password ---------*/
exports.resetPassword = async (req, res, next) => {
  try {
    const token = req.params.token;

    const resetPasswordToken = await generateResetPasswordHash(token);

    const agency = await TravelAgency.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!agency) {
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

    agency.password = hashPassword;
    agency.resetPasswordToken = undefined;
    agency.resetPasswordExpire = undefined;

    await agency.save();

    const { accessToken } = await generateTokens({ _id: agency._id });

    res.cookie("accessTAToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    res.status(202).json({ success: true, auth: true, agency });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

exports.addCarAndDriver = async (req, res, next) => {
  try {
    const {
      carName,
      carType,
      ac,
      bags,
      seats,
      pricePerKm,
      fuelType,
      // driverName,
      // email,
      // phone,
      carImage,
      // driverAvatar,
    } = req.body;

    if (
      !carName &&
      !carType &&
      !ac &&
      !bags &&
      !seats &&
      !pricePerKm &&
      !fuelType &&
      // !driverName &&
      // !email &&
      // !phone &&
      !carImage
      // !driverAvatar
    ) {
      return next(new ErrorHandler("please fill all fields", 400));
    }

    const agency = await TravelAgency.findById(req.agency._id);

    const myCloudcar = await cloudinary.v2.uploader.upload(carImage, {
      folder: "WheelzStake/agency/car",
      width: 200,
      crop: "scale",
    });

    // const myCloud = await cloudinary.v2.uploader.upload(avatar, {
    //   folder: "WheelzStake/agency/driver",
    //   width: 200,
    //   crop: "scale",
    // });

    const data = {
      cars: {
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
      },
    };

    agency.carsAndDrivers.push(data);

    await agency.save();

    res.status(200).json({
      success: true,
      message: "Car Added Successfully",
      agency,
    });
  } catch (e) {
    return next(new ErrorHandler(e.message, 500));
  }
};

exports.updateCarAndDriver = async (req, res, next) => {
  try {
    const {
      carName,
      carType,
      ac,
      bags,
      seats,
      pricePerKm,
      fuelType,
      driverName,
      email,
      phone,
      carImage,
      driverAvatar,
    } = req.body;

    const agency = await TravelAgency.findById(req.agency._id);
    const carAndDriverId = req.params.id;
    const index = agency.carsAndDrivers.findIndex(
      (ele) => ele.id === carAndDriverId
    );

    if (index === -1) {
      return next(new ErrorHandler("Car not found", 400));
    }

    agency.carsAndDrivers[index].cars.carName = carName;
    agency.carsAndDrivers[index].cars.carType = carType;
    agency.carsAndDrivers[index].cars.ac = ac;
    agency.carsAndDrivers[index].cars.seats = seats;
    agency.carsAndDrivers[index].cars.bags = bags;
    agency.carsAndDrivers[index].cars.pricePerKm = pricePerKm;
    agency.carsAndDrivers[index].cars.fuelType = fuelType;
    agency.carsAndDrivers[index].driver.driverName = driverName;
    agency.carsAndDrivers[index].driver.email = email;
    agency.carsAndDrivers[index].driver.phone = phone;

    if (carImage !== "") {
      const imageID = agency.carsAndDrivers[index].cars.carImage.public_id;

      await cloudinary.v2.uploader.destroy(imageID);

      const myCloudcar = cloudinary.v2.uploader.upload(carImage, {
        folder: "WheelzStake/agency/car",
        width: 200,
        crop: "scale",
      });

      agency.carsAndDrivers[index].cars.carImage = {
        public_id: myCloudcar.public_id,
        url: myCloudcar.secure_url,
      };
    }

    if (driverAvatar !== "") {
      const imageID =
        agency.carsAndDrivers[index].driver.driverAvatar.public_id;

      await cloudinary.v2.uploader.destroy(imageID);

      const myCloud = cloudinary.v2.uploader.upload(driverAvatar, {
        folder: "WheelzStake/agency/driver",
        width: 200,
        crop: "scale",
      });

      agency.carsAndDrivers[index].driver.carImage = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }

    await agency.save();

    res.status(200).json({
      success: true,
      agency,
    });
  } catch (e) {
    return next(new ErrorHandler(e.message, 500));
  }
};

exports.deleteCarAndDriver = async (req, res, next) => {
  try {
    const agency = await TravelAgency.findById(req.agency._id);
    const index = agency.carsAndDrivers.findIndex(
      (ele) => ele.id == req.params.id
    );

    if (index === -1) {
      return next(new ErrorHandler("Car not found", 400));
    }

    // const driverImageID =
    //   agency.carsAndDrivers[index].driver.driverAvatar.public_id;
    const carImageID = agency.carsAndDrivers[index].cars.carImage.public_id;

    // await cloudinary.v2.uploader.destroy(driverImageID);
    await cloudinary.v2.uploader.destroy(carImageID);

    agency.carsAndDrivers.splice(index, 1);

    await agency.save();

    res
      .status(200)
      .json({ success: true, message: "Car Deleted Successfully" });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

exports.createAgencyReview = async (req, res, next) => {
  const { rating, agencyId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name.trim(),
    rating: Number(rating),
  };

  try {
    const agency = await TravelAgency.findById(agencyId);

    const isReviewed = agency.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );

    if (isReviewed) {
      agency.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString())
          rev.rating = rating;
      });
    } else {
      agency.reviews.push(review);
      agency.numOfReviews = agency.reviews.length;
    }

    let avg = 0;

    agency.reviews.forEach((rev) => {
      avg += rev.rating;
    });

    agency.ratings = avg / agency.reviews.length;

    await agency.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      message: "Review Posted",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// Get All Reviews of a product
exports.getAgencyReviews = async (req, res, next) => {
  try {
    const agency = await TravelAgency.findById(req.query.id);

    if (!agency) {
      return next(new ErrorHander("Agency not found", 404));
    }

    res.status(200).json({
      success: true,
      reviews: agency.reviews,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
