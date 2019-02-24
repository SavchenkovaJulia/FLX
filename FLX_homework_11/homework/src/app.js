(function() {
  let todoList = document.querySelector('.todo_list');
  let todoSubmit = document.querySelector('.todo_submit');
  todoSubmit.disabled = true;
  let todoInput = document.querySelector('.todo_input');
  let todoError = document.querySelector('.error_message');
  const ArrayQuantity = 10;
  let dragSrcEl = null;

  let todos = [];

  function createTodo() {
    return {
      done: false,
      task: todoInput.value
    };
  }

  function clearInput() {
    todoInput.value = '';
    todoSubmit.disabled = true;
  }

  function addTodo(todo) {
    if (todos.length < ArrayQuantity) {
      todos.push(todo);
      renderTodos(todo);
      clearInput();
    } else {
      inputActive(false);
      clearInput();
    }
    console.log(todos);
  }

  function renderTodos(el) {
    let li = document.createElement('li');
    li.className = 'todo_item';
    li.innerHTML = el.task;
    li.setAttribute('draggable', 'true');
    todoList.appendChild(li);
    addEventsDragAndDrop(li);

    let checkIcon = document.createElement('i');
    checkIcon.className = 'material-icons check_icon';
    checkIcon.appendChild(document.createTextNode('check_box_outline_blank'));
    li.insertBefore(checkIcon, li.firstChild);

    let deleteIcon = document.createElement('i');
    deleteIcon.className = 'material-icons todo_delete';
    deleteIcon.appendChild(document.createTextNode('delete'));
    li.appendChild(deleteIcon);
  }

  function getElementIndex() {
    let el = event.target.parentElement;
    let index = [...el.parentElement.children].indexOf(el);
    return index;
  }

  function markedAsChecked() {
    if (event.target.innerText === 'check_box_outline_blank') {
      event.target.innerText = 'check_box';
      let index = getElementIndex();
      todos[index].done = true;
    }
  }

  function inputActive(active) {
    todoError.style.visibility = active ? 'hidden' : 'visible';
    todoInput.disabled = !active;
    todoSubmit.disabled = !active;
  }

  function deleteItem() {
    let spliceDeleteCount = 1; //avoid 'magic number';
    if (event.target.innerText === 'delete') {
      let li = event.target.parentElement;
      let index = getElementIndex();
      todoList.removeChild(li);
      todos.splice(index, spliceDeleteCount);
    }
    if (todos.length < ArrayQuantity) {
      inputActive(true);
    }
  }

  todoInput.addEventListener('keyup', function() {
    todoSubmit.disabled = !!(todoInput.value === '');
  });

  todoInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && todoInput.value !== '') {
      event.preventDefault();
      addTodo(createTodo());
    }
  });

  todoSubmit.addEventListener('click', function() {
    addTodo(createTodo());
  });

  todoList.addEventListener('click', markedAsChecked);
  todoList.addEventListener('click', deleteItem);

  function handleDragStart(e) {
    this.style.opacity = '0.4';
    dragSrcEl = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
  }

  function handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';

    return false;
  }

  function handleDragEnter(e) {
    this.classList.add('over');
  }

  function handleDragLeave(e) {
    this.classList.remove('over');
  }

  function handleDrop(e) {
    if (e.stopPropagation) {
      e.stopPropagation();
    }
    if (dragSrcEl !== this) {
      dragSrcEl.innerHTML = this.innerHTML;
      this.innerHTML = e.dataTransfer.getData('text/html');

      let targetIndex = [...this.parentElement.children].indexOf(this);
      let dragSrcIndex = [...dragSrcEl.parentElement.children].indexOf(
        dragSrcEl
      );
      swapInArray(targetIndex, dragSrcIndex);
    }

    return false;
  }

  function swapInArray(target, dragSrc) {
    let tempVariable = todos[target];
    todos[target] = todos[dragSrc];
    todos[dragSrc] = tempVariable;
  }

  function handleDragEnd(e) {
    this.style.opacity = '1';
    let items = document.querySelectorAll('.todo_list .todo_item');
    [].forEach.call(items, function(el) {
      el.classList.remove('over');
    });
  }

  function addEventsDragAndDrop(el) {
    el.addEventListener('dragenter', handleDragEnter, false);
    el.addEventListener('dragover', handleDragOver, false);
    el.addEventListener('dragstart', handleDragStart, false);
    el.addEventListener('dragstart', handleDragStart, false);
    el.addEventListener('dragleave', handleDragLeave, false);
    el.addEventListener('drop', handleDrop, false);
    el.addEventListener('dragend', handleDragEnd, false);
  }
})();