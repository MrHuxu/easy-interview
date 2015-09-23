var Signup = React.createClass({
  signup: function () {
    var userData = arguments[0];
    if (userData.password !== userData.confirmPassword) {
      MessageDispatcher.dispatch({
        actionType: 'REFRESH_MESSAGE',
        content: ['Are you sure you confirmed the password?']
      });
    } else {
      AuthActions.signup(userData);
    }
  },

  render: function () {
    return <EditUser btnLabel='Signup' action={this.signup.bind(this)}/>;
  }
});
