var AuthActions = {
  signup: function (args) {
    var self = this;
    $.ajax({
      url: '/auth/signup',
      method: 'POST',
      dataType: 'json',
      data: {
        username: args.username,
        password: args.password,
        team: args.team,
        position: args.position
      }
    }).done(function (data, textStatus, jqXHR) {
      self.loginUser(data);
      return true;
    });
  },

  update: function (args) {
    var self = this;
    $.ajax({
      url: '/auth/update',
      method: 'POST',
      dataType: 'json',
      data: JSON.stringify(args)
    }).done(function (data, textStatus, jqXHR) {
      self.loginUser(data);
      return true;
    });
  },

  login: function (args) {
    var self = this;
    $.ajax({
      url: '/auth/login',
      method: 'POST',
      dataType: 'json',
      data: {
        username: args.username,
        password: args.password,
        token: args.token
      }
    }).done(function (data, textStatus, jqXHR) {
      self.loginUser(data);
      return true;
    });
  },

  loginUser: function (args) {
    if (args.operationSuccess) {
      RouterContainer.get().transitionTo('/home');
      localStorage.setItem('_easy_interview_username', args.username);
      localStorage.setItem('_easy_interview_token', args.token);
      AuthDispatcher.dispatch({
        actionType: 'LOGIN_USER',
        content: args
      });
    }
    MessageDispatcher.dispatch({
      actionType: 'REFRESH_MESSAGE',
      content: args.messages
    });
  },

  logout: function () {
    RouterContainer.get().transitionTo('/');
    MessageDispatcher.dispatch({
      actionType: 'REFRESH_MESSAGE',
      content: ['Logout successfully']
    });
    localStorage.clear();
    AuthDispatcher.dispatch({actionType: 'LOGOUT_USER'});
  }
};