import { combineReducers } from 'redux';
import {
  REQUEST_QUESTIONS,
  RECEIVE_QUESTIONS,
  NEW_QUESTION,
  UPDATE_QUESTION,
  DELETE_QUESTION,
  SET_CONDITION
} from '../actions/QuestionActions';
import history from '../../../router/history';
import NProgress from 'nprogress';

export function question (state = {
  initCondition : {},
  entities      : []
}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      NProgress.done();
      return Object.assign({}, {
        initCondition : state.initCondition,
        entities      : action.content
      });

    case NEW_QUESTION:
      history.goBack();
      return state;

    case UPDATE_QUESTION:
      history.goBack();
      return state;

    case DELETE_QUESTION:
      return state.filter(question => question.id !== action.content);

    case SET_CONDITION:
      return Object.assign({}, {
        initCondition : action.content,
        entities      : state.entities
      });

    default:
      return state;
  }
}