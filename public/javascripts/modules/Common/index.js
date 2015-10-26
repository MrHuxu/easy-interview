import App from './components/App.react';
import Home from './components/Home.react';
import UserStore from '../User/stores/UserStore';

export default {
  path       : '/',
  component  : App,
  childRoutes: [
    { 
      path: 'home', 
      component: Home, 
      onEnter: (nextState, replaceState) => {
        if (!UserStore.isLoggedIn())
          replaceState({ nextPathname: nextState.location.pathname }, '/user/login')
      }
    },
    require('../User'),
    require('../Question')
  ]
};