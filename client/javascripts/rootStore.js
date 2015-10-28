import thunkMiddleware from 'redux-thunk';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { message } from './modules/Common/reducers/MessageReducer';
import { user } from './modules/User/reducers/UserReducer';
import { question } from './modules/Question/reducers/QuestionReducer';
import { selection } from './modules/Question/reducers/SelectionReducer';
import { pagination } from './modules/Question/reducers/PaginationReducer';
import createHistory from 'history/lib/createBrowserHistory';
import { reduxReactRouter, routerStateReducer } from 'redux-router';

const rootReducer = combineReducers({
  message,
  user,
  question,
  selection,
  pagination,
  router: routerStateReducer
});

export const rootStore = compose(
  applyMiddleware(thunkMiddleware),
  reduxReactRouter({ createHistory })
)(createStore)(rootReducer);