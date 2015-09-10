var Message = React.createClass({
  getInitialState: function () {
    return {messages: []};
  },

  componentDidMount: function () {
    MessageStore.bind('refresh', this.refreshMessages);
  },

  componentWillUnmount: function () {
    MessageStore.unbind('refresh', this.refreshMessages);
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
    })
    return (
      <div>
        {messageItems}
        <br />
      </div>
    )
  }
});