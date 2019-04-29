import Users from './data';
import { LOAD_MORE, SEARCH_USER, DELETE_USER } from './actions';


const initialState = {
  users: Users,
  rowsDefault: 5
};

export const reducer = (state =  initialState, action) => {
  switch (action.type) {
    case LOAD_MORE:
      return loadMore(state);
    case DELETE_USER:
      return deleteUser(state, action.payload);
    case SEARCH_USER:
      return searchUser(state, action.payload);
    default:
      return initialState;
  }
};

function deleteUser(state, index) {
  let filteredUsers = state.users.filter(item => {
    return item.id !== index;
  });
  state.users = filteredUsers;
  return state;
}

function loadMore(state) {
  state.rowsDefault += 5;
  if (state.rowsDefault > state.users.length) {
    state.rowsDefault = state.users.length;
  }
  return state;
}

function searchUser(state, value) {
  state.searchName = value;
  let filteredUsers = state.users.filter(item => {
    return item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1;
  });
  state.users = filteredUsers;

  return state;
}
