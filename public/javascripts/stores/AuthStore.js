var AuthStore = {
  _id: null,
  _username: null,
  _token: null,
  _team: null,
  _position: null,

  _registerToActions: function (action) {
    switch(action.actionType) {
      case 'LOGIN_USER':
        this._id = action.content.id;
        this._username = action.content.username;
        this._token = action.content.token;
        this._team = action.content.team;
        this._position = action.content.position;
        this.trigger('login');
        break;
      case 'LOGOUT_USER':
        this._id = null;
        this._username = null;
        this._token = null;
        this._team = null;
        this._position = null;
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

  isLoggedIn: function () {
    return !!this._username;
  }
};

MicroEvent.mixin(AuthStore);

AuthDispatcher.register(AuthStore._registerToActions.bind(AuthStore));