import $ from 'jquery';
import { AuthDispatcher, MessageDispatcher } from '../../Common/dispatcher/AppDispatcher';
import history from '../../../router/history'

export const USER_SIGNUP = 'USER_SIGNUP';
export function userSignup (args) {
  return function (dispatch) {
    $.ajax({
      url: '/auth/signup',
      method: 'POST',
      dataType: 'json',
      data: {
        username: args.username,
        password: args.password,
        team: args.team,
        position: args.position
      }
    }).done((data, textStatus, jqXHR) => {
      dispatch(authPassed(data));
    });
  };
};

export const USER_UPDATE = 'USER_UPDATE';
export function userUpdate (args) {
  return function (dispatch) {
    $.ajax({
      url: '/auth/update',
      method: 'PUT',
      dataType: 'json',
      data: JSON.stringify(args)
    }).done((data, textStatus, jqXHR) => {
      dispatch(authPassed(data));
    });
  };
};

export const USER_LOGIN = 'USER_LOGIN';
export function userLogin (args) {
  return function (dispatch) {
    $.ajax({
      url: '/auth/login',
      method: 'POST',
      dataType: 'json',
      data: {
        username: args.username,
        password: args.password,
        token: args.token
      }
    }).done((data, textStatus, jqXHR) => {
      dispatch(authPassed(data));
    });
  };
};

export const AUTH_PASSED = 'AUTH_PASSED';
export function authPassed (args) {
  if (args.operationSuccess) {
    localStorage.setItem('_easy_interview_username', args.username);
    localStorage.setItem('_easy_interview_token', args.token);
    // MessageDispatcher.dispatch({
    //   actionType: 'REFRESH_MESSAGE',
    //   content: args.messages
    // });
    history.replaceState(null, '/');
    return {
      type    : AUTH_PASSED,
      content : args
    };
  }
}

export const USER_LOGOUT = 'USER_LOGOUT';
export function userLogout () {
  history.replaceState(null, '/');
  MessageDispatcher.dispatch({
    actionType: 'REFRESH_MESSAGE',
    content: ['Logout successfully']
  });
  localStorage.clear();
  return {
    type: USER_LOGOUT
  };
};