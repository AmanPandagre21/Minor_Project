const Refresh = require("../models/refreshModel");
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");
const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET;

class TokenServices {
  /* ------- Generate Tokens Function ---------*/
  generateTokens(payLoad) {
    const accessToken = jwt.sign(payLoad, accessTokenSecret, {
      expiresIn: "30d",
    });

    const refreshToken = jwt.sign(payLoad, refreshTokenSecret, {
      expiresIn: "1y",
    });

    return { accessToken, refreshToken };
  }

  /* ------- Store Refresh Token Function ---------*/
  async storeRefreshToken(token, userId) {
    try {
      const refresh = await Refresh.create({
        refreshToken: token,
        user: userId,
      });
    } catch (e) {
      console.log(e.message);
    }
  }

  /* ------- Verify Refresh Token Function ---------*/
  async verifyRefreshToken(token) {
    return jwt.verify(token, refreshTokenSecret);
  }

  /* ------- Verify Access Token Function ---------*/
  async verifyAccessToken(accessToken) {
    return jwt.verify(accessToken, accessTokenSecret);
  }

  /* ------- Generate Reset Password Token Function ---------*/
}

module.exports = new TokenServices();
