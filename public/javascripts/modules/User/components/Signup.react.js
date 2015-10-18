import React, { Component } from 'react';
import Edit from './Edit.react';
import UserActions from '../actions/UserActions';
import { MessageDispatcher } from '../../Common/dispatcher/AppDispatcher';

class Signup extends Component {
  signup () {
    var userData = arguments[0];
    if (userData.password !== userData.confirmPassword) {
      MessageDispatcher.dispatch({
        actionType: 'REFRESH_MESSAGE',
        content: ['Are you sure you confirmed the password?']
      });
    } else {
      UserActions.signup(userData);
    }
  }

  render () {
    return <Edit btnLabel='Signup' action={this.signup}/>;
  }
};

export default Signup;