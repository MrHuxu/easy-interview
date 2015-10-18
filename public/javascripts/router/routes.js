var React = require('react');
var Route = require('react-router').Route;

import App from '../modules/Common/App.react';
var Navbar = require('../modules/Common/Navbar.react');
var Dashboard = require('../modules/Common/Dashboard.react');
var Home = require('../modules/Common/Home.react');

import AuthStore from '../stores/AuthStore';
import history from './history';

const rootRoute = {
  component: 'div',
  childRoutes: [
    { path: '/',
      component: App,
      childRoutes: [
        { path: 'home', component: Home, onEnter: (nextState, replaceState) => {
          if (!AuthStore.isLoggedIn())
            replaceState({ nextPathname: nextState.location.pathname }, '/user/login')
        }},
        require('../modules/User')
      ]
    }
  ]
}

module.exports = rootRoute;