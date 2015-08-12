var Home = React.createClass({
  statics: {
    willTransitionTo: function (transition) {
      if (!LoginStore.isLoggedIn()) {
        transition.redirect('login');
      }
    }
  },

  getInitialState: function () {
    return this._getLoginState();
  },

  _getLoginState: function () {
    return {
      userLoggedIn: LoginStore.isLoggedIn(),
      user: LoginStore.getUser(),
      jwt: LoginStore.getJwt()
    };
  },

  login: function () {
    this.setState(this._getLoginState());
  },

  render: function () {
    return (
      <h1>hello {this.state.user}</h1>
    );
  }

})