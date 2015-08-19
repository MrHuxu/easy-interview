var AuthActions = {
  loginUser: function (args) {
    localStorage.setItem('_easy_interview_username', args.username);
    localStorage.setItem('_easy_interview_token', args.token);
    AuthDispatcher.dispatch({
      actionType: 'LOGIN_USER',
      content: args
    });
    RouterContainer.get().transitionTo('/home');
  },

  logout: function () {
    localStorage.clear();
    AuthDispatcher.dispatch({actionType: 'LOGOUT_USER'});
    RouterContainer.get().transitionTo('/');
  }
};