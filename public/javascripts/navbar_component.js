var Navbar = React.createClass({
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
        <div className='navbar-collapse collapse navbar-responsive-collapse'>
          <p>Login as {this.state.username}</p>
          <button className='btn btn-danger' onClick={this.logout.bind(this)}>logout</button>
        </div>
      )
    } else {
      actionItem = (
        <div className='navbar-collapse collapse navbar-responsive-collapse'>
          <Link className='btn btn-success' to='login'>login</Link>
          <p>or</p>
          <Link className='btn btn-default' to='signup'>signup</Link>
        </div>
      )
    }
    return (
      <div>
        <div className='navbar navbar-default navbar-static-top'>
          {actionItem}
        </div>
        <RouteHandler/>
      </div>
    );
  }
});
