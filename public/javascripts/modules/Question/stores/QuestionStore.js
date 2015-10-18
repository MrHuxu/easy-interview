import QuestionActions from '../actions/QuestionActions';
import { QuestionDispatcher } from '../../Common/dispatcher/AppDispatcher';
import { QuestionEvent } from '../../Common/events';

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

export default QuestionStore;