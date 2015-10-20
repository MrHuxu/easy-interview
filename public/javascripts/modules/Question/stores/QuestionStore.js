import QuestionActions from '../actions/QuestionActions';
import { QuestionDispatcher } from '../../Common/dispatcher/AppDispatcher';
import { QuestionEvent } from '../../Common/events';

var QuestionStore = {
  _records             : [],
  _searchConditions    : {},
  _selectedQuestionIds : [],

  _registerToActions: function (action) {
    switch (action.actionType) {
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
      case 'SELECT_QUESTION':
        this._selectedQuestionIds.push(action.data);
        QuestionEvent.emit('SELECTION_CHANGE');
        break;
      case 'UNSELECT_QUESTION':
        this._selectedQuestionIds.splice(this._selectedQuestionIds.indexOf(action.data), 1);
        QuestionEvent.emit('SELECTION_CHANGE');
        break;
      default:
        break;
    };
  },

  getQuestions: function () {
    return this._records;
  },

  getSelectedQuestions: function () {
    return this._records.filter((record) => this._selectedQuestionIds.indexOf(record.id) !== -1);
  },

  getSelectedQuestionIds: function () {
    return this._selectedQuestionIds;
  },

  isSelected: function (id) {
    return this._selectedQuestionIds.indexOf(id) === -1 ? false : true;
  },

  getSearchConditions: function () {
    return this._searchConditions;
  }
};

QuestionDispatcher.register(QuestionStore._registerToActions.bind(QuestionStore));

export default QuestionStore;