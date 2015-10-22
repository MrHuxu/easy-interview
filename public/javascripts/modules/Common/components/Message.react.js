import $ from 'jquery';
import React, { Component } from 'react';
import MessageStore from '../stores/MessageStore';
import { MessageEvent } from '../events';

class Message extends Component {
  constructor (props) {
    super(props);
    this.state = { messages: [] };

    this.refreshMessages = this.refreshMessages.bind(this);
  }

  componentDidMount () {
    MessageEvent.addListener('REFRESH_MESSAGE', this.refreshMessages);
  }

  componentWillUnmound () {
    MessageEvent.removeListener('REFRESH_MESSAGE', this.refreshMessages);
  }

  componentDidUpdate () {
    $('.message .close').on('click', function() {
      $(this).closest('.message').fadeOut();
    });
  }

  refreshMessages () {
    this.setState({messages: MessageStore.getMessages()});
  }

  render () {
    var messageItems = this.state.messages.map((message) => {
      return (
        <div className='ui small floating teal message' key={this.state.messages.indexOf(message)}>
          <i className='close icon'></i>
          <div className='header'>
            {message}
          </div>
        </div>
      );
    });

    return (
      <div>
        {messageItems}
        <br />
      </div>
    );
  }
}

export default Message;