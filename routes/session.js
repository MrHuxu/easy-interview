var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var User = require('../models/user');

var createToken = function (user) {
  return jwt.sign({username: user.username, password: user.password}, 'easy-interview');
}

router.post('/login', function (req, res) {
  User.findOne({username: req.body.username}).exec(function (err, user) {
    if (req.body.password) {
      user.loginWithPassword(req.body.password, function () {
        res.status(201).send({
          username: user.username,
          id_token: user.crypted_password
        });
      });
    } else if (req.body.token) {
      user.loginWithToken(req.body.token, function () {
        res.status(201).send({
          username: user.username,
          id_token: user.crypted_password
        });
      });
    }
  });
});

router.post('/signup', function (req, res) {
  User.saveWithSalt(req, function (err, user) {
    if (err) {

    } else {
      res.status(201).send({
        username: user.username,
        id_token: user.crypted_password
      });
    }
  })
});

module.exports = router;