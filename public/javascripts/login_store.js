var LoginStore = {
  _id: null,
  _username: null,
  _token: null,

  _registerToActions(action) {
    switch(action.actionType) {
      case 'LOGIN_USER':
        this._id = action.id;
        this._username = action.username;
        this._token = action.token;
        this.trigger('login');
        break;
      case 'LOGOUT_USER':
        this._username = null;
        this._token = null;
        break;
      default:
        break;
    };
  },

  getUser: function () {
    return this._username;
  },

  getToken: function () {
    return this._token;
  },

  isLoggedIn: function () {
    return !!this._username;
  }
};

MicroEvent.mixin(LoginStore);

AppDispatcher.register(LoginStore._registerToActions.bind(LoginStore));