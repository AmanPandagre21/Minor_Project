const User = require("../models/userModel");
const Refresh = require("../models/refreshModel");
const UserDto = require("../dtos/user-dto");
const { generateHash } = require("../services/hash-services");
const { generateOtp, sendOtp, verifyOtp } = require("../services/otp-services");
const {
  generateTokens,
  storeRefreshToken,
  verifyRefreshToken,
} = require("../services/token-services");
const cloudinary = require("cloudinary");
const ErrorHandler = require("../utils/errorHandler");

/* ------- Send OTP Function ---------*/
exports.sendOTP = async (req, res, next) => {
  const { phone } = req.body;

  if (!phone) {
    return next(new ErrorHandler("Phone field is required", 400));
  }

  // genrating otp;
  const otp = await generateOtp();

  // hash otp
  const time = 1000 * 60 * 2; // 2 min
  const expireTime = Date.now() + time;
  const data = `${phone}.${otp}.${expireTime}`;
  const hash = await generateHash(data);

  // send OTP
  try {
    await sendOtp(phone, otp);

    res.status(200).json({
      success: true,
      hash: `${hash}.${expireTime}`,
      otp,
      phone,
    });
  } catch (e) {
    return next(new ErrorHandler(e.message, 500));
  }
};

/* ------- Verify OTP Function ---------*/
exports.verifyOTP = async (req, res, next) => {
  const { otp, hash, phone } = req.body;

  if (!otp || !hash || !phone) {
    return next(new ErrorHandler("OTP is required", 400));
  }

  const [hashedOTP, expires] = hash.split(".");

  if (Date.now() > +expires) {
    return next(new ErrorHandler("OTP has expired", 400));
  }

  // create data for match the otp
  const data = `${phone}.${otp}.${expires}`;
  const isValid = await verifyOtp(data, hashedOTP);

  if (!isValid) {
    return next(new ErrorHandler("Wrong OTP", 400));
  }

  let user;

  try {
    user = await User.findOne({ phone: phone });

    if (!user) {
      user = await User.create({ phone: phone });
    }
  } catch (e) {
    return next(new ErrorHandler(e.message, 500));
  }

  const { accessToken, refreshToken } = generateTokens({
    _id: user._id,
  });

  await storeRefreshToken(refreshToken, user._id);

  res.cookie("refreshToken", refreshToken, {
    maxAge: 1000 * 60 * 60 * 24 * 30,
    httpOnly: true,
  });

  res.cookie("accessToken", accessToken, {
    maxAge: 1000 * 60 * 60 * 24 * 30,
    httpOnly: true,
  });

  const userDto = new UserDto(user);

  res.status(200).json({
    success: true,
    auth: true,
    user: userDto,
  });
};

/* ------- ACtivate User Function ---------*/
exports.activateUser = async (req, res, next) => {
  // take details of user
  try {
    const { name, email, avatar } = req.body;

    if (!name && !email && !avatar) {
      return next(new ErrorHandler("All fields are required", 400));
    }

    const myCloud = await cloudinary.v2.uploader.upload(avatar, {
      folder: "WheelzStake/users/avatar",
      width: 200,
      crop: "scale",
    });

    const userData = await User.findOne({ _id: req.user._id });

    if (!userData) {
      return next(new ErrorHandler("User Not found", 404));
    }

    userData.activated = true;
    userData.name = name;
    userData.email = email;
    userData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };

    await userData.save();

    const userDto = new UserDto(userData);
    res.status(200).json({ success: true, userDto, auth: true });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

/* ------- Refresh Function ---------*/
exports.refresh = async (req, res, next) => {
  const { refreshToken: refTokenFromCookies } = req.cookies;

  let userData;

  // verifying refreshtoken
  try {
    userData = await verifyRefreshToken(refTokenFromCookies);
  } catch (e) {
    return next(new ErrorHandler("Invalid Token", 401));
  }

  // check refresh token in db
  try {
    const token = await Refresh.findOne({
      user: userData._id,
      refreshToken: refTokenFromCookies,
    });
    if (!token) {
      return next(new ErrorHandler("Invalid Token", 401));
    }
  } catch (e) {
    return next(new ErrorHandler(e.message, 500));
  }

  // check user
  let user;

  try {
    user = await User.findById({ _id: userData._id });

    if (!user) {
      return next(new ErrorHandler("User not available", 404));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }

  // generate new refresh tokens
  const { refreshToken, accessToken } = await generateTokens({
    _id: userData._id,
  });

  // update refresh token
  try {
    await Refresh.updateOne(
      { user: userData._id },
      { refreshToken: refreshToken }
    );
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }

  // put in cookie
  res.cookie("refreshToken", refreshToken, {
    maxAge: 1000 * 60 * 60 * 24 * 30,
    httpOnly: true,
  });

  res.cookie("accessToken", accessToken, {
    maxAge: 1000 * 60 * 60 * 24 * 30,
    httpOnly: true,
  });

  const userDto = new UserDto(user);

  res.status(200).json({
    success: true,
    auth: true,
    userDto,
  });
};

/* ------- USer Profile Function ---------*/
exports.profile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    const userDto = new UserDto(user);

    res.status(200).json({
      success: true,
      user: userDto,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

/* ------- Update Profile Function ---------*/
exports.updateProfile = async (req, res, next) => {
  try {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
    };

    if (req.body.avatar !== "") {
      const user = await User.findById(req.user._id);

      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }
      const imageID = user.avatar.public_id;

      await cloudinary.v2.uploader.destroy(imageID);

      const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "WheelzStake/users/avatar",
        width: 200,
        crop: "scale",
      });

      newUserData.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }

    const user = await User.findByIdAndUpdate(req.user._id, newUserData);

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

/* ------- Add  contacts Function ---------*/
// exports.addContacts = async (req, res, next) => {
//   try {
//     const { name, mobile } = req.body;

//     const userInfo = await User.findOne({ _id: req.user._id });

//     if (!userInfo) {
//       res.status(404).json({ success: false, message: "User Not Found" });
//     }
//     const data = {
//       name: name,
//       mobile: mobile,
//     };

//     userInfo.contacts.push(data);

//     await userInfo.save();

//     const userDto = new UserDto(userInfo);

//     res.status(200).json({ success: true, userDto });
//   } catch (error) {
//     return next(new ErrorHandler(error.message, 500));
//   }
// };

// /* ------- Show contacts Function ---------*/
// exports.showContacts = async (req, res, next) => {
//   try {
//     const userData = await User.findOne({ _id: req.user._id });

//     if (!userData) {
//       res.status(404).json({ success: false, message: "User Not Found" });
//     }

//     const contacts = userData.contacts;

//     res.status(200).json({ success: true, contacts });
//   } catch (error) {
//     return next(new ErrorHandler(error.message, 500));
//   }
// };

/* ------- LogOut Function ---------*/
exports.logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;

    // delete refresh token from db
    await Refresh.deleteOne({ refreshToken: refreshToken });

    // remove tokens from cookies;
    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");

    res.status(200).json({
      success: true,
      user: null,
      message: "Logged Out",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

exports.sendRequestToDriver = async (req, res, next) => {};
