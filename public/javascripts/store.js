
import thunkMiddleware from 'redux-thunk';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import user from './modules/User/reducers/UserReducer';
import questions from './modules/Question/reducers/QuestionReducer';
import selection from './modules/Question/reducers/SelectionReducer';
import createHistory from 'history/lib/createBrowserHistory';
import { reduxReactRouter, routerStateReducer } from 'redux-router';

const rootReducer = combineReducers({
  user,
  questions,
  selection,
  router: routerStateReducer
});

export const store = compose(
  applyMiddleware(thunkMiddleware),
  reduxReactRouter({ createHistory })
)(createStore)(rootReducer);