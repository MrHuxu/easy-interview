var MessageDispatcher = require('../dispatcher/AppDispatcher').MessageDispatcher;
var MessageEvent = require('../events').MessageEvent;

var MessageStore = {
  _messages: [],

  addTimeout: function () {
    var self = this;
    setTimeout(function () {
      self._messages = [];
      MessageEvent.emit('refresh');
      clearTimeout();
    }, 10000);
  },

  _registerToActions: function (action) {
    switch (action.actionType) {
      case 'REFRESH_MESSAGE' :
        this._messages = action.content;
        if (this._messages.length) this.addTimeout();
        MessageEvent.emit('refresh');
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

MessageDispatcher.register(MessageStore._registerToActions.bind(MessageStore));

module.exports = MessageStore;