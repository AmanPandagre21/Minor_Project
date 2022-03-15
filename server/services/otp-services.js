const crypto = require("crypto");
const { generateHash } = require("./hash-services");

/* ------- Twilio Configuration ---------*/
const sms_id = process.env.SMS_SID;
const smsAuthToken = process.env.SMS_AUTH_TOKEN;

const twilio = require("twilio")(sms_id, smsAuthToken, {
  lazyLoading: true,
});

class OtpServices {
  /* ------- Generate OTP Function ---------*/
  async generateOtp() {
    return crypto.randomInt(1000, 9999);
  }

  /* ------- Send OTP Function ---------*/
  async sendOtp(phone, otp) {
    return await twilio.messages.create({
      to: phone,
      from: process.env.SMS_PHONE_NUMBER,
      body: `Your WheelzStake OTP is ${otp}`,
    });
  }

  /* ------- Verify OTP Function ---------*/
  async verifyOtp(data, hashedOTP) {
    const hashedData = await generateHash(data);
    return hashedData === hashedOTP;
  }
}

module.exports = new OtpServices();
