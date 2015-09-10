var MessageStore = {
  _messages: [],

  _registerToActions: function (action) {
    switch (action.actionType) {
      case 'REFRESH_MESSAGE' :
        this._messages = action.content;
        this.trigger('refresh');
        break;
      default:
        break;
    };
  },

  getMessages: function () {
    return this._messages;
  },

  deleteMessage: function (message) {
    var index = this._messages.indexOf(message);
    this._messages.splice(index, 1);
  }
};

MicroEvent.mixin(MessageStore);

MessageDispatcher.register(MessageStore._registerToActions.bind(MessageStore));