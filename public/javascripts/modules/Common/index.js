import App from './components/App.react';
import Home from './components/Home.react';
import { rootStore } from '../../rootStore';

export default {
  path       : '/',
  component  : App,
  childRoutes: [
    { 
      path: 'home', 
      component: Home, 
      onEnter: (nextState, replaceState) => {
        if (!rootStore.getState().user.id)
          replaceState({ nextPathname: nextState.location.pathname }, '/user/login')
      }
    },
    require('../User'),
    require('../Question')
  ]
};