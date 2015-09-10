var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var User = require('../models/user');

var generateResponse = function (user) {
  return {
    operationSuccess: true,
    id: user._id,
    username: user.username,
    token: user.crypted_password,
    team: user.team,
    position: user.position
  };
};

router.post('/login', function (req, res) {
  User.findOne({username: req.body.username}).exec(function (err, user) {
    var callback = function (user) {
      var resContent = generateResponse(user);
      resContent.messages = ['User ' + user.username + ' successfully login!'];
      res.status(201).send(resContent);
    };
    if (user) {
      if (req.body.password) {
        user.loginWithPassword(req.body.password, callback);
      } else if (req.body.token) {
        user.loginWithToken(req.body.token, callback);
      }
    } else {
      res.send({
        operationSuccess: false,
        messages: ['Incorrect name or password']
      });
    }
  });
});

router.post('/signup', function (req, res) {
  User.saveWithSalt(req, function (err, user) {
    if (err) {
      var errorMessages = Object.keys(err.errors).map(function (key) {
        error = err.errors[key];
        return error.value + ' is not valid for ' + error.path.toUpperCase();
      });
      res.send({
        operationSuccess: false,
        messages: errorMessages
      });
    } else {
      var resContent = generateResponse(user);
      resContent.messages = ['User ' + user.username + ' successfully created!'];
      res.status(201).send(resContent);
    }
  })
});

router.post('/update', function (req, res) {
  var reqData = JSON.parse(Object.keys(req.body)[0]);
  User.findOneAndUpdate({_id: reqData.id}, reqData.data, function (err, user) {
    user.updatePassword(reqData.data.password, function (error, user) {
      if (!error) {
        var resContent = generateResponse(user);
        resContent.messages = ['User ' + user.username + ' successfully updated!'];
        res.status(201).send(resContent);
      }
    });
  });
});

module.exports = router;