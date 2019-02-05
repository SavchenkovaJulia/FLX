let login = prompt('Enter your login', '');
let time = new Date().getHours();

if (login === 'User') {
  let password = prompt('Enter your password', '');
  if (password === 'UserPass') {
    greeting(login);
  } else {
    passwordValidation(password);
  }
} else if (login === 'Admin') {
  let password = prompt('Enter your password', '');
  if (password === 'RootPass') {
    greeting(login);
  } else {
    passwordValidation(password);
  }
} else {
  loginValidation(login);
}

function loginValidation(data) {
  if (data.length < 4) {
    alert(`I don't know any users having name length less than 4 symbols`);
  } else if (!data) {
    alert('Canceled');
  } else {
    alert(`I don’t know you`);
  }
}

function passwordValidation(data) {
  !data ? alert('Canceled') : alert(`Wrong password`);
}

function greeting(name) {
  time >= 20
    ? alert(`Good evening, dear ${name}!`)
    : alert(`Good day, dear  ${name}!`);
}