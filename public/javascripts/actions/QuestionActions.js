import $ from 'jquery';
import { QuestionDispatcher } from '../dispatcher/AppDispatcher';
import QuestionStore from '../stores/QuestionStore';
import RouterContainer from '../router/RouterContainer';

const QuestionActions = {
  new: (args) => {
    $.ajax({
      type: 'POST',
      url: '/question/new',
      data: JSON.stringify(args),
      contentType: 'application/json',
      dataType: 'JSON'
    }).done((data, textStatus, jqXHR) => {
      RouterContainer.get().transitionTo('/home');
    });
  },

  get: (args) => {
    QuestionStore._searchConditions = args;
    $.ajax({
      type: 'POST',
      url: '/question/get',
      data: JSON.stringify(args),
      contentType: 'application/json',
      dataType: 'JSON'
    }).done((data, textStatus, jqXHR) => {
      QuestionDispatcher.dispatch({
        actionType: 'GET_QUESTIONS',
        content: data
      });
    });
  },

  update: (args) => {
    $.ajax({
      type: 'PUT',
      url: '/question/update',
      data: JSON.stringify(args),
      contentType: 'application/json',
      dataType: 'JSON'
    }).done((data, textStatus,jqXHR) => {
      QuestionDispatcher.dispatch({
        actionType: 'UPDATE_QUESTION'
      });
    })
  },

  destroy: (args) => {
    $.ajax({
      type: 'DELETE',
      url: '/question/destroy',
      data: JSON.stringify(args),
      contentType: 'application/json',
      dataType: 'JSON'
    }).done((data, textStatus,jqXHR) => {
      QuestionDispatcher.dispatch({
        actionType: 'DELETE_QUESTION'
      });
    })
  }
};

export default QuestionActions;