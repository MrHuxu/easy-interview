import { CHANGE_PAGE } from '../actions/PaginationActions';

function pagination (state = {
  page: 1
}, action) {
  switch (action.type) {
    case CHANGE_PAGE:
      return Object.assign(state, action.content);

    default:
      return state;
  }
}

export default pagination;