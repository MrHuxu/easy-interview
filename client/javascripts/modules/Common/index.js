import App from './components/App.react';
import Home from './components/Home.react';
import { rootStore } from '../../rootStore';
import { setCondition, requestQuestions } from '../Question/actions/QuestionActions';

export default {
  path       : '/',
  component  : App,
  childRoutes: [
    { 
      path: 'home', 
      component: Home, 
      onEnter: (nextState, replaceState) => {
        if (!rootStore.getState().user.id)
          replaceState({ nextPathname: nextState.location.pathname }, '/user/login');
        else
          rootStore.dispatch(setCondition({ creator: rootStore.getState().user.id }));
      }
    },
    require('../User'),
    require('../Question')
  ]
};