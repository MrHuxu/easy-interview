import { routerStateReducer } from 'redux-router';
import { SELECT_QUESTION, UNSELECT_QUESTION } from '../actions/SelectionActions';

function selection (state = [], action) {
  switch (action.type) {
    case SELECT_QUESTION:
      return [...state, action.content];

    case UNSELECT_QUESTION:
      return state.filter(data =>
        data.id !== action.content
      );

    default:
      return state;
  }
}

export default selection;