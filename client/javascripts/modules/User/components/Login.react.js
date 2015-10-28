import React, { Component } from 'react';
import reactMixin from 'react-mixin';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import { userLogin } from '../actions/UserActions';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class Login extends Component {
  constructor (props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };

    this.login = this.login.bind(this);
  }

  login (e) {
    e.preventDefault();
    this.props.dispatch(userLogin({
      username: this.state.username,
      password: this.state.password
    }));
  }

  render () {
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
};

reactMixin(Login.prototype, LinkedStateMixin);

export default connect()(Login);