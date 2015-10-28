import React, { Component } from 'react';
import history from '../../../router/history';
import Message from './Message.react';
import { Link } from 'react-router';
import { userLogout } from '../../User/actions/UserActions';
import { AuthEvent } from '../events';
import { connect } from 'react-redux';

class Navbar extends Component {
  constructor (props) {
    super(props);
    this.state = {username: ''};

    this.logout = this.logout.bind(this);
    this.toDashboard = this.toDashboard.bind(this);
  }

  login () {
    this.setState({username: UserStore._username});
  }

  logout () {
    this.props.dispatch(userLogout());
  }

  toDashboard () {
    history.replaceState(null, '/');
  }

  render () {
    var actionItem = this.props.isLoggedIn ? (
      <div>
        <p>
          Login as &nbsp;
          <Link to='/user/update'>{this.props.username}</Link> &nbsp;
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
}

function mapStateToProps (state) {
  return {
    isLoggedIn : state.user.id,
    username   : state.user.username
  }
}

export default connect(mapStateToProps)(Navbar);