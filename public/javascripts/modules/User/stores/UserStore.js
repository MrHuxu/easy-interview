import { AuthDispatcher } from '../../Common/dispatcher/AppDispatcher';
import { AuthEvent } from '../../Common/events';

var UserStore = {
  _id: null,
  _username: null,
  _token: null,
  _team: null,
  _position: null,
  _questions: [],

  _registerToActions: function (action) {
    switch(action.actionType) {
      case 'LOGIN_USER':
        this._id = action.content.id;
        this._username = action.content.username;
        this._token = action.content.token;
        this._team = action.content.team;
        this._position = action.content.position;
        this._questions = action.content.questions.slice(0);
        action.callback();
        AuthEvent.emit('login');
        break;
      case 'LOGOUT_USER':
        this._id = null;
        this._username = null;
        this._token = null;
        this._team = null;
        this._position = null;
        this._questions = [];
        break;
      default:
        break;
    };
  },

  getUser: function () {
    return this._username;
  },

  getId: function () {
    return this._id;
  },

  getToken: function () {
    return this._token;
  },

  getQuestions: function () {
    return this._questions;
  },

  isLoggedIn: function () {
    return !!this._username;
  }
};

AuthDispatcher.register(UserStore._registerToActions.bind(UserStore));

export default UserStore;