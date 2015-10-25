import $ from 'jquery';
window.jQuery = $; // Assure it's available globally.
require('../stylesheets/style.css');
require('../../node_modules/nprogress/nprogress.css');
require('../bower_components/semantic-ui/dist/semantic.min.js');

import React from 'react';
import ReactDom from 'react-dom';
import { Router } from 'react-router';
import { dispatch } from 'redux';
import { Provider } from 'react-redux';
import { store } from './store';

import { userLogin } from './modules/User/actions/UserActions';

var rootRoute = require('./router/routes');
import history from './router/history'

var username = localStorage.getItem('_easy_interview_username');
var token = localStorage.getItem('_easy_interview_token');
if (username && token) {
  userLogin({
    username : username,
    token    : token
  })
}

ReactDom.render(
  <Provider store={store}>
    <Router history={history} routes={rootRoute}></Router>
  </Provider>,
  document.getElementById('easy-interview')
);
