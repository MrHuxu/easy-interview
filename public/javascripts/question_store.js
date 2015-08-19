var QuestionStore = {
  _records: [],

  _registerToActions(action) {
    switch(action.actionType) {
      case 'GET_QUESTIONS':
        this._records = action.data;
        this.trigger('load_question');
        break;
      default:
        break;
    };
  },

  getQuestions: function () {
    return this._records;
  }
};

MicroEvent.mixin(QuestionStore);

QuestionDispatcher.register(QuestionStore._registerToActions.bind(QuestionStore));