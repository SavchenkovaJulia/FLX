import { searchTemplate } from './search-input';
import { countInfo } from './users-count-info';
const root = document.querySelector('#root');
const usersTable = `
${searchTemplate}
<div class="table">
  <table class="users-table">
    <thead>
      <tr>
        <th>Photo</th>
        <th>Name</th>
        <th>Address</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Timezone</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody id="table-body">
    </tbody>
  </table>
</div>
${countInfo}
`;
root.innerHTML = usersTable;
const tableBody = document.querySelector('#table-body');

function generateTr(user) {
  const tr = document.createElement('tr');
  tr.setAttribute('data-id', user.id);
  const td = `
        <td><img src=${user.picture} alt='avatar'></td>
        <td>${user.name}</td>
        <td>${user.location}</td>
        <td>${user.email}</td>
        <td>${user.phone}</td>
        <td>${user.timezone}</td>
        <td><button class="del-btn">Remove</button></td>
   `;
  tr.innerHTML = td;
  tableBody.appendChild(tr);
}

export const renderUsers = (list, step) => {
  if (list.length === 0) {
    tableBody.innerHTML = `<p class="no-users-message">No users are found</p>`;
  } else {
    list.slice(0, step).forEach(el => {
      generateTr(el);
    });
  }
};

export function getID(target) {
  return target.parentElement.parentElement.dataset.id;
}
