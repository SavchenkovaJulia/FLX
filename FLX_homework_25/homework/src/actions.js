/*
 * action types
 */
export const DELETE_USER = 'DELETE_USER';
export const LOAD_MORE = 'LOAD_MORE';
export const SEARCH_USER = 'SEARCH_USER';

/*
 * action creators
 */
export function deleteUser(index) {
  return {type: DELETE_USER, payload: index};
}
export function loadMore() {
  return {type: LOAD_MORE};
}
export function searchUser(value) {
  return {type: SEARCH_USER, payload: value};
}
