export const SELECT_QUESTION = 'SELECT_QUESTION';
export function selectQuestion (id) {
  return {
    type: SELECT_QUESTION,
    content: id
  };
}

export const UNSELECT_QUESTION = 'UNSELECT_QUESTION';
export function unselectQuestion (id) {
  return {
    type: UNSELECT_QUESTION,
    content: id
  }
}