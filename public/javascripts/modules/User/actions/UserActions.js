import $ from 'jquery';
import { AuthDispatcher, MessageDispatcher } from '../../Common/dispatcher/AppDispatcher';
import history from '../../../router/history'

var UserActions = {
  signup: function (args) {
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
      this.loginUser(data);
      return true;
    });
  },

  update: function (args) {
    $.ajax({
      url: '/auth/update',
      method: 'PUT',
      dataType: 'json',
      data: JSON.stringify(args)
    }).done((data, textStatus, jqXHR) => {
      this.loginUser(data);
      return true;
    });
  },

  login: function (args) {
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
      this.loginUser(data);
      true;
    });
  },

  loginUser: (args) => {
    if (args.operationSuccess) {
      localStorage.setItem('_easy_interview_username', args.username);
      localStorage.setItem('_easy_interview_token', args.token);
      AuthDispatcher.dispatch({
        actionType: 'LOGIN_USER',
        content: args,
        callback: () => {
          history.replaceState(null, '/')
        }
      });
    }
    MessageDispatcher.dispatch({
      actionType: 'REFRESH_MESSAGE',
      content: args.messages
    });
  },

  logout: () => {
    history.replaceState(null, '/');
    MessageDispatcher.dispatch({
      actionType: 'REFRESH_MESSAGE',
      content: ['Logout successfully']
    });
    localStorage.clear();
    AuthDispatcher.dispatch({actionType: 'LOGOUT_USER'});
  }
};

export default UserActions;