import $ from 'jquery';
import NProgress from 'nprogress';
import { QuestionDispatcher } from '../../Common/dispatcher/AppDispatcher';
import QuestionStore from '../stores/QuestionStore';
import history from '../../../router/history';

export const NEW_QUESTION = 'NEW_QUESTION';
export const UPDATE_QUESTION = 'UPDATE_QUESTION';
export const DELETE_QUESTION = 'DELETE_QUESTION';
export const SELECT_QUESTION = 'SELECT_QUESTION';
export const UNSELECT_QUESTION = 'UNSELECT_QUESTION';

export function newQuestion (args) {
  NProgress.start();
  $.ajax({
    type: 'POST',
    url: '/question/new',
    data: JSON.stringify(args),
    contentType: 'application/json',
    dataType: 'JSON'
  }).done((data, textStatus, jqXHR) => {
    history.replaceState(null, '/home');
  });
};

export const GET_QUESTIONS = 'GET_QUESTIONS';
export function getQuestions (data) {
  console.log('fetchResult: ', data);
  return {
    type    : GET_QUESTIONS,
    content : data
  }
}

export function fetchQuestions (args) {
  console.log('fetchOptions: ', args);
  return function (dispatch) {
    return $.ajax({
      type: 'POST',
      url: '/question/get',
      data: JSON.stringify(args),
      contentType: 'application/json',
      dataType: 'JSON'
    }).done((data, textStatus, jqXHR) => {
      dispatch(getQuestions(data));
    });
  }
}

const QuestionActions = {
  new: (args) => {
    NProgress.start();
    $.ajax({
      type: 'POST',
      url: '/question/new',
      data: JSON.stringify(args),
      contentType: 'application/json',
      dataType: 'JSON'
    }).done((data, textStatus, jqXHR) => {
      history.replaceState(null, '/home');
    });
  },

  get: (args) => {
    NProgress.start();
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
    NProgress.start();
    $.ajax({
      type: 'PUT',
      url: '/question/update',
      data: JSON.stringify(args),
      contentType: 'application/json',
      dataType: 'JSON'
    }).done((data, textStatus,jqXHR) => {
      history.goBack();
      QuestionDispatcher.dispatch({
        actionType: 'UPDATE_QUESTION'
      });
    })
  },

  destroy: (args) => {
    NProgress.start();
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
  },

  selectQuestion: (id) => {
    QuestionDispatcher.dispatch({
      actionType: 'SELECT_QUESTION',
      data: id
    });
  },

  unselectQuestion: (id) => {
    QuestionDispatcher.dispatch({
      actionType: 'UNSELECT_QUESTION',
      data: id
    });
  }
};

export default QuestionActions;