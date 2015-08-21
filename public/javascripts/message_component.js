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

  refreshMessages: function () {
    this.setState({messages: MessageStore.getMessages()});
  },

  render: function () {
    var messageItems = this.state.messages.map(function (message) {
      return (
        <div className='ui small error message'>
          <p>{message}</p>
        </div>
      );
    })
    return (
      <div>
        {messageItems}
      </div>
    )
  }
});