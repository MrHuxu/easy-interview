import $ from 'jquery';
import NProgress from 'nprogress';
import { QuestionDispatcher } from '../../Common/dispatcher/AppDispatcher';
import history from '../../../router/history';

export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';
export function requestQuestions (args) {
  console.log('fetchOptions: ', args);
  return function (dispatch) {
    return $.ajax({
      type: 'POST',
      url: '/question/get',
      data: JSON.stringify(args),
      contentType: 'application/json',
      dataType: 'JSON'
    }).done((data, textStatus, jqXHR) => {
      dispatch(receiveQuestions(data));
    });
  };
};

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export function receiveQuestions (data) {
  console.log('fetchResult: ', data);
  return {
    type    : RECEIVE_QUESTIONS,
    content : data
  };
};

export const NEW_QUESTION = 'NEW_QUESTION';
export function newQuestion (args) {
  return function (dispatch) {
    $.ajax({
      type: 'POST',
      url: '/question/new',
      data: JSON.stringify(args),
      contentType: 'application/json',
      dataType: 'JSON'
    }).done((data, textStatus, jqXHR) => {
      dispatch({ type: NEW_QUESTION });
    });
  };
};

export const UPDATE_QUESTION = 'UPDATE_QUESTION';
export function updateQuestion (args) {
  return function (dispatch) {
    $.ajax({
      type: 'PUT',
      url: '/question/update',
      data: JSON.stringify(args),
      contentType: 'application/json',
      dataType: 'JSON'
    }).done((data, textStatus,jqXHR) => {
      dispatch({ type: UPDATE_QUESTION });
    });
  };
};

export const DELETE_QUESTION = 'DELETE_QUESTION';
export function deleteQuestion (args) {
  return function (dispatch) {
    $.ajax({
      type: 'DELETE',
      url: '/question/destroy',
      data: JSON.stringify(args),
      contentType: 'application/json',
      dataType: 'JSON'
    }).done((data, textStatus,jqXHR) => {
      dispatch({
        type: 'DELETE_QUESTION',
        content: args._id,
      });
    });
  };
};

export const SET_CONDITION = 'SET_CONDITION';
export function setCondition (condition) {
  return {
    type    : SET_CONDITION,
    content : condition
  };
};