var LoginActions = {
  loginUser: function (jwt) {
    RouterContainer.get().transitionTo('/');
    localStorage.setItem('jwt', jwt);
    AppDispatcher.dispatch({
      actionType: 'LOGIN_USER',
      jwt: jwt
    });
  }
};