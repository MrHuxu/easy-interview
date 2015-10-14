require('../stylesheets/style.css');

import React from 'react';
import ReactDom from 'react-dom';
import { Router } from 'react-router';
var rootRoute = require('./router/routes');

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
  <Router routes={rootRoute}></Router>,
  document.getElementById('easy-interview')
);