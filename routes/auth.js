var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var User = require('../models/user');

router.post('/login', function (req, res) {
  User.findOne({username: req.body.username}).exec(function (err, user) {
    var callback = function (user) {
      res.status(201).send({
        operationSuccess: true,
        id: user._id,
        username: user.username,
        token: user.crypted_password,
        team: user.team,
        position: user.position,
        messages: ['Login successfully!']
      });
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
      res.status(201).send({
        operationSuccess: true,
        id: user._id,
        username: user.username,
        token: user.crypted_password,
        team: user.team,
        position: user.position,
        messages: ['User ' + user.username + ' successfully created!']
      });
    }
  })
});

module.exports = router;