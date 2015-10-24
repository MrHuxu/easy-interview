import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import { GET_QUESTIONS } from '../actions/QuestionActions';

function questions (state = [{
  title: 'hehe'
}], action) {
  switch (action.type) {
  case GET_QUESTIONS:
    return action.content;
  default:
    return state;
  }
}

const QuestionReducer = combineReducers({
  questions,
  router: routerStateReducer
});

export default QuestionReducer;