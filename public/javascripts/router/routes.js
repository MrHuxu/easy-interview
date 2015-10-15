var React = require('react');
var Route = require('react-router').Route;

import App from '../components/App.react';
var Navbar = require('../components/Navbar.react');
var Dashboard = require('../components/Dashboard.react');
var Login = require('../components/Login.react');
var Signup = require('../components/Signup.react');
var UpdateUser = require('../components/UpdateUser.react');
var Home = require('../components/Home.react');
var EditQuestion = require('../components/EditQuestion.react');
var PreviewQuestion = require('../components/PreviewQuestion.react');

import AuthStore from '../stores/AuthStore';
import history from './history';

const rootRoute = {
  component: 'div',
  childRoutes: [
    { path: '/',
      component: App,
      childRoutes: [
        { path: 'login', component: Login },
        { path: 'signup', component: Signup },
        { path: 'update_user', component: UpdateUser },
        { path: 'home', component: Home, onEnter: (nextState, replaceState) => {
          if (!AuthStore.isLoggedIn())
            replaceState({ nextPathname: nextState.location.pathname }, '/login')
        }},
        { path: '/quesiton/new', component: EditQuestion },
        { path: '/question/:questionId/edit', component: EditQuestion },
        { path: '/question/:role/view', component: PreviewQuestion }
      ]
    }
  ]
}

module.exports = rootRoute;