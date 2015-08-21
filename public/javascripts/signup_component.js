var Signup = React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  getInitialState: function () {
    return {
      username: '',
      team: '',
      position: '',
      password: '',
      confirmPassword: ''
    };
  },

  signup: function (e) {
    e.preventDefault();
    AuthActions.signup(this.state);
  },

  componentDidMount: function () {
    var self = this;
    $('.signup-team').dropdown('setting', 'onChange', function (value) {
      self.setState({team: value});
    });
    $('.signup-position').dropdown('setting', 'onChange', function (value) {
      self.setState({position: value});
    });
  },

  render: function () {
    return (
      <div className='ui three column grid'>
        <div className='column'></div>
        <div className='column'>
          <div className="ui segments">
            <div className="ui top attached secondary segment">Signup</div>
            <div className="ui green segment">
              <form className="ui form">
                <h4 className="ui dividing header">User Profile</h4>
                <div className="field">
                  <label>Name</label>
                  <input type="text" valueLink={this.linkState('username')}/>
                </div>
                <div className='two fields'>
                  <div className='field'>
                    <label>Team</label>
                    <select className="ui dropdown signup-team">
                      <option value="">Select Team</option>
                      <option value="UI">UI</option>
                      <option value="Ad Serving">Ad Serving</option>
                      <option value='Forecasting'>Forecasting</option>
                      <option value='Reporting'>Reporting</option>
                    </select>
                  </div>
                  <div className='field'>
                    <label>Position</label>
                    <select className="ui dropdown signup-position">
                      <option value="">Select Position</option>
                      <option value='DEV'>DEV</option>
                      <option value='QA'>QA</option>
                    </select>
                  </div>
                </div>
                <div className='field'>
                  <label>Password</label>
                  <input type='password' valueLink={this.linkState('password')}/>
                </div>
                <div className='field'>
                  <label>Confirm Password</label>
                  <input type='password' valueLink={this.linkState('confirmPassword')}/>
                </div>
                <div className='field'>
                  <button className='ui blue button small' type="submit" onClick={this.signup.bind(this)}>Signup</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
