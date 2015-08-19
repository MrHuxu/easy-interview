var Auth = {
  signup: function (args) {
    $.ajax({
      url: '/sessions/signup',
      method: 'POST',
      dataType: 'json',
      data: {
        username: args.username,
        password: args.password,
        team: args.team,
        position: args.position
      }
    }).done(function (data, textStatus, jqXHR) {
      AuthActions.loginUser({
        id: data.id,
        username: data.username,
        token: data.id_token,
        team: data.team,
        position: data.position
      });
      return true;
    });
  },

  login: function (args) {
    $.ajax({
      url: '/sessions/login',
      method: 'POST',
      dataType: 'json',
      data: {
        username: args.username,
        password: args.password,
        token: args.token
      }
    }).done(function (data, textStatus, jqXHR) {
      AuthActions.loginUser({
        id: data.id,
        username: data.username,
        token: data.id_token,
        team: data.team,
        position: data.position
      });
      return true;
    });
  },

  logout: function () {
    AuthActions.logout();
  }
};