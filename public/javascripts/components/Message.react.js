var React = require('react/addons');
var $ = require('jquery');
window.jQuery = $; // Assure it's available globally.
var semantic = require('../../bower_components/semantic-ui/dist/semantic.min.js');
var MessageStore = require('../stores/MessageStore');
var MessageEvent = require('../events').MessageEvent;

var Message = React.createClass({
  getInitialState: function () {
    return {messages: []};
  },

  componentDidMount: function () {
    MessageEvent.on('refresh', this.refreshMessages);
  },

  componentDidUpdate: function () {
    $('.message .close').on('click', function() {
      $(this).closest('.message').fadeOut();
    });
  },

  refreshMessages: function () {
    this.setState({messages: MessageStore.getMessages()});
  },

  render: function () {
    var messageItems = this.state.messages.map(function (message) {
      return (
        <div className='ui small floating teal message'>
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
});

module.exports = Message;