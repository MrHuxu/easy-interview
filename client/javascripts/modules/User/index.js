import Login from './components/Login.react';
import Signup from './components/Signup.react';
import Update from './components/Update.react';

module.exports = {
  path: 'user',
  childRoutes: [{
    path: 'login',
    component: Login
  }, {
    path: 'signup',
    component: Signup
  }, {
    path: 'update',
    component: Update
  }]
};