export const SELECT_QUESTION = 'SELECT_QUESTION';
export function selectQuestion (question) {
  return {
    type: SELECT_QUESTION,
    content: question
  };
}

export const UNSELECT_QUESTION = 'UNSELECT_QUESTION';
export function unselectQuestion (id) {
  return {
    type: UNSELECT_QUESTION,
    content: id
  }
}