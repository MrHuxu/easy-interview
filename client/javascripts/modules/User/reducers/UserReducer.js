import { AUTH_PASSED, USER_LOGOUT } from '../actions/UserActions';

export function user (state = {
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
      return Object.assign({}, {
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