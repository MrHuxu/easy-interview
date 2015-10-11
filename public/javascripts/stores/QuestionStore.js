var MicroEvent = require('microevent');
var QuestionDispatcher = require('../dispatcher/AppDispatcher').QuestionDispatcher;
var QuestionEvent = require('../events').QuestionEvent;

var QuestionStore = {
  _records: [],
  _searchConditions: {},

  _registerToActions: function (action) {
    switch(action.actionType) {
      case 'GET_QUESTIONS':
        this._records = action.content;
        QuestionEvent.emit('load_question');
        break;
      case 'UPDATE_QUESTION':
        RouterContainer.get().transitionTo('/home');
        QuestionActions.get(this.getSearchConditions());
        break;
      case 'DELETE_QUESTION':
        QuestionActions.get(this.getSearchConditions());
        break;
      default:
        break;
    };
  },

  getQuestions: function () {
    return this._records;
  },

  getSearchConditions: function () {
    return this._searchConditions;
  }
};

QuestionDispatcher.register(QuestionStore._registerToActions.bind(QuestionStore));

module.exports = QuestionStore;