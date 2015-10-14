import React, { Component } from 'react';
import EditUser from './EditUser.react';
import AuthActions from '../actions/AuthActions';
import { MessageDispatcher } from '../dispatcher/AppDispatcher';

class Signup extends Component {
  signup () {
    var userData = arguments[0];
    if (userData.password !== userData.confirmPassword) {
      MessageDispatcher.dispatch({
        actionType: 'REFRESH_MESSAGE',
        content: ['Are you sure you confirmed the password?']
      });
    } else {
      AuthActions.signup(userData);
    }
  }

  render () {
    return <EditUser btnLabel='Signup' action={this.signup}/>;
  }
};

export default Signup;