function httpGet(url) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onload = function() {
      if (this.status == 200) {
        resolve(this.response);
      } else {
        var error = new Error(this.statusText);
        error.code = this.status;
        reject(error);
      }
    };
    xhr.onerror = function() {
      reject(new Error('Network Error'));
    };

    xhr.send();
  });
}

httpGet('https://jsonplaceholder.typicode.com/users')
  .then(
    result => {
      const users = JSON.parse(result);
      return users;
    },
    error => console.log(`Rejected: ${error}`)
  )
  .then(users => {
    renderCard(users);
    getCardId();
  })
  .catch(error => {
    console.log(error);
  });

function httpDel(url) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('DELETE', url, true);

    xhr.onload = function() {
      if (this.status == 200) {
        resolve(this.response);
      } else {
        var error = new Error(this.statusText);
        error.code = this.status;
        reject(error);
      }
    };
    xhr.onerror = function() {
      reject(new Error('Network Error'));
    };

    xhr.send();
  });
}

function deleteUser(id) {
  httpDel('https://jsonplaceholder.typicode.com/users/' + id)
    .then(console.log('User was removed'), error =>
      console.log(`Rejected: ${error}`)
    )
    .catch(error => {
      console.log(error);
    });
}

function renderCard(users) {
  for (let i = 0; i < users.length; i++) {
    const cardTemplate = `
    <div class="card-body">
    <div class="spinner-border text-primary" role="status">
    <span class="sr-only">Loading...</span>
    </div>
    <h5 class="card-title" data-toggle="modal" data-target="#exampleModal">${
      users[i].name
    }</h5>
    <p class="card-text email"><b>Email:</b> ${users[i].email}</p>
    <p class="card-text phone"><b>Phone:</b> ${users[i].phone}</p>
    <p class="card-text city"><b>City:</b> ${users[i].address.city}</p>
    <p class="card-text address"><b>Address:</b> ${users[i].address.street} ${
      users[i].address.suite
    }</p>
    <p class="card-text company"><b>Company:</b> ${users[i].company.name}</p>
    <button type="button" class="btn btn-primary">Edit</button>
    <button type="button" class="btn btn-danger">Delete</button>
    </div>`;

    const cards = document.getElementById('Cards');
    const card = document.createElement('div');
    card.classList.add('card');
    card.id = users[i].id;
    card.innerHTML = cardTemplate;
    cards.appendChild(card);

    fetchJson('https://api.thecatapi.com/v1/images/search').then(res => {
      const image = document.createElement('img');
      const theFirstChild = card.firstChild;
      image.className = 'card-img-top';
      image.src = res[0]['url'];
      card.insertBefore(image, theFirstChild);
      hideSpinner();
    });
  }
}

function getCardId() {
  let elementsArray = document.querySelectorAll('.card-title');
  let delBtn = document.querySelectorAll('.btn-danger');
  delBtn.forEach(elem => {
    elem.addEventListener('click', function() {
      let id = elem.parentElement.parentElement.id;
      let element = elem.parentElement.parentElement;
      element.remove();
      deleteUser(id);
    });
  });
  elementsArray.forEach(function(elem) {
    elem.addEventListener('click', function() {
      let id = elem.parentElement.parentElement.id;
      getUserPosts(id);
    });
  });
}

function renderPosts(posts, comments) {
  const modalBody = document.querySelector('.modal-body');
  posts.forEach(el => {
    let title = document.createElement('p');
    title.className = 'title font-weight-bold';
    title.innerHTML = el.title;
    modalBody.appendChild(title);
    let postBody = document.createElement('p');
    postBody.className = 'post-body';
    postBody.innerHTML = el.body;

    let commentsTitle = document.createElement('p');
    commentsTitle.className = 'comments-title';
    commentsTitle.innerHTML = 'Comments';
    postBody.appendChild(commentsTitle);
    modalBody.appendChild(postBody);

    renderComments(comments);
  });
}

function renderComments(comments) {
  const modalBodyBody = document.querySelector('.modal-body');
  comments.forEach(el => {
    let userEmail = document.createElement('p');
    userEmail.className = 'user-email';
    userEmail.innerHTML = `User: ${el.email}`;
    let commentBody = document.createElement('p');
    commentBody.className = 'comment-body';
    commentBody.innerHTML = el.body;
    modalBodyBody.appendChild(userEmail);
    modalBodyBody.appendChild(commentBody);
  });
}

function getUserPosts(id) {
  Promise.all([
    httpGet('https://jsonplaceholder.typicode.com/posts?userId=' + id),
    httpGet('https://jsonplaceholder.typicode.com/comments?postId=1')
  ])
    .then(result => {
      const arrPosts = JSON.parse(result[0]);
      const arrComments = JSON.parse(result[1]);
      renderPosts(arrPosts, arrComments);
    })
    .catch(error => {
      console.log(error);
    });
}

function fetchJson(url) {
  return fetch(url)
    .then(request => request.text())
    .then(text => JSON.parse(text))
    .catch(error => console.log(`ERROR: ${error.stack}`));
}

function hideSpinner() {
  let spinners = document.querySelectorAll('.spinner-border');
  [].forEach.call(spinners, function(div) {
    div.style.display = 'none';
  });
}
