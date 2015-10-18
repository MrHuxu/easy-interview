import $ from 'jquery';
window.jQuery = $; // Assure it's available globally.
require('../stylesheets/style.css');
require('../bower_components/semantic-ui/dist/semantic.min.js');

import React from 'react';
import ReactDom from 'react-dom';
import { Router } from 'react-router';

var UserActions = require('./modules/User/actions/UserActions');

var rootRoute = require('./router/routes');
import history from './router/history'

var username = localStorage.getItem('_easy_interview_username');
var token = localStorage.getItem('_easy_interview_token');
if (username && token) {
  UserActions.login({
    username: username,
    token: token
  });
}

ReactDom.render(
  <Router history={history} routes={rootRoute}></Router>,
  document.getElementById('easy-interview')
);