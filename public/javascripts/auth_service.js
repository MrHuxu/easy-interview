var Auth = {
  login: function (username, password) {
    $.ajax({
      url: '/sessions/create',
      method: 'POST',
      dataType: 'json',
      data: {
        username: username,
        password: password
      }
    }).done(function (data, textStatus, jqXHR) {
      var jwt = data.id_token;
      LoginActions.loginUser(jwt);
      return true;
    });
  }
};