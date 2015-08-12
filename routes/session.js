var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var User = require('../models/user');

var createToken = function (user) {
  return jwt.sign({username: user.username, password: user.password}, 'easy-interview');
}

router.post('/login', function (req, res) {
  User.find({username: req.body.username}).exec(function (err, results) {
    var user = results[0];
    if (user.password === req.body.password || user.token === req.body.token) {
      res.status(201).send({
        username: user.username,
        id_token: user.token
      });
    }
  });
});

router.post('/signup', function (req, res) {
  var user = new User({
    username: req.body.username,
    password: req.body.password,
    token: createToken(req.body)
  });
  user.save();
  res.status(201).send({
    username: user.username,
    id_token: user.token
  });
});

module.exports = router;