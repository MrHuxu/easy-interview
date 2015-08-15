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
      <div className='col-lg-4 col-lg-offset-4' id='login-component'>
        <div className='panel panel-info'>
          <div className='panel-heading'>Login</div>
          <div className='panel-body'>
            <form role="form-horizontal">
              <div className='form-group'>
                <label for='loginName' className='col-sm-2 control-label'>User</label>
                <div className='col-sm-10'>
                  <input type='text' className='form-control' id='loginName' valueLink={this.linkState('username')}/>
                </div>
              </div>
              <div className='form-group'>
                <label for='loginPassword' className='col-sm-2 control-label'>Password</label>
                <div className='col-sm-10'>
                  <input type='password' className='form-control' id='loginPassword' valueLink={this.linkState('password')}/>
                </div>
              </div>
              <div className='form-group'>
                <div className='col-sm-10 col-sm-offset-2'>
                  <button className='btn btn-sm btn-success' type="submit" onClick={this.login.bind(this)}>Login</button>
                  <Link className='btn btn-sm btn-primary' to='signup'>Signup</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
});
