var Authentication = React.createClass({
  getInitialState: function () {
    return {username: ''};
  },

  componentDidMount: function () {
    LoginStore.bind('login', this.login);
  },

  componentWillUnmount: function () {
    LoginStore.unbind('login', this.login);
  },

  login: function () {
    this.setState({username: LoginStore._username});
  },

  logout: function () {
    Auth.logout();
    this.setState({username: ''});
  },

  render: function () {
    var actionItem;
    if (LoginStore.isLoggedIn()) {
      actionItem = (
        <div>
          <p>Login as {this.state.username}</p>
          <button onClick={this.logout.bind(this)}>logout</button>
        </div>
      )
    } else {
      actionItem = (
        <div>
          <Link to='login'>login</Link>
          <p>or</p>
          <Link to='signup'>signup</Link>
        </div>
      )
    }
    return actionItem;
  }
})

var Dashboard = React.createClass({
  render: function () {
    return (
      <div>
        <h1>Dashboard</h1>
        <Authentication />
        <RouteHandler/>
      </div>
    );
  }
})