var Navbar = React.createClass({
  getInitialState: function () {
    return {username: ''};
  },

  componentDidMount: function () {
    AuthStore.bind('login', this.login);
  },

  componentWillUnmount: function () {
    AuthStore.unbind('login', this.login);
  },

  login: function () {
    this.setState({username: AuthStore._username});
  },

  logout: function () {
    AuthActions.logout();
    this.setState({username: ''});
  },

  render: function () {
    var actionItem;
    if (AuthStore.isLoggedIn()) {
      actionItem = (
        <div>
          <p>
            Login as &nbsp;
            <Link to='home'>{this.state.username}</Link> &nbsp;
          </p>
          <button className='ui button red' onClick={this.logout.bind(this)}>Logout</button>
        </div>
      )
    } else {
      actionItem = (
        <div>
          <div className="ui buttons">
            <Link className='ui button' to='login'>Login</Link>
            <div className="or"></div>
            <Link className='ui positive button' to='signup'>Signup</Link>
          </div>
        </div>
      )
    }
    return (
      <div>
        <div className='ui transparent main menu navbar grid'>
            <div className='column'></div>
            <div className='three wide column Logo'>
              <h1>Easy Interview</h1>
            </div>
            <div className='eight wide column'></div>
            <div className='action-item'>
              {actionItem}
            </div>
        </div>
        <Message />
        <RouteHandler />
      </div>
    );
  }
});
