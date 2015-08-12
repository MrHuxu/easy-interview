var LoginActions = {
  loginUser: function (username, token) {
    localStorage.setItem('_easy_interview_username', username);
    localStorage.setItem('_easy_interview_token', token);
    RouterContainer.get().transitionTo('/');
    AppDispatcher.dispatch({
      actionType: 'LOGIN_USER',
      username: username,
      token: token
    });
  },

  logout: function () {
    localStorage.clear();
    AppDispatcher.dispatch({actionType: 'LOGOUT_USER'});
    RouterContainer.get().transitionTo('/');
  }
};