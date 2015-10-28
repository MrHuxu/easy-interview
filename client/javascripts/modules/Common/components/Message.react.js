import $ from 'jquery';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Message extends Component {
  constructor (props) {
    super(props);
  }

  componentDidUpdate () {
    $('.message .close').on('click', function() {
      $(this).closest('.message').fadeOut();
    });
  }

  render () {
    const { messages } = this.props;
    var messageItems = messages.map((message) => {
      return (
        <div className='ui small floating teal message' key={messages.indexOf(message)}>
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

function mapStateToProps (state) {
  return {
    messages: state.message.records
  };
}

export default connect(mapStateToProps)(Message);