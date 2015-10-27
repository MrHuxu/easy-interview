import React, { Component } from 'react';
import Edit from './Edit.react';
import { userSignup } from '../actions/UserActions';
import { MessageDispatcher } from '../../Common/dispatcher/AppDispatcher';
import { connect } from 'react-redux';

class Signup extends Component {
  constructor (props) {
    super(props);
    this.signup = this.signup.bind(this);
  }

  signup () {
    var userData = arguments[0];
    if (userData.password !== userData.confirmPassword) {
      MessageDispatcher.dispatch({
        actionType: 'REFRESH_MESSAGE',
        content: ['Are you sure you confirmed the password?']
      });
    } else {
      this.props.dispatch(userSignup(userData));
    }
  }

  render () {
    return <Edit btnLabel='Signup' action={this.signup}/>;
  }
};

export default connect()(Signup);