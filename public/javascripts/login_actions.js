var LoginActions = {
  loginUser: function (id, username, token) {
    localStorage.setItem('_easy_interview_username', username);
    localStorage.setItem('_easy_interview_token', token);
    AppDispatcher.dispatch({
      actionType: 'LOGIN_USER',
      id: id,
      username: username,
      token: token
    });
    RouterContainer.get().transitionTo('/home');
  },

  logout: function () {
    localStorage.clear();
    AppDispatcher.dispatch({actionType: 'LOGOUT_USER'});
    RouterContainer.get().transitionTo('/');
  }
};