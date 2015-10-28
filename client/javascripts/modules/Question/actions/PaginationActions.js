export const CHANGE_PAGE = 'CHANGE_PAGE';
export function changePage (page) {
  return {
    type    : CHANGE_PAGE,
    content : { page: page }
  };
}