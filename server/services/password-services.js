const bcrypt = require("bcrypt");

class PasswordServices {
  // convert  password  into  hash  password
  async generateHashpassword(password) {
    return bcrypt.hash(password, 10);
  }

  // copare  password  to  hash  password
  async compareHashpassword(hashpassword, password) {
    return bcrypt.compare(password, hashpassword);
  }

  // convert  password  into  hash  password
  //   generateHashpassword(data) {}
}

module.exports = new PasswordServices();
