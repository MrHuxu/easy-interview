var Signup = React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  getInitialState: function () {
    return {
      username: '',
      team: 'UI',
      position: 'DEV',
      password: '',
      confirmPassword: ''
    };
  },

  signup: function (e) {
    e.preventDefault();
    Auth.signup({
      username: this.state.username,
      password: this.state.password
    }).catch(function (err) {
      console.log('Error logging in ', err);
    });;
  },

  render: function () {
    console.log(this.state);
    return (
      <div className='col-lg-4 col-lg-offset-4'>
        <div className='panel panel-success'>
          <div className='panel-heading'>Signup</div>
          <div className='panel-body'>
            <form role="form-horizontal">
              <div className='form-group'>
                <label for='signupName' className='col-sm-2 control-label'>User</label>
                <div className='col-sm-10'>
                  <input type='text' className='form-control' id='signupName' valueLink={this.linkState('username')}/>
                </div>
              </div>
              <div className='form-group'>
                <label for='signupTeam' className='col-sm-2 control-label'>Team</label>
                <div className='col-sm-4'>
                  <select className="form-control" id='signupTeam' valueLink={this.linkState('team')}>
                    <option>UI</option>
                    <option>Ad Serving</option>
                    <option>Forcasting</option>
                    <option>Reporting</option>
                  </select>
                </div>
                <label for='signupPosition' className='col-sm-2 control-label'>Position</label>
                <div className='col-sm-4'>
                  <select className="form-control" id='signupPosition' valueLink={this.linkState('position')}>
                    <option>DEV</option>
                    <option>QA</option>
                  </select>
                </div>
              </div>
              <div className='form-group'>
                <label for='signupPassword' className='col-sm-2 control-label'>Password</label>
                <div className='col-sm-10'>
                  <input type='password' className='form-control' id='signupPassword' valueLink={this.linkState('password')}/>
                </div>
              </div>
              <div className='form-group'>
                <label for='confirmPassword' className='col-sm-2 control-label'>Confirm Password</label>
                <div className='col-sm-10'>
                  <input type='password' className='form-control' id='confirmPassword' valueLink={this.linkState('confirmPassword')}/>
                </div>
              </div>
              <div className='form-group'>
                <div className='col-sm-10 col-sm-offset-2'>
                  <button className='btn btn-sm btn-info' type="submit" onClick={this.signup.bind(this)}>Signup</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
});
