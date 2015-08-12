var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var users = [{
  id: 1,
  username: 'xhu',
  password: 'xhu'
}];

var createToken = function (user) {
  return jwt.sign(user, 'easy-interview');
}

router.post('/create', function (req, res) {
  var user = users[0];
  console.log('user: ' + user);
  res.status(201).send({
    id_token: createToken(user)
  });
});

module.exports = router;