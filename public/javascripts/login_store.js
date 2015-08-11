var LoginStore = {
  _user: null,
  _jwt: null,

  _registerToActions(action) {
    switch(action.actionType) {
      case 'LOGIN_USER':
        this._jwt = action.jwt;
        this._user = jwt_decode(this._jwt);
        this.trigger('login');
        break;
      default:
        break;
    };
  },

  getUser: function () {
    return this._user;
  },

  getJwt: function () {
    return this._jwt;
  },

  isLoggedIn: function () {
    return !!this._user;
  }
};

MicroEvent.mixin(LoginStore);

AppDispatcher.register(LoginStore._registerToActions.bind(LoginStore));