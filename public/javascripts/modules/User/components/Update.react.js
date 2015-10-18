import React, { Component } from 'react';
import Edit from './Edit.react';
import AuthActions from '../../../actions/AuthActions';
import { MessageDispatcher } from '../../../dispatcher/AppDispatcher';

class Update extends Component {
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
    return <Edit btnLabel='Update' action={this.update}/>;
  }
};

export default Update;