require('../stylesheets/style.css');

var React = require('react');
var ReactDom = require('react-dom');
import { Router } from 'react-router';
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

ReactDom.render(
  <Router>
    {routes}
  </Router>,
  document.getElementById('easy-interview')
);