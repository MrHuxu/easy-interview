import { AuthDispatcher } from '../../Common/dispatcher/AppDispatcher';
import { AuthEvent } from '../../Common/events';
import { AUTH_PASSED, USER_LOGOUT } from '../actions/UserActions';

function user (state = {
  id       : null,
  username : null,
  token    : null,
  team     : null,
  position : [],
}, action) {
  switch (action.type) {
    case AUTH_PASSED:
      return Object.assign(state, action.content);

    case USER_LOGOUT:
      return Object.assign(state, {
        id       : null,
        username : null,
        token    : null,
        team     : null,
        position : [],
      });

    default:
      return state;
  }
}

export default user;