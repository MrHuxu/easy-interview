import { SHOW_MESSAGES, REMOVE_MESSAGES } from '../actions/MessageActions';

export function message (state = {
  records: []
}, action) {
  switch (action.type) {
    case SHOW_MESSAGES:
      return Object.assign({}, {
        records: action.content
      });

    case REMOVE_MESSAGES:
      return { records: [] };

    default:
      return state;
  }
}