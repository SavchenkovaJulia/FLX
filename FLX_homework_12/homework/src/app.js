const rootNode = document.getElementById('root');

let todoItems = [];

const mainPage = `
<div class = 'main-block'>
<h1 class="title">Simple TODO Application</h1>
<form>
<div class = 'buttons-section'>
<button type='button' class="add-button">Add New Task</button>
</form>
</div>
<p class='empty-list-message'>TODO is empty</p>
<ul class="todo-list">
</ul>
</div>
`;
const addNewItem = `
<div class= "add-block">
 <h1 class="title">Add Task</h1>
 <form  id="add">
 <input type="text" class="add-task-input" id='addNew'>
 <div class = 'buttons-section'>
 <button type='button' class="cancel-button">Cancel</button>
 <button type='submit' class="save-button">Save changes</button>
 </form>
 </div>
 </div>
 `;
const modifyItem = `
<div class='modify-block'>
 <h1 class="title">Modify Item</h1>
 <form id='edit'>
 <input type="text" class="add-task-input" id="editItem">
 <div class = 'buttons-section'>
 <button class="cancel-button">Cancel</button>
 <button type='submit' class="save-button">Save changes</button>
 </form>
 </div>
 </div>
 `;

rootNode.innerHTML = mainPage + addNewItem + modifyItem;

let addBlock = document.querySelector('.add-block');
let mainBlock = document.querySelector('.main-block');
let modifyBlock = document.querySelector('.modify-block');

function togglePages(active1, active2, active3) {
  mainBlock.style.display = active1 ? 'block' : 'none';
  addBlock.style.display = active2 ? 'block' : 'none';
  modifyBlock.style.display = active3 ? 'block' : 'none';
}

document.addEventListener('DOMContentLoaded', togglePages(true, false, false));

window.addEventListener('hashchange', function() {
  if (location.hash.endsWith('add')) {
    togglePages(false, true, false);
  } else if (location.hash.endsWith('modify')) {
    togglePages(false, false, true);
  } else {
    togglePages(true, false, false);
  }
});

const addButton = document.querySelector('.add-button');
addButton.addEventListener('click', function() {
  location.hash = 'add';
  togglePages(false, true, false);
});

const id = function() {
  const base36 = 36;
  const startIndex = 2;
  const numberOfCharacters = 9;

  return Math.random()
    .toString(base36)
    .substr(startIndex, numberOfCharacters);
};

function Todo(name) {
  this.description = name;
  this.id = id();
  this.isDone = false;
}

function addNewTodo(name) {
  let todoItem = new Todo(name);
  todoItems.push(todoItem);
  saveTodoItems();
}

function removeTodo(index) {
  todoItems.splice(index, 1);
  saveTodoItems();
}

function getTodo(elementId) {
  for (let i = 0; i < todoItems.length; i++) {
    if (todoItems[i].id === elementId) {
      return todoItems[i];
    }
  }
}

function saveTodoItems() {
  let str = JSON.stringify(todoItems);
  localStorage.setItem('todoItems', str);
}

function getTodoItems() {
  let str = localStorage.getItem('todoItems');
  todoItems = JSON.parse(str);
  if (!todoItems) {
    todoItems = [];
  }
}

function renderTodo() {
  let li = '';
  let ul = document.querySelector('.todo-list');

  for (let i in todoItems) {
    if (todoItems.hasOwnProperty) {
      let todo = todoItems[i];
      let name = todo.description;
      let status = todo.isDone;
      let checkbox;

      if (status === true) {
        checkbox = `<input type='checkbox' class='checkbox-item' checked></input>`;
      } else {
        checkbox = `<input type='checkbox' class='checkbox-item'></input>`;
      }

      li += `<li element_Id=${todoItems[i].id}> ${checkbox}
             <span class='item-description'> ${name}</span>
             <button class='del-btn'>Delete</button></li>`;
    }
  }

  ul.innerHTML = li;
  isEmpty();
}

let ul = document.querySelector('.todo-list');
ul.addEventListener('click', editItem);

function editItem(e) {
  let thirdElIndex = 3; // 'magic Number issue'
  if (e.target.classList.contains('item-description')) {
    location.hash = 'modify';
    let itemText = e.target.innerText.replace('Delete', '');
    let el = event.target.parentElement;
    let elementId = el.getAttribute('element_Id');
    let itemFromArray = getTodo(elementId);
    let modifyField = document.getElementById('editItem');
    modifyField.value = itemText;
    let form = document.getElementById('edit');

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      location.hash = '';

      el.childNodes[thirdElIndex].innerText = modifyField.value;
      itemFromArray.description = modifyField.value;
      saveTodoItems();
    });
  }
}

const form = document.getElementById('add');
form.addEventListener('submit', function(e) {
  e.preventDefault();
  window.location.hash = '';

  let inputAdd = document.getElementById('addNew').value;
  addNewTodo(inputAdd);
  renderTodo();
});

ul.addEventListener('click', markAsChecked);
function markAsChecked(e) {
  if (e.target.classList.contains('checkbox-item')) {
    e.target.checked = true;

    let el = event.target.parentElement;
    let elementId = el.getAttribute('element_Id');
    let itemFromArray = getTodo(elementId);
    itemFromArray.isDone = true;
    saveTodoItems();
  }
}

ul.addEventListener('click', removeItem);
function removeItem(e) {
  if (e.target.classList.contains('del-btn')) {
    let li = e.target.parentElement;
    let elementId = li.getAttribute('element_Id');
    let targetElement = getTodo(elementId);
    let index = todoItems.indexOf(targetElement);

    removeTodo(index);
    ul.removeChild(li);
    isEmpty();
  }
}

let cancelButton = document.querySelector('.cancel-button');
cancelButton.addEventListener('click', function() {
  window.location.hash = '';
  togglePages(true, false, false);
});

function isEmpty() {
  document.querySelector('.empty-list-message').style.display =
    todoItems.length >= 1 ? 'none' : 'block';
}

getTodoItems();
renderTodo();