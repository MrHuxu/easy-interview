var mongoose = require('./mongo_config');

var UserSchema = mongoose.Schema({
  username: String,
  password: String,
  token: String
});

UserSchema.methods.speak = function () {
  console.log(this.name);
};

var User = mongoose.model('User', UserSchema);

module.exports = User;