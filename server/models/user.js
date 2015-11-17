var mongoose = require('./mongo_config');
var Schema = mongoose.Schema;
var timestamp = require('mongoose-timestamp');
var crypto = require('crypto');
var Question = require('./question');

var UserSchema = Schema({
  username         : {
    type           : String,
    required       : true,
    unique         : true
  },
  team             : {
    type           : String,
    enum           : ['UI', 'Ad Serving', 'Forecasting', 'Reporting']
  },
  position         : {
    type           : String,
    enum           : ['DEV', 'QA']
  },
  crypted_password : String,
  salt             : String,
  questions        : [{
    type           : Schema.Types.ObjectId,
    ref            : 'Question'
  }]
});

UserSchema.plugin(timestamp);

UserSchema.methods.checkExpired = function () {
  // body...
}

UserSchema.methods.addQuestion = function (question_id) {
  this.questions.push(question_id);
  this.save();
};

UserSchema.methods.loginWithPassword = function (password, callback) {
  var self = this;
  crypto.pbkdf2(password, self.salt, 4096, 256, function (err, hash) {
    if (err) {
      throw err;
    } else {
      if (hash.toString('hex') === self.crypted_password) {
        callback.call(null, self);
      }
    }
  });
  return;
};

UserSchema.methods.loginWithToken = function (token, callback) {
  if (token === this.crypted_password) {
    callback.call(null, this);
  }
  return;
};

UserSchema.methods.updatePassword = function (password, callback) {
  var self = this;
  crypto.pbkdf2(password, self.salt, 4096, 256, function (err, hash) {
    if (err) {
      throw err;
    } else {
      var user_crypted_password = hash.toString('hex');
      self.update({crypted_password: user_crypted_password}, function (err, data) {
        callback.call(null, err, self);
      });
      return;
    }
  });
};

var User = mongoose.model('User', UserSchema);

User.saveWithSalt = function (req, callback) {
  var username = req.body.username,
      team     = req.body.team,
      position = req.body.position;

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
            salt: user_salt,
            team: team,
            position: position
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