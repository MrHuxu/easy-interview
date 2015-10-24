import $ from 'jquery';
window.jQuery = $; // Assure it's available globally.
require('../stylesheets/style.css');
require('../../node_modules/nprogress/nprogress.css');
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

import { Provider } from 'react-redux';
import { store } from './modules/Question/stores/QuestionStore';

ReactDom.render(
  <Provider store={store}>
    <Router history={history} routes={rootRoute}></Router>
  </Provider>,
  document.getElementById('easy-interview')
);

// import TestList from './modules/Common/components/TestList';
// import { store } from './modules/Question/stores/QuestionStore';
// import { Provider } from 'react-redux';

// ReactDom.render(
//   <TestList store={store}/>, 
//   document.getElementById('testlist')
// );
