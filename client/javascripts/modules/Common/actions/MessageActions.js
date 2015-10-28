export const ADD_MESSAGES = 'ADD_MESSAGES';
export function addMessages (messages) {
  return function (dispatch) {
    dispatch(showMessags(messages));
    setTimeout(() =>{
      dispatch(removeMessages());
      clearTimeout();
    }, 10000);
  };
};

export const SHOW_MESSAGES = 'SHOW_MESSAGES';
export function showMessags (messages) {
  return {
    type    : SHOW_MESSAGES,
    content : messages
  };
}

export const REMOVE_MESSAGES = 'REMOVE_MESSAGES';
export function removeMessages () {
  return {
    type    : REMOVE_MESSAGES,
    content : []
  };
};