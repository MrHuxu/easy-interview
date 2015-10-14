import React, { Component } from 'react';
import EditUser from './EditUser.react';
import AuthActions from '../actions/AuthActions';
import { MessageDispatcher } from '../dispatcher/AppDispatcher';

class UpdateUser extends Component {
  update () {
    var userData = arguments[0];
    if (userData.password !== userData.confirmPassword) {
      MessageDispatcher.dispatch({
        actionType: 'REFRESH_MESSAGE',
        content: ['Are you sure you confirmed the password?']
      });
    } else {
      AuthActions.update({
        id   : AuthStore.getId(),
        data : userData
      });
    }
  }

  render () {
    return <EditUser btnLabel='Update' action={this.update}/>;
  }
};

export default UpdateUser;