import $ from 'jquery';
window.jQuery = $; // Assure it's available globally.
require('../stylesheets/style.css');
require('../../node_modules/nprogress/nprogress.css');
require('../../server/public/bower_components/semantic/dist/semantic.min.js');

import React from 'react';
import ReactDom from 'react-dom';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import { rootStore } from './rootStore';

import { userLogin } from './modules/User/actions/UserActions';

var rootRoute = require('./router/routes');
import history from './router/history'

var username = localStorage.getItem('_easy_interview_username');
var token = localStorage.getItem('_easy_interview_token');
if (username && token) {
  rootStore.dispatch(userLogin({
    username : username,
    token    : token
  }));
}

ReactDom.render(
  <Provider store={rootStore}>
    <Router history={history} routes={rootRoute}></Router>
  </Provider>,
  document.getElementById('easy-interview')
);
