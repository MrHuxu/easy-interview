import { MessageDispatcher } from '../dispatcher/AppDispatcher';
import { MessageEvent } from '../events';

var MessageStore = {
  _messages: [],

  addTimeout: function () {
    var self = this;
    setTimeout(function () {
      self._messages = [];
      MessageEvent.emit('REFRESH_MESSAGE');
      clearTimeout();
    }, 10000);
  },

  _registerToActions: function (action) {
    switch (action.actionType) {
      case 'REFRESH_MESSAGE' :
        this._messages = action.content;
        if (this._messages.length) this.addTimeout();
        MessageEvent.emit('REFRESH_MESSAGE');
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

export default MessageStore;