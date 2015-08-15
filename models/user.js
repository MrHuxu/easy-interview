var mongoose = require('./mongo_config');
var timestamp = require('mongoose-timestamp');
var crypto = require('crypto');

var UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  crypted_password: String,
  salt: String
});

UserSchema.plugin(timestamp);

UserSchema.methods.checkExpired = function () {
  // body...
}

UserSchema.methods.loginWithPassword = function (password, callback) {
  var self = this;
  crypto.pbkdf2(password, self.salt, 4096, 256, function (err, hash) {
    if (err) {
      throw err;
    } else {
      if (hash.toString('hex') === self.crypted_password) {
        callback.call()
      }
    }
  });
  return;
}

UserSchema.methods.loginWithToken = function (token, callback) {
  if (token === this.crypted_password) {
    callback.call();
  }
  return;
}

var User = mongoose.model('User', UserSchema);

User.saveWithSalt = function (req, callback) {
  var username = req.body.username;
  crypto.randomBytes(128, function (err, salt) {
    if (err) {
      throw err;
    } else {
      var user_salt = salt.toString('hex');
      crypto.pbkdf2(req.body.password, user_salt, 4096, 256, function (err, hash) {
        if (err) {
          throw err;
        } else {
          var user_crypted_password = hash.toString('hex');
          var user = new User({
            username: username,
            crypted_password: user_crypted_password,
            salt: user_salt
          });
          user.save(function (err, data) {
            callback.call(null, err, data);
          })
          return;
        }
      });
    }
  });
};

module.exports = User;