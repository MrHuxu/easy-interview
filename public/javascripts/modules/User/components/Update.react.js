import React, { Component } from 'react';
import Edit from './Edit.react';
import UserActions from '../actions/UserActions';
import { MessageDispatcher } from '../../Common/dispatcher/AppDispatcher';

class Update extends Component {
  update () {
    var userData = arguments[0];
    if (userData.password !== userData.confirmPassword) {
      MessageDispatcher.dispatch({
        actionType: 'REFRESH_MESSAGE',
        content: ['Are you sure you confirmed the password?']
      });
    } else {
      UserActions.update({
        id   : UserStore.getId(),
        data : userData
      });
    }
  }

  render () {
    return <Edit btnLabel='Update' action={this.update}/>;
  }
};

export default Update;