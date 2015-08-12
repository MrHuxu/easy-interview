var Authentication = React.createClass({
  render: function () {
    var actionItem;
    if (LoginStore.isLoggedIn()) {
      actionItem = (
        <div>
          <p>Login as {LoginStore._username}</p>
          <Link to='login' onClick={Auth.logout.bind(Auth)}>logout</Link>
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