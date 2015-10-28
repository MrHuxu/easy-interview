import React, { Component } from 'react';
import Edit from './Edit.react';
import { userUpdate } from '../actions/UserActions';
import { addMessages } from '../../Common/actions/MessageActions';
import { connect } from 'react-redux';

class Update extends Component {
  constructor (props) {
    super(props);
    this.update = this.update.bind(this);
  }

  update () {
    var userData = arguments[0];
    if (userData.password !== userData.confirmPassword) {
      this.props.dispatch(addMessages(['Are you sure you confirmed the password?']));
    } else {
      this.props.dispatch(userUpdate({
        id   : this.props.userId,
        data : userData
      }));
    }
  }

  render () {
    return <Edit btnLabel='Update' action={this.update}/>;
  }
};

function mapStateToProps (state) {
  return {
    userId: state.user.id
  };
}

export default connect(mapStateToProps)(Update);