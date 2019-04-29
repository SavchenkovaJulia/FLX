import './style.scss';
import { createStore } from 'redux';
import { renderUsers, getID } from './components/users-table';
import { reducer } from './reducer';
import { loadMore, deleteUser, searchUser } from './actions';

const usersTotalCount = document.querySelector('.users-total-count');
const searchInput = document.querySelector('#searchInput');
const displayedUsersCount = document.querySelector('.displayed-users-count');
const loadMoreBtn = document.querySelector('#loadMore');
const store = createStore(reducer);
initApp();

function initApp() {
  initStore();
  initHandlers();
}

function initStore() {
  store.subscribe(() => {
    renderUsers(store.getState().users, store.getState().rowsDefault);
    initHandlers();
  });
}

const displayTotalCount = () => {
  displayedUsersCount.innerText = store.getState().rowsDefault;
  usersTotalCount.innerText = store.getState().users.length;
};
displayTotalCount();
store.subscribe(displayTotalCount);

function initHandlers() {
  const delBtns = document.querySelectorAll('.del-btn');
  loadMoreBtn.addEventListener('click', loadMoreEvent),
  delBtns.forEach(btn => btn.addEventListener('click', removeEvent));
  searchInput.addEventListener('change', filterName);
}

function loadMoreEvent() {
  store.dispatch(loadMore());
}

function removeEvent(event) {
  const id = getID(event.target);
  event.target.parentElement.parentElement.remove();
  store.dispatch(deleteUser(id));
}

function filterName(event) {
  const name = event.target.value;
  store.dispatch(searchUser(name));
}
