class UserDto {
  id;
  phone;
  name;
  email;
  avatar;
  activated;
  createdAt;
  contacts;

  constructor(user) {
    this.id = user._id;
    this.phone = user.phone;
    this.name = user.name;
    this.email = user.email;
    this.avatar = user.avatar;
    this.activated = user.activated;
    this.createdAt = user.createdAt;
    this.contacts = user.contacts;
  }
}

module.exports = UserDto;
