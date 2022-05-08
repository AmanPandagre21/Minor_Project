const crypto = require("crypto");

class HashServices {
  /* ------- Generate hash Function ---------*/
  async generateHash(data) {
    return crypto
      .createHmac("sha256", process.env.SECRET_KEY)
      .update(data)
      .digest("hex");
  }

  async generateResetPasswordHash(token) {
    return crypto.createHash("sha256").update(token).digest("hex");
  }
}

module.exports = new HashServices();
