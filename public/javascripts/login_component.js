var Login = React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  getInitialState: function () {
    return {
      username: '',
      password: ''
    };
  },

  login: function (e) {
    e.preventDefault();
    Auth.login({
      username: this.state.username,
      password: this.state.password
    }).catch(function (err) {
      console.log('Error logging in ', err);
    });
  },

  render: function () {
    return (
      <form role="form">
        <div className="form-group">
          <input type="text" valueLink={this.linkState('username')} placeholder="Username" />
          <input type="password" valueLink={this.linkState('password')} placeholder="Password" />
        </div>
        <button type="submit" onClick={this.login.bind(this)}>login</button>
      </form>
    );
  }
});
