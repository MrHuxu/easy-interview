var express = require('express');
var router = express.Router();
var User = require('../models/user');
var famousSayings = require('../public/resources/famous_saying');

var generateResponse = (user) => {
  return {
    operationSuccess: true,
    id: user._id,
    username: user.username,
    token: user.crypted_password,
    team: user.team,
    position: user.position,
    questions: user.questions
  };
};

router.post('/login', (req, res) => {
  User.findOne({username: req.body.username}).exec((err, user) => {
    var callback = function (user) {
      var resContent = generateResponse(user);
      resContent.messages = ['Welcome ' + user.username + ' ! ' + famousSayings[parseInt(Math.random() * 10)]];
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

router.post('/signup', (req, res) => {
  User.saveWithSalt(req, (err, user) => {
    if (err) {
      var errorMessages = Object.keys(err.errors).map((key) => {
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

router.put('/update', (req, res) => {
  var reqData = JSON.parse(Object.keys(req.body)[0]);
  User.findOneAndUpdate({_id: reqData.id}, reqData.data, (err, user) => {
    user.updatePassword(reqData.data.password, (error, user) => {
      if (!error) {
        var resContent = generateResponse(user);
        resContent.messages = ['User ' + user.username + ' successfully updated!'];
        res.status(201).send(resContent);
      }
    });
  });
});

module.exports = router;