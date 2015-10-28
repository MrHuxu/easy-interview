import { CHANGE_PAGE } from '../actions/PaginationActions';

export function pagination (state = {
  page: 1
}, action) {
  switch (action.type) {
    case CHANGE_PAGE:
      return Object.assign({}, action.content);

    default:
      return state;
  }
}