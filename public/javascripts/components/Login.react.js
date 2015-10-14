var React = require('react')
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var $ = require('jquery');
window.jQuery = $; // Assure it's available globally.
require('../../bower_components/semantic-ui/dist/semantic.min.js');
var AuthActions = require('../actions/AuthActions');
var Link = require('react-router').Link;

var Login = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function () {
    return {
      username: '',
      password: ''
    };
  },

  login: function (e) {
    e.preventDefault();
    AuthActions.login({
      username: this.state.username,
      password: this.state.password
    });
  },

  render: function () {
    return (
      <div className='ui stackable grid'>
        <div className='six wide column'></div>
        <div className='four wide column'>
          <div className="ui segments">
            <div className="ui top attached secondary segment">Login</div>
            <div className="ui blue segment">
              <form className="ui form">
                <h4 className="ui dividing header">Login Confirmation</h4>
                <div className="field">
                  <label>Name</label>
                  <input type="text" valueLink={this.linkState('username')}/>
                </div>
                <div className='field'>
                  <label>Password</label>
                  <input type='password' valueLink={this.linkState('password')}/>
                </div>
                <div className='field'>
                  <button className='ui green button small' type="submit" onClick={this.login}>Login</button>
                  <Link className="ui blue labeled small icon button" to='signup'>
                    <i className="signup icon"></i>
                    Signup
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default Login;