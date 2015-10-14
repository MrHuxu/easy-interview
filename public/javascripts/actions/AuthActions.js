import $ from 'jquery';
import { AuthDispatcher, MessageDispatcher } from '../dispatcher/AppDispatcher';
import RouterContainer from '../router/RouterContainer';

const AuthActions = {
  signup: (args) => {
    var self = this;
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
      self.loginUser(data);
      return true;
    });
  },

  update: (args) => {
    var self = this;
    $.ajax({
      url: '/auth/update',
      method: 'PUT',
      dataType: 'json',
      data: JSON.stringify(args)
    }).done((data, textStatus, jqXHR) => {
      self.loginUser(data);
      return true;
    });
  },

  login: (args) => {
    var self = this;
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
      self.loginUser(data);
      return true;
    });
  },

  loginUser: (args) => {
    if (args.operationSuccess) {
      RouterContainer.get().transitionTo('/home');
      localStorage.setItem('_easy_interview_username', args.username);
      localStorage.setItem('_easy_interview_token', args.token);
      AuthDispatcher.dispatch({
        actionType: 'LOGIN_USER',
        content: args
      });
    }
    MessageDispatcher.dispatch({
      actionType: 'REFRESH_MESSAGE',
      content: args.messages
    });
  },

  logout: () => {
    RouterContainer.get().transitionTo('/');
    MessageDispatcher.dispatch({
      actionType: 'REFRESH_MESSAGE',
      content: ['Logout successfully']
    });
    localStorage.clear();
    AuthDispatcher.dispatch({actionType: 'LOGOUT_USER'});
  }
};

export default AuthActions;