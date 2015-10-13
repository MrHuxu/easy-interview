require('../stylesheets/style.css');

var React = require('react/addons');
var Router = require('react-router');
var routes = require('./router/routes');

var AuthActions = require('./actions/AuthActions');

var username = localStorage.getItem('_easy_interview_username');
var token = localStorage.getItem('_easy_interview_token');
if (username && token) {
  AuthActions.login({
    username: username,
    token: token
  });
}

Router.run(routes, function (Handler, state) {
  React.render(<Handler />, document.getElementById('easy-interview'));
});