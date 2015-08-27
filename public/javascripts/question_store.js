var QuestionStore = {
  _records: [],
  _searchConditions: {},

  _registerToActions: function (action) {
    switch(action.actionType) {
      case 'GET_QUESTIONS':
        this._records = action.content;
        this.trigger('load_question');
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

MicroEvent.mixin(QuestionStore);

QuestionDispatcher.register(QuestionStore._registerToActions.bind(QuestionStore));