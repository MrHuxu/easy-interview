import React from 'react';
import Router, { Link, History } from 'react-router';
import Message from './Message.react';
import UserActions from '../../User/actions/UserActions';
import UserStore from '../../User/stores/UserStore';
import { AuthEvent } from '../events';


var Navbar = React.createClass({
  mixins : [History],

  getInitialState: function () {
    return {username: ''};
  },

  componentDidMount: function () {
    AuthEvent.addListener('USER_LOGIN', this.login);
  },

  componentWillUnmound: function () {
    AuthEvent.removeListener('USER_LOGIN', this.login);
  },

  login: function () {
    this.setState({username: UserStore._username});
  },

  logout: function () {
    UserActions.logout();
    this.setState({username: ''});
  },

  toDashboard: function () {
    this.history.replaceState(null, '/');
  },

  render: function () {
    var actionItem = UserStore.isLoggedIn() ? (
      <div>
        <p>
          Login as &nbsp;
          <Link to='/user/update'>{this.state.username}</Link> &nbsp;
        </p>
        <button className='ui button red' onClick={this.logout}>Logout</button>
      </div>
    ) : (
      <div>
        <div className="ui buttons">
          <Link className='ui button' to='/user/login'>Login</Link>
          <div className="or"></div>
          <Link className='ui positive button' to='/user/signup'>Signup</Link>
        </div>
      </div>
    );

    return (
      <div>
        <div className='ui transparent main menu navbar grid'>
          <div className='column'/>
          <div className='six wide column Logo'
               style    ={{cursor: 'pointer'}}
               onClick  ={this.toDashboard}
          >
            <h1>Easy Interview</h1>
            &nbsp;
            <img src='/favicon.ico' height='31' width='31'/>
          </div>
          <div className='five wide column'></div>
          <div className='action-item'>
            {actionItem}
          </div>
        </div>
      </div>
    );
  }
});

export default Navbar;