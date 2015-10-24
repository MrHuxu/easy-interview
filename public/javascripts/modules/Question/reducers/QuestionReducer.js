import { combineReducers } from 'redux';
import {
  REQUEST_QUESTIONS,
  RECEIVE_QUESTIONS,
  NEW_QUESTION,
  UPDATE_QUESTION,
  DELETE_QUESTION
} from '../actions/QuestionActions';
import history from '../../../router/history';

function questions (state = [], action) {
  switch (action.type) {
  case RECEIVE_QUESTIONS:
    return action.content;

  case NEW_QUESTION:
    history.goBack();
    return state;

  case UPDATE_QUESTION:
    history.goBack();
    return state;

  default:
    return state;
  }
}

export default questions;