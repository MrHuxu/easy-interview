var Home = React.createClass({
  statics: {
    willTransitionTo: function (transition) {
      if (!LoginStore.isLoggedIn()) {
        transition.redirect('login');
      }
    }
  },

  getInitialState: function () {
    return this._getLoginState();
  },

  _getLoginState: function () {
    return {
      userLoggedIn: LoginStore.isLoggedIn(),
      username: LoginStore.getUser(),
      token: LoginStore.getToken()
    };
  },

  login: function () {
    this.setState(this._getLoginState());
  },

  render: function () {
    return (
      <div className='ui stackable grid'>
        <div className='three wide column'></div>
        <div className='ten wide column'>
          <div className='ui stackable grid'>
            <div className='sixteen wide column'>
              <h2>Hello {this.state.username}</h2>
            </div>
            <div className='fourteen wide column'>
              <div className='ui grid'>
                <div className='three wide column'>
                  <p>Team: Forecasting</p>
                </div>
                <div className='two wide column'>
                  <p>Position: DEV</p>
                </div>
              </div>
            </div>
            <div className='two wide column'>
              <Link className='ui green small button' to='new_question'>Create</Link>
            </div>
          </div>
          <div className="ui horizontal divider"><i className="tag icon"></i></div>
        </div>
      </div>
    );
  }

})