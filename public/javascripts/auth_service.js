var Auth = {
  signup: function (content) {
    $.ajax({
      url: '/sessions/signup',
      method: 'POST',
      dataType: 'json',
      data: {
        username: content.username,
        password: content.password
      }
    }).done(function (data, textStatus, jqXHR) {
      var id = data.id;
      var username = data.username;
      var token = data.id_token;
      LoginActions.loginUser(id, username, token);
      return true;
    });
  },

  login: function (content) {
    $.ajax({
      url: '/sessions/login',
      method: 'POST',
      dataType: 'json',
      data: {
        username: content.username,
        password: content.password,
        token: content.token
      }
    }).done(function (data, textStatus, jqXHR) {
      var id = data.id;
      var username = data.username;
      var token = data.id_token;
      LoginActions.loginUser(id, username, token);
      return true;
    });
  },

  logout: function () {
    LoginActions.logout();
  }
};