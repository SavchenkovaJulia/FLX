let login = prompt('Enter your login', '');
let time = new Date().getHours();

if (login === 'User') {
  let password = prompt('Enter your password', '');
  if (password === 'UserPass') {
    time >= 20
      ? alert(`Good evening, dear ${login}!`)
      : alert(`Good day, dear  ${login}!`);
  } else {
    !password ? alert('Canceled') : alert(`Wrong password`);
  }
} else if (login === 'Admin') {
  let password = prompt('Enter your password', '');
  if (password === 'RootPass') {
    time >= 20
      ? alert(`Good evening, dear ${login}!`)
      : alert(`Good day, dear  ${login}!`);
  } else {
    !password ? alert('Canceled') : alert(`Wrong password`);
  }
} else {
  if (login.length < 4) {
    alert(`I don't know any users having name length less than 4 symbols`);
  } else if (!login) {
    alert('Canceled');
  } else {
    alert(`I don’t know you`);
  }
}