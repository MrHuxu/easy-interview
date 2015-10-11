var $ = require('jquery');
var QuestionDispatcher = require('../dispatcher/AppDispatcher').QuestionDispatcher;
var QuestionStore = require('../stores/QuestionStore');
var RouterContainer = require('../router/RouterContainer');

var QuestionActions = {
  new: function (args) {
    $.ajax({
      type: 'POST',
      url: '/question/new',
      data: JSON.stringify(args),
      contentType: 'application/json',
      dataType: 'JSON'
    }).done(function (data, textStatus, jqXHR) {
      RouterContainer.get().transitionTo('/home');
    });
  },

  get: function (args) {
    QuestionStore._searchConditions = args;
    $.ajax({
      type: 'POST',
      url: '/question/get',
      data: JSON.stringify(args),
      contentType: 'application/json',
      dataType: 'JSON'
    }).done(function (data, textStatus, jqXHR) {
      QuestionDispatcher.dispatch({
        actionType: 'GET_QUESTIONS',
        content: data
      });
    });
  },

  update: function (args) {
    $.ajax({
      type: 'PUT',
      url: '/question/update',
      data: JSON.stringify(args),
      contentType: 'application/json',
      dataType: 'JSON'
    }).done(function (data, textStatus,jqXHR) {
      QuestionDispatcher.dispatch({
        actionType: 'UPDATE_QUESTION'
      });
    })
  },

  destroy: function (args) {
    $.ajax({
      type: 'DELETE',
      url: '/question/destroy',
      data: JSON.stringify(args),
      contentType: 'application/json',
      dataType: 'JSON'
    }).done(function (data, textStatus,jqXHR) {
      QuestionDispatcher.dispatch({
        actionType: 'DELETE_QUESTION'
      });
    })
  }
};

module.exports = QuestionActions;