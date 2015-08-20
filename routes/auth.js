var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var User = require('../models/user');

var createToken = function (user) {
  return jwt.sign({username: user.username, password: user.password}, 'easy-interview');
}

router.post('/login', function (req, res) {
  User.findOne({username: req.body.username}).exec(function (err, user) {
    if (user) {
        if (req.body.password) {
        user.loginWithPassword(req.body.password, function () {
          res.status(201).send({
            id: user._id,
            username: user.username,
            id_token: user.crypted_password,
            team: user.team,
            position: user.position
          });
        });
      } else if (req.body.token) {
        user.loginWithToken(req.body.token, function () {
          res.status(201).send({
            id: user._id,
            username: user.username,
            id_token: user.crypted_password,
            team: user.team,
            position: user.position
          });
        });
      }
    }
  });
});

router.post('/signup', function (req, res) {
  User.saveWithSalt(req, function (err, user) {
    if (err) {
      res.status(403).send({
        
      })
    } else {
      res.status(201).send({
        id: user._id,
        username: user.username,
        id_token: user.crypted_password,
        team: user.team,
        position: user.position
      });
    }
  })
});

module.exports = router;